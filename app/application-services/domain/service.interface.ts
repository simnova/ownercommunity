import { Service, ServiceProps } from '../../domain/contexts/service-ticket/service';

export interface ServiceDomainApplicationService {
  serviceCreate(input: ServiceCreateInput) : Promise<Service<ServiceProps>>;
  serviceUpdate(input: ServiceUpdateInput) : Promise<Service<ServiceProps>>;
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