import { ServiceTicketData } from "../../infrastructure-services/datastore";

export interface ServiceTicketDatastoreApplicationService {
  getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}