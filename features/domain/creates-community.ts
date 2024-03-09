import { Ability} from '@serenity-js/core'
import { ExecutionContext } from '../../domain/shared/execution-context';
import { CommunityRepository } from '../../domain/contexts/community/community.repository';
import { CommunityProps } from '../../domain/contexts/community/community';
import { MemoryCommunityUnitOfWork } from '../support/infrastructure/persistance/community.memory-uow';
import { UserRepository } from '../../domain/contexts/user/user.repository';
import { MemoryUserUnitOfWork } from '../support/infrastructure/persistance/user.memory-uow';
import { UserProps } from '../../domain/contexts/user/user';

export class InteractWithTheDomain extends Ability {
  // A static method is typically used to inject a client of a given interface
  // and instantiate the ability, for example:
  //   actorCalled('Phil').whoCan(MakePhoneCalls.using(phone))
  static using(context: ExecutionContext) {
    return new InteractWithTheDomain(context);
  }

  // Abilities can hold state, for example: the client of a given interface,
  // additional configuration, or the result of the last interaction with a given interface.
  public constructor(private readonly context: ExecutionContext) {
    super();
  }

  // Abilities expose methods that enable Interactions to call the system under test,
  // and Questions to retrieve information about its state.
  public async actOnCommunity(func:(repo:CommunityRepository<CommunityProps>) => Promise<void>): Promise<void> {
    MemoryCommunityUnitOfWork.withTransaction(this.context, async (repo) => {
      func(repo);
    });
  }
  public async actOnUser(func:(repo:UserRepository<UserProps>) => Promise<void>): Promise<void> {
    MemoryUserUnitOfWork.withTransaction(this.context, async (repo) => {
      func(repo);
    });
  }
}