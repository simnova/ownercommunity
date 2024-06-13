import { AdminTicketData } from "../../external-dependencies/datastore";
import { AdminTicketCreateInput, AdminTicketUpdateInput } from "../../external-dependencies/graphql-api";

export interface AdminTicketDomainApplicationService {
  adminTicketCreate(input: AdminTicketCreateInput): Promise<AdminTicketData>;
  violationTicketUpdate(input: AdminTicketUpdateInput) : Promise<AdminTicketData>;
  // serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  // serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData>;
  // serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData>;
  // serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
  // serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData>
  // serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData>;
  // serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData>;
}