import { Context } from '../../core/context';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';
import { CommunityDataStructure } from '../../core/application-services/datastore';
import { CommunityDatastoreApplicationService } from '../../core/application-services/datastore/community.interface';

export class CommunityDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
  implements CommunityDatastoreApplicationService
{

  async getCurrentCommunity(): Promise<CommunityDataStructure> {
    let communityToReturn: CommunityDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = await datastore.communityDatastore.findOneById(this.context.community);
    });
    return communityToReturn;
  }

  async getCommunityById(communityId: string): Promise<CommunityDataStructure> {
    let communityToReturn: CommunityDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = await datastore.communityDatastore.findOneById(communityId);
    });
    return communityToReturn;
  }

  async getCommunityByHandle(handle: string): Promise<CommunityDataStructure> {
    let communityToReturn: CommunityDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore.findByFields({ handle: handle }))?.[0];
    });
    return communityToReturn;
  }

  async getCommunityByDomain(domain: string): Promise<CommunityDataStructure> {
    let communityToReturn: CommunityDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore.findByFields({ domain: domain }))?.[0];
    });
    return communityToReturn;
  }

  async getCommunityByHeader(header: string): Promise<CommunityDataStructure> {
    let communityToReturn: CommunityDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = (await datastore.communityDatastore.getCommunityByHeader(header));
    });
    return communityToReturn;
  }

  async userIsAdmin(communityId: string): Promise<boolean> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    let isUserAdmin: boolean;
    await this.withDatastore(async (_passport, datastore) => {
      isUserAdmin = await datastore.communityDatastore.isUserAdmin(communityId, externalId);
    });
    return isUserAdmin;
  }

  async getCommunitiesForCurrentUser(): Promise<CommunityDataStructure[]> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    let communityToReturn: CommunityDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      communityToReturn = await datastore.communityDatastore.getCommunitiesForUser(externalId);
    });
    return communityToReturn;
  }
}
