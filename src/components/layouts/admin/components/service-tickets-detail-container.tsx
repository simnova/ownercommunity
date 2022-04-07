import { useMutation, useQuery } from "@apollo/client";
import { message, Skeleton } from "antd";
import { ServiceTicketsDetail } from "./service-tickets-detail";
import { 
  AdminServiceTicketsDetailContainerMembersAssignableToTicketsDocument,
  AdminServiceTicketsDetailContainerPropertiesDocument, 
  AdminServiceTicketsDetailContainerServiceTicketUpdateDocument, 
  AdminServiceTicketsDetailContainerServiceTicketChangeStatusDocument, 
  AdminServiceTicketsDetailContainerServiceTicketDocument, 
  ServiceTicketUpdateInput, 
  ServiceTicketChangeStatusInput,
  AdminServiceTicketsDetailContainerServiceAssignDocument,
  AdminServiceTicketsDetailContainerAddUpdateActivityDocument,
  ServiceTicketAssignInput,
  ServiceTicketAddUpdateActivityInput} from "../../../../generated";

export interface ServiceTicketsDetailContainerProps {
  data: {
    id: string;
  };
}

export const ServiceTicketsDetailContainer: React.FC<ServiceTicketsDetailContainerProps> = (props) => {
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
      await serviceTicketChangeStatus({
        variables: {
          input: values
        }
      });
      message.success("Status changed successfully");
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

  if(serviceTicketLoading || memberLoading || propertyLoading){
    return <Skeleton active />
  }else if(serviceTicketError || memberError || propertyError){
    return <div>{JSON.stringify(serviceTicketError || memberError || propertyError)}</div>
  }else if(serviceTicketData && serviceTicketData.serviceTicket && memberData && memberData.membersAssignableToTickets && propertyData && propertyData.properties){
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
            />
  } else {
    return <div>No Data...</div>
  }
  
}