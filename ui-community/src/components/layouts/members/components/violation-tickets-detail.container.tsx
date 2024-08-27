import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { Empty, Skeleton, message } from 'antd';

import {
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketAssignInput,
  ViolationTicketUpdateInput,
  ViolationTicketChangeStatusInput,
  MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument,
  AdminServiceTicketsListContainerServiceTicketsByCommunityIdDocument,
  MembersViolationTicketsDetailContainerViolationTicketAssignDocument,
  MembersViolationTicketsDetailContainerViolationTicketUpdateDocument,
  MembersViolationTicketsDetailContainerViolationTicketChangeStatusDocument,
  MembersViolationTicketsDetailContainerViolationTicketProcessPaymentDocument,
  MembersViolationTicketsDetailContainerViolationTicketDocument,
  MembersViolationTicketsDetailContainerServiceTicketDeleteDocument,
  MembersViolationTicketsDetailContainerPropertiesDocument
} from '../../../../generated';

import { ViolationTicketsDetail } from './violation-tickets-detail';

export interface ViolationTicketsDetailContainerProps {
  data: {
    id: string;
    ticketType: string;
    communityId: string;
    memberId: string;
  };
}

export const ViolationTicketsDetailContainer: React.FC<ViolationTicketsDetailContainerProps> = (props) => {
  const navigate = useNavigate();

  const [violationTicketUpdate] = useMutation(MembersViolationTicketsDetailContainerViolationTicketUpdateDocument);
  const [violationTicketChangeStatus] = useMutation(MembersViolationTicketsDetailContainerViolationTicketChangeStatusDocument);
  const [violationTicketAssign] = useMutation(MembersViolationTicketsDetailContainerViolationTicketAssignDocument);
  const [violationTicketAddUpdateActivity] = useMutation(MembersViolationTicketsDetailContainerViolationTicketAddUpdateActivityDocument);
  const [violationTicketProcessPayment] = useMutation(MembersViolationTicketsDetailContainerViolationTicketProcessPaymentDocument);

  const handlePayment = async (violationTicketId: string, paymentAmount: number, paymentInstrumentId: string) => {
    try {
      const result = await violationTicketProcessPayment({
        variables: {
          input: {
            violationTicketId,
            paymentAmount,
            paymentInstrumentId
          }
        }
      });
      if (!result.data?.violationTicketProcessPayment.status.success) {
        message.error(
          `Payment error for Violation Ticket : ${result.data?.violationTicketProcessPayment.status.errorMessage}`
        );
      } else {
          message.success('Payment processed successfully.');
        }   
  } catch (error) {
      message.error(`Error processing payment on Violation Ticket : ${JSON.stringify(error)}`);
    }
  };

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MembersViolationTicketsDetailContainerPropertiesDocument, { variables: { id: props.data.memberId } });

  const {
    data: violationTicketData,
    loading: violationTicketLoading,
    error: violationTicketError
  } = useQuery(MembersViolationTicketsDetailContainerViolationTicketDocument, {
    variables: {
      id: props.data.id
    }
  });

  const [deleteViolationTicket] = useMutation(MembersViolationTicketsDetailContainerServiceTicketDeleteDocument, {
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
  } else if (violationTicketData?.violationTicket && propertyData?.propertiesByOwnerId) {
    const data = {
      violationTicket: violationTicketData.violationTicket,
      properties: propertyData.propertiesByOwnerId
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
        onPayment={handlePayment}
      />
    );
  } else {
    return <Empty />;
  }
};
