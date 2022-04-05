import { useMutation, useQuery } from "@apollo/client";
import { AdminServiceTicketsCreateContainerMembersDocument,AdminServiceTicketsCreateContainerPropertiesDocument,AdminServiceTicketsCreateContainerServiceTicketCreateDocument, AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument, ServiceTicketCreateInput } from "../../../../generated";
import { message,Skeleton } from "antd";
import { ServiceTicketsCreate } from "./service-tickets-create";
import { useNavigate } from "react-router-dom";

export const ServiceTicketsCreateContainer: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminServiceTicketsCreateContainerMembersDocument);
  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(AdminServiceTicketsCreateContainerPropertiesDocument);
  const [serviceTicketCreate] = useMutation(AdminServiceTicketsCreateContainerServiceTicketCreateDocument,{

    update(cache, { data }) { // update the list with the new item
      const newServiceTicket = data?.serviceTicketCreate.serviceTicket;
      const serviceTickets = cache.readQuery({ query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument })?.serviceTicketsOpenByCommunity;
      if(newServiceTicket && serviceTickets) {
        cache.writeQuery({
          query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
          data: {
            serviceTicketsOpenByCommunity: [...serviceTickets, newServiceTicket]
          }
        })
      }
    }
    
  });  

  const handleCreate = async (values: ServiceTicketCreateInput) => {
    try {
      var newServiceTicket = await serviceTicketCreate({
        variables: {
          input: values
        }      
      });
      message.success("ServiceTicket Created");
      navigate(`../${newServiceTicket.data?.serviceTicketCreate.serviceTicket?.id}`, { replace: true });
      
    } catch (error) {
      message.error(`Error creating ServiceTicket: ${JSON.stringify(error)}`);
    }
  }

  if(memberLoading || propertyLoading) {
    return <div><Skeleton active /></div>
  }
  if(memberError || propertyError) {
    return <div>{JSON.stringify(memberError || propertyError)}</div>
  }
  if(memberData && propertyData) {  
    const data ={
      members: memberData.members,
      properties: propertyData.properties
    }


    return <ServiceTicketsCreate data={data as any} onSave={handleCreate} />
  } else {
    return <div>No Data...</div>
  }

  
}