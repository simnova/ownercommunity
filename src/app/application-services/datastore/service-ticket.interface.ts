import { ServiceTicketDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/service-ticket";

export interface ServiceTicketDatastoreApplicationService {
  getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketDataStructure[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketDataStructure[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketDataStructure[]>; 
}