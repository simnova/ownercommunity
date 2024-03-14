import { Ability, AbilityType, Actor, UsesAbilities} from '@serenity-js/core'
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
import { SystemExecutionContext } from '../../../../domain/infrastructure/execution-context';

export interface InteractWithTheDomainAsUser {
  createCommunity: (communityName: string) => Promise<CommunityProps>;
  getMyCommunities: () => Promise<CommunityProps[]>;
  forCommunity: (communityName: string) => InteractWithTheDomainAsCommunityMember;
}

export interface InteractWithTheDomainAsCommunityMember {
  actOnCommunity: (func:(repo:CommunityRepository<CommunityProps>) => Promise<void>) => Promise<void>;
  readCommunityDb: (func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>) => Promise<void>;
  actOnRole: (func:(repo:RoleRepository<RoleProps>) => Promise<void>) => Promise<void>;
  readRoleDb: (func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>) => Promise<void>;
  actOnMember: (func:(repo:MemberRepository<MemberProps>) => Promise<void>) => Promise<void>;
  readMemberDb: (func:(db: ReadOnlyMemoryStore<MemberProps>) => Promise<void>) => Promise<void>;
}

export class InteractWithTheDomain extends Ability {
  private static _initialized: boolean = false;
  private static _database: IMemoryDatabase;
  private _user: UserProps;
  private _domainExecutionContext: DomainExecutionContext

  // A static method is typically used to inject a client of a given interface
  // and instantiate the ability, for example:
  //   actorCalled('Phil').whoCan(MakePhoneCalls.using(phone))
  public static init() {
    if(this._initialized === false) {
      this.startWithEmptyDatabase();
      const services = new Services(InteractWithTheDomain._database);
      RegisterHandlers(services);
      this._initialized = true;
    }
  }

  private static using(context: DomainExecutionContext) {
    this.init();
    return new InteractWithTheDomain(context);
  }

  public asMemberOf(communityName: string){
    // look up the community by name
    // build execution context
  }

  public static asSystem(){
    return this.using(SystemExecutionContext());
  }


  // [MG-TBD] update domain execution context
  public static asActor(actor: Actor){
    return this.using(SystemExecutionContext());
  }
  // public static withNoCommunity() {
  // public static as<A extends Ability>(actor: UsesAbilities): A {
  //   // look up the user by actor notes -> externalId
  //   // get or create user
  //   // build execution context ??
  //   // return this.using(SystemExecutionContext());

  //   // return with actor's ability to interact with the domain using SystemExecutionContext
  //   // return actor.abilityTo(InteractWithTheDomain) as A;
  //   return new InteractWithTheDomain(SystemExecutionContext) as unknown as A;
  // }

  public static startWithEmptyDatabase() {
    InteractWithTheDomain._database = new MemoryDatabase();
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
    InteractWithTheDomain._database.CommunityUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readCommunityDb(func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.CommunityMemoryStore);
  }

  // user
  public async actOnUser(func:(repo:UserRepository<UserProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.UserUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readUserDb(func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.UserMemoryStore);
  }

  // role
  public async actOnRole(func:(repo:RoleRepository<RoleProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.RoleUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readRoleDb(func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.RoleMemoryStore);
  }

  // member
  public async actOnMember(func:(repo:MemberRepository<MemberProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.MemberUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readMemberDb(func:(db: ReadOnlyMemoryStore<MemberProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.MemberMemoryStore);
  }

}