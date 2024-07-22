import { ServiceData } from "../../external-dependencies/datastore";
import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { ServiceDataApi } from "../../application-services/datastore";
import { AppContext } from "../../init/app-context-builder";

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
