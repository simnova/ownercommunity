import { ViolationTicketData } from '../../external-dependencies/datastore';
import {
  ViolationTicketCreateInput,
  ViolationTicketUpdateInput,
  ViolationTicketDeleteInput,
  ViolationTicketAssignInput,
  ViolationTicketChangeStatusInput,
  ViolationTicketAddUpdateActivityInput,
  ViolationTicketProcessPaymentInput,
} from '../../external-dependencies/graphql-api';

export interface ViolationTicketDomainApplicationService {
  violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData>;
  violationTicketUpdate(input: ViolationTicketUpdateInput): Promise<ViolationTicketData>;
  violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData>;
  violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData>;
  violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData>;
  violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData>;
  violationTicketProcessPayment(input: ViolationTicketProcessPaymentInput): Promise<ViolationTicketData>;
  // serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
}
