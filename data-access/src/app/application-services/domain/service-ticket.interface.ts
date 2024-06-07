import { ServiceTicketData } from "../../external-dependencies/datastore";
import { ServiceTicketAddUpdateActivityInput, ServiceTicketAssignInput, ServiceTicketChangeStatusInput, ServiceTicketCreateInput, ServiceTicketDeleteInput, ServiceTicketSubmitInput, ServiceTicketUpdateInput } from "../../external-dependencies/graphql-api";

export interface ServiceTicketDomainApplicationService {
  serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  adminTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData>;
  serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData>;
  serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
  serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData>
  serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData>;
  serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData>;
}