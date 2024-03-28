import { ServiceDataStructure } from ".";
import { ServiceDatastoreApplicationService } from "../../application-services/datastore/service.interface";
import { Context } from '../../startup/context';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class ServiceDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
  implements ServiceDatastoreApplicationService
{
  async getServiceById(id: string): Promise<ServiceDataStructure> {
    let serviceToReturn: ServiceDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = (await datastore.serviceDatastore.findByFields({ id: id, community: this.context.community }))?.[0];
    });
    return serviceToReturn;
  }

  async getServices(): Promise<ServiceDataStructure[]> {
    let serviceToReturn: ServiceDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      serviceToReturn = await datastore.serviceDatastore.findByFields({ community: this.context.community });
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
