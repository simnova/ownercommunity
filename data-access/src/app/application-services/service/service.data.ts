import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { ServiceData } from "../../external-dependencies/datastore";
import { AppContext } from "../../init/app-context-builder";

export interface ServiceDataApi {
  getServiceById(id: string): Promise<ServiceData>;
  getServices(): Promise<ServiceData[]>;
  getServicesByCommunityId(communityId: string): Promise<ServiceData[]>;
}

export class ServiceDataApiImpl 
  extends CosmosDataSource<ServiceData, AppContext> 
  implements ServiceDataApi
{
  async getServiceById(id: string): Promise<ServiceData> {
    return (
      await this.findByFields({ id: id, community: this.context.communityId })
    )?.[0];
  }

  async getServices(): Promise<ServiceData[]> {
    return this.findByFields({ community: this.context.communityId });
  }

  async getServicesByCommunityId(communityId: string): Promise<ServiceData[]> {
    return this.findByFields({ community: communityId });
  }
}
