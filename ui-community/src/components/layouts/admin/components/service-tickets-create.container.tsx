import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AdminServiceTicketsCreateContainerMembersDocument,
    AdminServiceTicketsCreateContainerPropertiesDocument,
    AdminServiceTicketsCreateContainerServiceTicketCreateDocument,
    AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
    ServiceTicketCreateInput
} from '../../../../generated';
import { ServiceTicketsCreate } from '../../shared/components/service-tickets-create';

interface ServiceTicketsCreateContainerProps {
  data: {
    communityId: string;
  };
}

export const ServiceTicketsCreateContainer: React.FC<ServiceTicketsCreateContainerProps> = (
  props
) => {
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
  const [serviceTicketCreate] = useMutation(
    AdminServiceTicketsCreateContainerServiceTicketCreateDocument,
    {
      update(cache, { data }) {
        // update the list with the new item
        const newServiceTicket = data?.serviceTicketCreate.serviceTicket;
        const serviceTickets = cache.readQuery({
          query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
          variables: { communityId: props.data.communityId }
        })?.serviceTicketsByCommunityId;
        if (newServiceTicket && serviceTickets) {
          cache.writeQuery({
            query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
            variables: { communityId: props.data.communityId },
            data: {
              serviceTicketsByCommunityId: [...serviceTickets, newServiceTicket]
            }
          });
        }
      }
    }
  );

  const handleCreate = async (values: ServiceTicketCreateInput) => {
    try {
      const newServiceTicket = await serviceTicketCreate({
        variables: {
          input: values
        }
      });
      message.success('ServiceTicket Created');
      navigate(`../${newServiceTicket.data?.serviceTicketCreate.serviceTicket?.id}`, {
        replace: true
      });
    } catch (error) {
      message.error(`Error creating ServiceTicket: ${JSON.stringify(error)}`);
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

    return <ServiceTicketsCreate data={data as any} onSave={handleCreate} isAdmin />;
  } else {
    return <div>No Data...</div>;
  }
};
