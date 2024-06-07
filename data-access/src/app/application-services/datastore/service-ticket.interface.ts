import { AdminTicketData } from "../../external-dependencies/datastore";

export interface ServiceTicketDatastoreApplicationService {
  getServiceTicketById(id: string): Promise<AdminTicketData>;
  getServiceTicketsByCommunityId(communityId: string): Promise<AdminTicketData[]>;
  getServiceTicketsOpenByRequestor(memberId: string): Promise<AdminTicketData[]>;
  getServiceTicketsClosedByRequestor(memberId: string): Promise<AdminTicketData[]>;
  getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<AdminTicketData[]>; 
}