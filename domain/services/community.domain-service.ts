import { Community } from '../contexts/community/community';
import { DomainService } from '../../domain-seedwork/domain-service';
import { DomainExecutionContext } from '../contexts/execution-context';
import { CommunityProps } from '../contexts/community/community';
import { CommunityRepository } from '../contexts/community/community.repository';
import { UserEntityReference } from '../contexts/user/user';

export type CommunityCreateInput = {
  name: string;
};

export type CommunityUpdateInput = {
  id: string;
  domain?: string;
  handle?: string;
  name?: string;
  whiteLabelDomain?: string;
};

type PropType = CommunityProps;
type Root = Community<PropType>;
type RepoType = CommunityRepository<PropType>;

export class CommunityDomainService<Context extends DomainExecutionContext> extends DomainService<Context, PropType, Root, RepoType> 
{
  async communityCreate(input: CommunityCreateInput, user: UserEntityReference) : Promise<Root> {
    let communityToReturn : Root;
    await this.withTransaction(async (repo) => {
      let newCommunity = await repo.getNewInstance(
        input.name,
        user);
      communityToReturn = await repo.save(newCommunity);
    });
    return communityToReturn;
  }

  async communityUpdate(community: CommunityUpdateInput) : Promise<Root> {

    let communityToReturn : Root;
    await this.withTransaction(async (repo) => {
      let communityToBeUpdated = await repo.get(community.id);
      if(!communityToBeUpdated) {
        throw new Error('invalid id');
      }
      communityToBeUpdated.Name=(community.name);
      communityToBeUpdated.Domain=(community.domain);
      communityToBeUpdated.WhiteLabelDomain=(community.whiteLabelDomain);
      communityToBeUpdated.Handle=(community.handle);
      communityToReturn = await repo.save(communityToBeUpdated);
    });
    return communityToReturn;
  }
  
}