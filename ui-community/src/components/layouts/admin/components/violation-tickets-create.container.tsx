import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  AdminServiceTicketsCreateContainerMembersDocument,
  AdminServiceTicketsCreateContainerPropertiesDocument,
  AdminViolationTicketsCreateContainerViolationTicketCreateDocument,
  AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
  ViolationTicketCreateInput
} from '../../../../generated';
import { ViolationTicketsCreate } from '../../shared/components/violation-tickets-create';

interface ViolationTicketsCreateContainerProps {
  data: {
    communityId: string;
  };
}

export const ViolationTicketsCreateContainer: React.FC<ViolationTicketsCreateContainerProps> = (props) => {
  const navigate = useNavigate();

  const {
    data: memberData,
    loading: memberLoading,
    error: memberError
  } = useQuery(AdminServiceTicketsCreateContainerMembersDocument, {
    variables: { communityId: props.data.communityId }
  });

  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(AdminServiceTicketsCreateContainerPropertiesDocument, {
    variables: { communityId: props.data.communityId }
  });

  const [violationTicketCreate] = useMutation(AdminViolationTicketsCreateContainerViolationTicketCreateDocument, {
    update(cache, { data }) {
      // update the list with the new item
      const newViolationTicket = data?.violationTicketCreate.violationTicket;

      const tickets = cache.readQuery({
        query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
        variables: { communityId: props.data.communityId }
      })?.serviceTicketsByCommunityId;

      if (newViolationTicket && tickets) {
        cache.writeQuery({
          query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
          variables: { communityId: props.data.communityId },
          data: {
            serviceTicketsByCommunityId: [...tickets, newViolationTicket]
          }
        });
      }
    }
  });

  const handleCreate = async (values: ViolationTicketCreateInput) => {
    try {
      const newServiceTicket = await violationTicketCreate({
        variables: {
          input: values
        }
      });
      const ticketDetails = {
        ticketId: newServiceTicket.data?.violationTicketCreate.violationTicket?.id,
        ticketType: newServiceTicket.data?.violationTicketCreate.violationTicket?.ticketType
      }
      message.success('Violation Ticket Created');
      navigate(`../${ticketDetails.ticketType}/${ticketDetails.ticketId}`, {
        replace: true
      });
    } catch (error) {
      message.error(`Error creating Violation Ticket: ${JSON.stringify(error)}`);
    }
  };

  if (memberLoading || propertyLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  if (memberError || propertyError) {
    return <div>{JSON.stringify(memberError ?? propertyError)}</div>;
  }
  if (memberData && propertyData) {
    const data = {
      members: memberData.membersByCommunityId,
      properties: propertyData.propertiesByCommunityId
    };

    return <ViolationTicketsCreate data={data as any} onSave={handleCreate} isAdmin />;
  } else {
    return <div>No Data...</div>;
  }
};
