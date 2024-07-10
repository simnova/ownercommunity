import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { Skeleton, message } from 'antd';

import {
  AdminViolationTicketDetailContainerViolationTicketDeleteDocument,
  AdminViolationTicketsDetailContainerMembersAssignableToTicketsDocument,
  AdminServiceTicketsDetailContainerPropertiesDocument,
  AdminServiceTicketsDetailContainerViolationTicketDocument,
  AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
  AdminViolationTicketsDetailContainerViolationTicketUpdateDocument,
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketAssignInput,
  ViolationTicketUpdateInput,
  ViolationTicketChangeStatusInput,
  AdminViolationTicketsDetailContainerViolationTicketChangeStatusDocument,
  AdminViolationTicketsDetailContainerViolationAssignDocument,
  AdminViolationTicketsDetailContainerAddUpdateActivityDocument
} from '../../../../generated';

import { ViolationTicketsDetail } from './violation-ticket-detail';

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
  const [violationTicketAssign] = useMutation(AdminViolationTicketsDetailContainerViolationAssignDocument);
  const [violationTicketAddUpdateActivity] = useMutation(AdminViolationTicketsDetailContainerAddUpdateActivityDocument);
  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(AdminViolationTicketsDetailContainerMembersAssignableToTicketsDocument, {
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
  } = useQuery(AdminServiceTicketsDetailContainerViolationTicketDocument, {
    variables: {
      id: props.data.id
    }
  });

  const [deleteViolationTicket] = useMutation(AdminViolationTicketDetailContainerViolationTicketDeleteDocument, {
    update(cache, { data }) {
      const deletedViolationTicket = data?.violationTicketDelete.violationTicket;
      const tickets = cache.readQuery({
        query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
        variables: { communityId: props.data.communityId }
      })?.serviceTicketsByCommunityId;
      if (deletedViolationTicket && tickets) {
        cache.writeQuery({
          query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
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

  if (violationTicketLoading || memberLoading || propertyLoading) {
    return <Skeleton active />;
  } else if (violationTicketError || memberError || propertyError) {
    return <div>{JSON.stringify(violationTicketError ?? memberError ?? propertyError)}</div>;
  } else if (
    violationTicketData?.violationTicket &&
    memberData?.memberAssignableToViolationTickets &&
    propertyData?.properties
  ) {
    const data = {
      violationTicket: violationTicketData.violationTicket,
      members: memberData.memberAssignableToViolationTickets,
      properties: propertyData.properties
    };
    return (
      <ViolationTicketsDetail
        onAdd={{}}
        onUpdate={handleUpdate}
        onChangeStatus={handleChangeStatus}
        data={data}
        onAssign={handleAssign}
        onAddUpdateActivity={handleAddUpdateActivity}
        onDelete={handleDelete}
      />
    );
  } else {
    return <div>No Data...</div>;
  }
};
