import { Service } from "../../../infrastructure-services-impl/datastore/mongodb/models/service";
import { GraphqlContext } from "../../graphql-context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Services extends CosmosDataSource<Service, GraphqlContext> {
  async getServiceById(id: string): Promise<Service> {
    return (
      await this.findByFields({ id: id, community: this.context.community })
    )?.[0];
  }

  async getServices(): Promise<Service[]> {
    return this.findByFields({ community: this.context.community });
  }

  async getServicesByCommunityId(communityId: string): Promise<Service[]> {
    return this.findByFields({ community: communityId });
  }
}
