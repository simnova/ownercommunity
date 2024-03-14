import { Ability} from '@serenity-js/core'
import { IMemoryDatabase, MemoryDatabase } from '../adapter/infrastructure/persistance/memory-database';
import { ReadOnlyMemoryStore } from '../adapter/infrastructure/core/memory-store/memory-store';
import { ExecutionContext } from '../../../../domain/shared/execution-context';
import { CommunityRepository } from '../../../../domain/contexts/community/community.repository';
import { CommunityProps } from '../../../../domain/contexts/community/community';
import { UserRepository } from '../../../../domain/contexts/user/user.repository';
import { UserProps } from '../../../../domain/contexts/user/user';
import { RoleRepository } from '../../../../domain/contexts/community/role.repository';
import { RoleProps } from '../../../../domain/contexts/community/role';
import { MemberRepository } from '../../../../domain/contexts/community/member.repository';
import { MemberProps } from '../../../../domain/contexts/community/member';
import { DomainExecutionContext } from '../../../../domain/contexts/context';
import { Services } from '../../services';
import RegisterHandlers from '../register-event-handlers';


export class InteractWithTheDomain extends Ability {
  private static _initialized: boolean = false;
  private static database: IMemoryDatabase;

  // A static method is typically used to inject a client of a given interface
  // and instantiate the ability, for example:
  //   actorCalled('Phil').whoCan(MakePhoneCalls.using(phone))
  public static using(context: DomainExecutionContext) {
    if(this._initialized === false) {
      this.startWithEmptyDatabase();
      const services = new Services(InteractWithTheDomain.database);
      RegisterHandlers(services);
      this._initialized = true;
    }
    return new InteractWithTheDomain(context);
  }


  public static startWithEmptyDatabase() {
    InteractWithTheDomain.database = new MemoryDatabase();
  }

  // Abilities can hold state, for example: the client of a given interface,
  // additional configuration, or the result of the last interaction with a given interface.
  public constructor(
    private readonly context: ExecutionContext,
  ) {
    super();
  }

  // Abilities expose methods that enable Interactions to call the system under test,
  // and Questions to retrieve information about its state.


  // community
  public async actOnCommunity(func:(repo:CommunityRepository<CommunityProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain.database.CommunityUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readCommunityDb(func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain.database.CommunityMemoryStore);
  }

  // user
  public async actOnUser(func:(repo:UserRepository<UserProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain.database.UserUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readUserDb(func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain.database.UserMemoryStore);
  }

  // role
  public async actOnRole(func:(repo:RoleRepository<RoleProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain.database.RoleUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readRoleDb(func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain.database.RoleMemoryStore);
  }

  // member
  public async actOnMember(func:(repo:MemberRepository<MemberProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain.database.MemberUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readMemberDb(func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain.database.UserMemoryStore);
  }

}