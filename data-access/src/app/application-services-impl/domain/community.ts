import { Community } from '../../domain/contexts/community/community';
import { ReadOnlyContext } from '../../domain/contexts/domain-execution-context';
import { CommunityCreateInput, CommunityUpdateInput } from '../../external-dependencies/graphql-api';
import { DomainDataSource } from './domain-data-source';
import { CommunityConverter, CommunityDomainAdapter, CommunityRepository, UserConverter } from '../../external-dependencies/domain';
import { CommunityData } from '../../external-dependencies/datastore';
import { CommunityDomainApi } from '../../application-services/domain';
import { AppContext } from '../../init/app-context-builder';

type PropType = CommunityDomainAdapter;
type DomainType = Community<PropType>;
type RepoType = CommunityRepository<PropType>;

export class CommunityDomainApiImpl
  extends DomainDataSource<AppContext,CommunityData,PropType,DomainType,RepoType> 
  implements CommunityDomainApi
{

  async communityCreate(input: CommunityCreateInput) : Promise<CommunityData> {
    console.log(`communityCreate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:communityCreate');
    }
    let mongoUser = await this.context.applicationServices.userDataApi.getUserByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let userDo = new UserConverter().toDomain(mongoUser,ReadOnlyContext());

    let communityToReturn : CommunityData;
    await this.withTransaction(async (repo) => {
      let newCommunity = await repo.getNewInstance(
        input.name,
        userDo);
      communityToReturn = new CommunityConverter().toPersistence(await repo.save(newCommunity));
    });
    return communityToReturn;
  }

  async communityUpdate(community: CommunityUpdateInput) : Promise<CommunityData> {
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result : CommunityData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(community.id);
      if(!domainObject) {
        throw new Error('invalid id');
      }
      domainObject.Name=(community.name);
      domainObject.Domain=(community.domain);
      domainObject.WhiteLabelDomain=(community.whiteLabelDomain);
      domainObject.Handle=(community.handle);
      result = (new CommunityConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }
  
}