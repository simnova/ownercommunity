import { ViolationTicketData } from "../../external-dependencies/datastore";
import {ViolationTicketCreateInput, ViolationTicketUpdateInput } from "../../external-dependencies/graphql-api";

export interface ViolationTicketDomainApplicationService {
  violationTicketCreate(input: ViolationTicketCreateInput): Promise<ViolationTicketData>;
  violationTicketUpdate(input: ViolationTicketUpdateInput) : Promise<ViolationTicketData>;
  // serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  // serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData>;
  // serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData>;
  // serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
  // serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData>
  // serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData>;
  // serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData>;
}