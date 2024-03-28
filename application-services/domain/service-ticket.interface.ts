import { ServiceTicket, ServiceTicketProps } from '../../domain/contexts/service-ticket/service-ticket';

export interface ServiceTicketDomainApplicationService {
  serviceTicketCreate(input: ServiceTicketCreateInput): Promise<ServiceTicket<ServiceTicketProps>>;
  serviceTicketUpdate(input: ServiceTicketUpdateInput) : Promise<ServiceTicket<ServiceTicketProps>>;
  serviceTicketDelete(input: ServiceTicketDeleteInput): Promise<ServiceTicket<ServiceTicketProps>>;
  serviceTicketSubmit(input: ServiceTicketSubmitInput): Promise<ServiceTicket<ServiceTicketProps>>;
  serviceTicketAssign(input: ServiceTicketAssignInput): Promise<ServiceTicket<ServiceTicketProps>>
  serviceTicketAddUpdateActivity(input: ServiceTicketAddUpdateActivityInput): Promise<ServiceTicket<ServiceTicketProps>>;
  serviceTicketChangeStatus(input: ServiceTicketChangeStatusInput): Promise<ServiceTicket<ServiceTicketProps>>;
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