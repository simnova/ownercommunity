import { useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { Skeleton, message } from 'antd';

import {
  AdminViolationTicketDetailContainerViolationTicketDeleteDocument,
  AdminViolationTicketsDetailContainerMemberAssignableToTicketsDocument,
  AdminServiceTicketsDetailContainerPropertiesDocument,
  AdminViolationTicketsDetailContainerViolationTicketDocument,
  AdminServiceTicketsListContainerServiceTicketsByCommunityIdDocument,
  AdminViolationTicketsDetailContainerViolationTicketUpdateDocument,
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketAssignInput,
  ViolationTicketUpdateInput,
  ViolationTicketChangeStatusInput,
  AdminViolationTicketsDetailContainerViolationTicketChangeStatusDocument,
  AdminViolationTicketsDetailContainerViolationTicketAssignDocument,
  AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument
} from '../../../../generated';

import { ViolationTicketsDetail } from './violation-tickets-detail';

export interface ViolationTicketsDetailContainerProps {
  data: {
    id: string;
    ticketType: string;
    communityId: string;
  };
}

export const ViolationTicketsDetailContainer: React.FC<ViolationTicketsDetailContainerProps> = (props) => {
  const navigate = useNavigate();

  const [violationTicketUpdate] = useMutation(AdminViolationTicketsDetailContainerViolationTicketUpdateDocument);
  const [violationTicketChangeStatus] = useMutation(AdminViolationTicketsDetailContainerViolationTicketChangeStatusDocument);
  const [violationTicketAssign] = useMutation(AdminViolationTicketsDetailContainerViolationTicketAssignDocument);
  const [violationTicketAddUpdateActivity] = useMutation(AdminViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument);

  const membersLazyQuery = useLazyQuery(AdminViolationTicketsDetailContainerMemberAssignableToTicketsDocument, {
    fetchPolicy: 'network-only',
    variables: {
      violationTicketId: props.data.id
    }
  });

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(AdminServiceTicketsDetailContainerPropertiesDocument);

  const {
    data: violationTicketData,
    loading: violationTicketLoading,
    error: violationTicketError
  } = useQuery(AdminViolationTicketsDetailContainerViolationTicketDocument, {
    variables: {
      id: props.data.id
    }
  });

  const [deleteViolationTicket] = useMutation(AdminViolationTicketDetailContainerViolationTicketDeleteDocument, {
    update(cache, { data }) {
      const deletedViolationTicket = data?.violationTicketDelete.violationTicket;
      const tickets = cache.readQuery({
        query: AdminServiceTicketsListContainerServiceTicketsByCommunityIdDocument,
        variables: { communityId: props.data.communityId }
      })?.serviceTicketsByCommunityId;
      if (deletedViolationTicket && tickets) {
        cache.writeQuery({
          query: AdminServiceTicketsListContainerServiceTicketsByCommunityIdDocument,
          variables: { communityId: props.data.communityId },
          data: {
            serviceTicketsByCommunityId: tickets?.filter(
              (serviceTickets) => serviceTickets?.id !== deletedViolationTicket.id
            )
          }
        });
      }
    }
  });

  const handleAssign = async (values: ViolationTicketAssignInput) => {
    try {
      await violationTicketAssign({
        variables: {
          input: values
        }
      });
      message.success('Assignment changed successfully');
    } catch (error) {
      message.error(`Error changing assignment on Violation Ticket : ${JSON.stringify(error)}`);
    }
  };

  const handleAddUpdateActivity = async (values: ViolationTicketAddUpdateActivityInput) => {
    try {
      await violationTicketAddUpdateActivity({
        variables: {
          input: values
        }
      });
      message.success('Activity added successfully');
    } catch (error) {
      message.error(`Error adding activity on Violation Ticket : ${JSON.stringify(error)}`);
    }
  };

  const handleChangeStatus = async (values: ViolationTicketChangeStatusInput) => {
    try {
      const result = await violationTicketChangeStatus({
        variables: {
          input: values
        }
      });
      if (!result.data?.violationTicketChangeStatus.status.success) {
        message.error(
          `Error changing Violation Ticket status : ${result.data?.violationTicketChangeStatus.status.errorMessage}`
        );
      } else {
        message.success('Status changed successfully');
      }
    } catch (error) {
      message.error(`Error changing Violation Ticket status : ${JSON.stringify(error)}`);
    }
  };

  const handleUpdate = async (values: ViolationTicketUpdateInput) => {
    try {
      values.violationTicketId = props.data.id;
      console.log('values2', values);
      await violationTicketUpdate({
        variables: {
          input: values
        }
      });
      message.success('Service Ticket Updated');
    } catch (error) {
      message.error(`Error updating Service Ticket : ${JSON.stringify(error)}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteViolationTicket({
        variables: {
          input: {
            violationTicketId: props.data.id
          }
        }
      });
      message.success('Deleted');
      navigate('../');
    } catch (error) {
      message.error(`Error deleting Service Ticket: ${JSON.stringify(error)}`);
    }
  };

  if (violationTicketLoading || propertyLoading) {
    return <Skeleton active />;
  } else if (violationTicketError || propertyError) {
    return <div>{JSON.stringify(violationTicketError ?? propertyError)}</div>;
  } else if (violationTicketData?.violationTicket && propertyData?.properties) {
    const data = {
      violationTicket: violationTicketData.violationTicket!,
      properties: propertyData.properties!
    };
    return (
      <ViolationTicketsDetail
        onUpdate={handleUpdate}
        onChangeStatus={handleChangeStatus}
        data={data}
        onAssign={handleAssign}
        onAddUpdateActivity={handleAddUpdateActivity}
        onDelete={handleDelete}
        memberLazyQuery={membersLazyQuery}
      />
    );
  } else {
    return <div>No Data...</div>;
  }
};
