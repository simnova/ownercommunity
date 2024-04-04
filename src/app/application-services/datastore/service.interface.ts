import { ServiceData } from "../../infrastructure-services/datastore";

export interface ServiceDatastoreApplicationService {
  getServiceById(id: string): Promise<ServiceData>;
  getServices(): Promise<ServiceData[]>;
  getServicesByCommunityId(communityId: string): Promise<ServiceData[]>;
}