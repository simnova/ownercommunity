import { ServiceData } from "../../infrastructure-services/datastore";

export interface ServiceDomainApplicationService {
  serviceCreate(input: ServiceCreateInput) : Promise<ServiceData>;
  serviceUpdate(input: ServiceUpdateInput) : Promise<ServiceData>;
}

export type ServiceCreateInput = {
  description: string;
  serviceName: string;
};

export type ServiceUpdateInput = {
  description?: string;
  id: string;
  isActive?: boolean;
  serviceName?: string;
};