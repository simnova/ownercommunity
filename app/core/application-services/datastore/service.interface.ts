import { ServiceDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/service";

export interface ServiceDatastoreApplicationService {
  getServiceById(id: string): Promise<ServiceDataStructure>;
  getServices(): Promise<ServiceDataStructure[]>;
  getServicesByCommunityId(communityId: string): Promise<ServiceDataStructure[]>;
}