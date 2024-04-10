import { useMutation, useQuery } from "@apollo/client";
import { Skeleton, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
    AdminServiceTicketDetailContainerServiceTicketDeleteDocument,
    AdminServiceTicketsDetailContainerAddUpdateActivityDocument,
    AdminServiceTicketsDetailContainerMembersAssignableToTicketsDocument,
    AdminServiceTicketsDetailContainerPropertiesDocument,
    AdminServiceTicketsDetailContainerServiceAssignDocument,
    AdminServiceTicketsDetailContainerServiceTicketChangeStatusDocument,
    AdminServiceTicketsDetailContainerServiceTicketDocument,
    AdminServiceTicketsDetailContainerServiceTicketUpdateDocument,
    AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
    ServiceTicketAddUpdateActivityInput,
    ServiceTicketAssignInput,
    ServiceTicketChangeStatusInput,
    ServiceTicketUpdateInput
} from "../../../../generated";
import { ServiceTicketsDetail } from "./service-tickets-detail";

export interface ServiceTicketsDetailContainerProps {
  data: {
    id: string;
    communityId: string;
  };
}

export const ServiceTicketsDetailContainer: React.FC<ServiceTicketsDetailContainerProps> = (props) => {
  const navigate = useNavigate();

  const [serviceTicketUpdate] = useMutation(AdminServiceTicketsDetailContainerServiceTicketUpdateDocument); 
  const [serviceTicketChangeStatus] = useMutation(AdminServiceTicketsDetailContainerServiceTicketChangeStatusDocument);  
  const [serviceTicketAssign] = useMutation(AdminServiceTicketsDetailContainerServiceAssignDocument);
  const [serviceTicketAddUpdateActivity] = useMutation(AdminServiceTicketsDetailContainerAddUpdateActivityDocument);
  const { data: memberData, loading: memberLoading, error: memberError } = useQuery(AdminServiceTicketsDetailContainerMembersAssignableToTicketsDocument);

  const { data: propertyData, loading: propertyLoading, error: propertyError } = useQuery(AdminServiceTicketsDetailContainerPropertiesDocument);
 
  const { data: serviceTicketData, loading: serviceTicketLoading, error: serviceTicketError } = useQuery(AdminServiceTicketsDetailContainerServiceTicketDocument,{
    variables: {
      id: props.data.id
    }
  });

  const [deleteServiceTicket] = useMutation(AdminServiceTicketDetailContainerServiceTicketDeleteDocument, {
    update(cache, {data}) {
      const deletedServiceTicket = data?.serviceTicketDelete.serviceTicket;
      const serviceTickets = cache.readQuery({
        query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument, 
        variables: {communityId: props.data.communityId}
      })?.serviceTicketsByCommunityId;
      if (deletedServiceTicket && serviceTickets) {
        cache.writeQuery({
          query: AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
          variables: { communityId: props.data.communityId },
          data: {
            serviceTicketsByCommunityId: serviceTickets?.filter(
              (serviceTickets) => serviceTickets?.id !== deletedServiceTicket.id
            )
          }
        });
      }
    }
  })

  const handleAssign = async (values: ServiceTicketAssignInput) => {
    try {
      await serviceTicketAssign({
        variables: {
          input: values
        }
      });
      message.success("Assignment changed successfully");
    } catch (error) {
      message.error(`Error changing assignment on Service Ticket : ${JSON.stringify(error)}`);
    }
  }

  const handleAddUpdateActivity = async (values: ServiceTicketAddUpdateActivityInput) => {
    try {
      await serviceTicketAddUpdateActivity({
        variables: {
          input: values
        }
      });
      message.success("Activity added successfully");
    } catch (error) {
      message.error(`Error adding activity on Service Ticket : ${JSON.stringify(error)}`);
    }
  }


  const handleChangeStatus = async (values: ServiceTicketChangeStatusInput) => {
    try {
      const result = await serviceTicketChangeStatus({
        variables: {
          input: values
        }
      });
      if(!result.data?.serviceTicketChangeStatus.status.success){
        message.error(`Error changing Service Ticket status : ${result.data?.serviceTicketChangeStatus.status.errorMessage}`);
      }else{
        message.success("Status changed successfully");
      }
    } catch (error) {
      message.error(`Error changing Service Ticket status : ${JSON.stringify(error)}`);
    }
  }

  const handleUpdate = async (values: ServiceTicketUpdateInput) => {
    try {
      values.serviceTicketId = props.data.id;
      console.log('values2', values);
      await serviceTicketUpdate({
        variables: {
          input: values
        },
      });
      message.success("Service Ticket Updated");

    } catch (error) {
      message.error(`Error updating Service Ticket : ${JSON.stringify(error)}`);
    }
  } 

  const handleDelete = async () => {
    try {
      await deleteServiceTicket({
        variables: {
          input: {
            serviceTicketId: props.data.id
          }
        }
      });
      message.success('Deleted');
      navigate('../../');
    } catch (error) {
      message.error(`Error deleting Service Ticket: ${JSON.stringify(error)}`);
    }
  };

  if(serviceTicketLoading || memberLoading || propertyLoading){
    return <Skeleton active />
  }else if(serviceTicketError || memberError || propertyError){
    return <div>{JSON.stringify(serviceTicketError ?? memberError ?? propertyError)}</div>
  }else if(serviceTicketData?.serviceTicket && memberData?.membersAssignableToTickets && propertyData?.properties){
    const data = {
      serviceTicket: serviceTicketData.serviceTicket,
      members: memberData.membersAssignableToTickets,
      properties: propertyData.properties,
    }
  return <ServiceTicketsDetail 
            onAdd={{}} 
            onUpdate={handleUpdate} 
            onChangeStatus={handleChangeStatus} 
            data={data} 
            onAssign={handleAssign}
            onAddUpdateActivity={handleAddUpdateActivity}
            onDelete={handleDelete}
            />
  } else {
    return <div>No Data...</div>
  }
  
}