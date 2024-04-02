import { Community } from '../../app/domain/contexts/community/community';
import { CommunityCreateInput, CommunityUpdateInput } from '../../app/application-services/domain/community.interface';
import { CommunityProps } from '../../app/domain/contexts/community/community';
import { CommunityRepository } from '../../app/domain/contexts/community/community.repository';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { CommunityDomainApplicationService } from '../../app/application-services/domain/community.interface';
import { UserEntityReference } from '../../app/domain/contexts/user/user';


type PropType = CommunityProps;
type Root = Community<PropType>;
type RepoType = CommunityRepository<PropType>;

export class CommunityDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements CommunityDomainApplicationService
{
  async communityCreate(input: CommunityCreateInput): Promise<Root> {
    console.log(`communityCreate`,input.communityName);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:communityCreate');
    }
    let user = await this.context.applicationServices.userDataApi.getByExternalId(this.context.verifiedUser.verifiedJWT.sub);
    let userDo = user as UserEntityReference; //new UserConverter().toDomain(mongoUser,ReadOnlyContext());

    let communityToReturn: Root;
    await this.withTransaction(async (repo) => {
      let newCommunity = await repo.getNewInstance(input.communityName, userDo);
      communityToReturn = await repo.save(newCommunity);
    });
    return communityToReturn;
  }

  async communityUpdate(input: CommunityUpdateInput) : Promise<Root> {
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let communityToReturn: Root;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(input.id);
      if(!domainObject) {
        throw new Error('invalid id');
      }
      domainObject.Name=(input.communityName);
      domainObject.Domain=(input.domain);
      domainObject.WhiteLabelDomain=(input.whiteLabelDomain);
      domainObject.Handle=(input.handle);
      communityToReturn = await repo.save(domainObject);
    });
    return communityToReturn;
  }
  
}