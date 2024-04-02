import { ServiceDataStructure } from "../../app/application-services/datastore";
import { ServiceDatastoreApplicationService } from "../../app/application-services/datastore/service.interface";
import { AppContext } from '../../app/app-context';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class ServiceDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements ServiceDatastoreApplicationService
{
  async getServiceById(id: string): Promise<ServiceDataStructure> {
    let serviceToReturn: ServiceDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = (await datastore.serviceDatastore.findByFields({ id: id, community: this.context.communityId }))?.[0];
    });
    return serviceToReturn;
  }

  async getServices(): Promise<ServiceDataStructure[]> {
    let serviceToReturn: ServiceDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = await datastore.serviceDatastore.findByFields({ community: this.context.communityId });
    });
    return serviceToReturn;
  }

  async getServicesByCommunityId(communityId: string): Promise<ServiceDataStructure[]> {
    let serviceToReturn: ServiceDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = await datastore.serviceDatastore.findByFields({ community: communityId });
    });
    return serviceToReturn;
  }
}
