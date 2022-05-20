import { useQuery } from '@apollo/client';
import { MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument } from '../../../../generated';
import { ServiceTicketsList} from './service-tickets-list';
import { Skeleton } from 'antd';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const { data: serviceTicketData, loading: serviceTicketLoading, error: serviceTicketError } = useQuery(MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument);

  if(serviceTicketLoading) {
    return <div><Skeleton active /></div>
  }
  if(serviceTicketError) {
    return <div>{JSON.stringify(serviceTicketError)}</div>
  }
  if(serviceTicketData ) {    
    return <ServiceTicketsList data={serviceTicketData.serviceTicketsOpenByRequestor} />
  } else {
    return <div>No Data...</div>
  }
}