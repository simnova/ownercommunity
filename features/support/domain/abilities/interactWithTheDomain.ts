import { Ability} from '@serenity-js/core'
import { CommunityRepository } from '../../../../domain/contexts/community/community.repository';
import { ExecutionContext } from '../../../../domain/shared/execution-context';
import { CommunityProps } from '../../../../domain/contexts/community/community';
import { UserRepository } from '../../../../domain/contexts/user/user.repository';
import { User, UserProps } from '../../../../domain/contexts/user/user';
import { IMemoryDatabase } from '../adapter/infrastructure/persistance/memory-database';
import { ReadOnlyMemoryStore } from '../adapter/infrastructure/core/memory-store/memory-store';


export class InteractWithTheDomain extends Ability {
  // private lastResponse: any;
  

  // A static method is typically used to inject a client of a given interface
  // and instantiate the ability, for example:
  //   actorCalled('Phil').whoCan(MakePhoneCalls.using(phone))
  static using(context: ExecutionContext, database: IMemoryDatabase) {
    return new InteractWithTheDomain(context, database);
  }

  // Abilities can hold state, for example: the client of a given interface,
  // additional configuration, or the result of the last interaction with a given interface.
  public constructor(
    private readonly context: ExecutionContext,
    private database: IMemoryDatabase
    ) {
    super();
  }

  // Abilities expose methods that enable Interactions to call the system under test,
  // and Questions to retrieve information about its state.
  public async actOnCommunity(func:(repo:CommunityRepository<CommunityProps>) => Promise<void>): Promise<void> {
    this.database.CommunityUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
      // this.lastResponse = await repo.getAll();
    });
  }
  public async readCommunityDb(func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>): Promise<void> {
    return await func(this.database.CommunityMemoryStore);
  }
  public async actOnUser(func:(repo:UserRepository<UserProps>) => Promise<void>): Promise<void> {
    this.database.UserUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
      // this.lastResponse = await repo.getAll();
    });
  }
  public async readUserDb(func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>): Promise<void> {
    return await func(this.database.UserMemoryStore);
  }

  // public async getLastResponse<T>(): Promise<T> {
  //   return this.lastResponse as T;
  // }

}