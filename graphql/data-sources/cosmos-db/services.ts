import { Service } from "../../../infrastructure/data-sources/cosmos-db/models/service";
import { Context } from "../../context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Services extends CosmosDataSource<Service, Context> {
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
