import { ViolationTicketData } from "../../external-dependencies/datastore";
import {ViolationTicketCreateInput, ViolationTicketUpdateInput, ViolationTicketDeleteInput, ViolationTicketAssignInput, ViolationTicketChangeStatusInput, ViolationTicketAddUpdateActivityInput } from "../../external-dependencies/graphql-api";

export interface ViolationTicketDomainApplicationService {
  violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData>;
  violationTicketUpdate(input: ViolationTicketUpdateInput) : Promise<ViolationTicketData>;
  violationTicketDelete(input: ViolationTicketDeleteInput): Promise<ViolationTicketData>;
  violationTicketAssign(input: ViolationTicketAssignInput): Promise<ViolationTicketData>;
  violationTicketChangeStatus(input: ViolationTicketChangeStatusInput): Promise<ViolationTicketData>;
  violationTicketAddUpdateActivity(input: ViolationTicketAddUpdateActivityInput): Promise<ViolationTicketData>;
  // serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
}