import { ViolationTicketData } from "../../external-dependencies/datastore";

export interface ViolationTicketDatastoreApplicationService {
  getViolationTicketById(id: string): Promise<ViolationTicketData>;
  // getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}