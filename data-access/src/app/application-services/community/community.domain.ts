import { DomainDataSource } from "../../data-sources/domain-data-source";
import { CommunityVisa } from "../../domain/contexts/community/community.visa";
import { Community } from "../../domain/contexts/community/community/community";
import { ReadOnlyContext } from "../../domain/domain-execution-context";
import { CommunityData } from "../../external-dependencies/datastore";
import { CommunityDomainAdapter, EndUserConverter, CommunityConverter, CommunityRepository } from "../../external-dependencies/domain";
import { CommunityCreateInput, CommunityUpdateInput } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface CommunityDomainApi {
  communityCreate(input: CommunityCreateInput) : Promise<CommunityData>;
  communityUpdate(input: CommunityUpdateInput) : Promise<CommunityData>;
}

type PropType = CommunityDomainAdapter;
type DomainType = Community<PropType>;
type RepoType = CommunityRepository<PropType>;

export class CommunityDomainApiImpl
  extends DomainDataSource<AppContext, CommunityData, PropType, CommunityVisa, DomainType, RepoType>
  implements CommunityDomainApi {

  async communityCreate(input: CommunityCreateInput): Promise<CommunityData> {
    console.log(`communityCreate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:communityCreate');
    }
    let mongoUser = await this.context.applicationServices.users.endUser.dataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let userDo = new EndUserConverter().toDomain(mongoUser, ReadOnlyContext());

    let communityToReturn: CommunityData;
    await this.withTransaction(async (repo) => {
      let newCommunity = await repo.getNewInstance(
        input.name,
        userDo);
      communityToReturn = new CommunityConverter().toPersistence(await repo.save(newCommunity));
    });
    return communityToReturn;
  }

  async communityUpdate(community: CommunityUpdateInput): Promise<CommunityData> {
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result: CommunityData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(community.id);
      if (!domainObject) {
        throw new Error('invalid id');
      }
      domainObject.Name = (community.name);
      domainObject.Domain = (community.domain);
      domainObject.WhiteLabelDomain = (community.whiteLabelDomain);
      domainObject.Handle = (community.handle);
      result = (new CommunityConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }

}


