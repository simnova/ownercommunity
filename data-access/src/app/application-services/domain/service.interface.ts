import { ServiceData } from "../../external-dependencies/datastore";
import { ServiceCreateInput, ServiceUpdateInput } from "../../external-dependencies/graphql-api";

export interface ServiceDomainApplicationService {
  serviceCreate(input: ServiceCreateInput) : Promise<ServiceData>;
  serviceUpdate(input: ServiceUpdateInput) : Promise<ServiceData>;
}