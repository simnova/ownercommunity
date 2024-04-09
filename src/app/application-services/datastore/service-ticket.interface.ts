import { ServiceTicketData } from "../../external-dependencies/datastore";

export interface ServiceTicketDatastoreApplicationService {
  getServiceTicketById(id: string): Promise<ServiceTicketData>;
  getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}