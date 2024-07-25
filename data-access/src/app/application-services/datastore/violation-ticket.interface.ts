import { ViolationTicketData } from '../../external-dependencies/datastore';
import { PaymentTransactionsResult } from '../../external-dependencies/graphql-api';

export interface ViolationTicketDatastoreApplicationService {
  getViolationTicketById(id: string): Promise<ViolationTicketData>;
  getMemberPaymentTransactions(id: string): Promise<PaymentTransactionsResult[]>;
  // getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>;
}
