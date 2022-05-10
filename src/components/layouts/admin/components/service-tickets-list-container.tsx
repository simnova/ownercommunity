import { useQuery } from "@apollo/client";
import { AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument } from "../../../../generated";
import { ServiceTicketsList} from "./service-tickets-list";
import { Skeleton } from "antd";

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const { data: serviceTicketData, loading: serviceTicketLoading, error: serviceTicketError } = useQuery(AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument,
    {
      variables: {communityId: props.data.communityId}
    });

  if(serviceTicketLoading) {
    return <div><Skeleton active /></div>
  }
  if(serviceTicketError) {
    return <div>{JSON.stringify(serviceTicketError)}</div>
  }
  if(serviceTicketData ) {    
    return <ServiceTicketsList data={serviceTicketData.serviceTicketsByCommunityId} />
  } else {
    return <div>No Data...</div>
  }
}