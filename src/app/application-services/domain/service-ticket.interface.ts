import { ServiceTicketData } from "../../infrastructure-services/datastore";

export interface ServiceTicketDomainApplicationService {
  serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicketData>;
  serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicketData>;
  serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicketData>;
  serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicketData>;
  serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicketData>
  serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicketData>;
  serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicketData>;
}

export type ServiceTicketCreateInput = {
  description: string;
  propertyId: string;
  requestorId?: string;
  serviceId?: string;
  title: string;
};

export type ServiceTicketUpdateInput = {
  description: string;
  priority: number;
  propertyId?: string;
  serviceId?: string;
  serviceTicketId: string;
  title: string;
};

export type ServiceTicketDeleteInput = {
  serviceTicketId: string;
};

export type ServiceTicketSubmitInput = {
  serviceTicketId: string;
};

export type ServiceTicketAssignInput = {
  assignedToId?: string;
  serviceTicketId: string;
};

export type ServiceTicketAddUpdateActivityInput = {
  activityDescription: string;
  serviceTicketId: string;
};

export type ServiceTicketChangeStatusInput = {
  activityDescription?: string;
  serviceTicketId: string;
  status: string;
};