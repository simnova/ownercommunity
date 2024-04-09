import { ServiceData } from "../../external-dependencies/datastore";

export interface ServiceDatastoreApplicationService {
  getServiceById(id: string): Promise<ServiceData>;
  getServices(): Promise<ServiceData[]>;
  getServicesByCommunityId(communityId: string): Promise<ServiceData[]>;
}