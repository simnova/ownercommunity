import { useMutation, useQuery } from '@apollo/client';
import {
  MembersServiceTicketsCreateContainerMembersDocument,
  MembersServiceTicketsCreateContainerPropertiesDocument,
  MembersServiceTicketsCreateContainerServiceTicketCreateDocument,
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument,
  ServiceTicketCreateInput
} from '../../../../generated';
import { message, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
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
  } = useQuery(MembersServiceTicketsCreateContainerMembersDocument, {
    variables: { communityId: props.data.communityId }
  });
  const {
    data: propertyData,
    loading: propertyLoading,
    error: propertyError
  } = useQuery(MembersServiceTicketsCreateContainerPropertiesDocument, {
    variables: { communityId: props.data.communityId }
  });
  const [serviceTicketCreate] = useMutation(
    MembersServiceTicketsCreateContainerServiceTicketCreateDocument,
    {
      update(cache, { data }) {
        // update the list with the new item
        const newServiceTicket = data?.serviceTicketCreate.serviceTicket;
        const serviceTickets = cache.readQuery({
          query: MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument,
        })?.serviceTicketsOpenByRequestor;
        if (newServiceTicket && serviceTickets) {
          cache.writeQuery({
            query: MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument,
            data: {
              serviceTicketsOpenByRequestor: [...serviceTickets, newServiceTicket]
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
      properties: propertyData.propertiesForCurrentUserByCommunityId
    };

    return <ServiceTicketsCreate data={data as any} onSave={handleCreate} />;
  } else {
    return <div>No Data...</div>;
  }
};