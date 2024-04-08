import { Ability, AbilityType, Actor, UsesAbilities, actorInTheSpotlight, notes} from '@serenity-js/core'
import { IMemoryDatabase, MemoryDatabase } from '../../../src/infrastructure-services-impl/datastore/memorydb/memory-database';
import { ReadOnlyMemoryStore } from '../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { BaseDomainExecutionContext } from '../../../seedwork/domain-seedwork/base-domain-execution-context';
import { CommunityRepository } from '../../../src/app/domain/contexts/community/community.repository';
import { CommunityEntityReference, CommunityProps } from '../../../src/app/domain/contexts/community/community';
import { UserRepository } from '../../../src/app/domain/contexts/user/user.repository';
import { UserEntityReference, UserProps } from '../../../src/app/domain/contexts/user/user';
import { RoleRepository } from '../../../src/app/domain/contexts/community/role.repository';
import { RoleProps } from '../../../src/app/domain/contexts/community/role';
import { MemberRepository } from '../../../src/app/domain/contexts/community/member.repository';
import { Member, MemberEntityReference, MemberProps } from '../../../src/app/domain/contexts/community/member';
import { DomainExecutionContext } from '../../../src/app/domain/contexts/domain-execution-context';
// import { DomainInfrastructureImplBDD } from './io/domain-infrastructure-impl-instance-bdd';
import { InfrastructureServicesBuilderBDD } from './io/infrastructure-services-builder-bdd';
import {DomainImplBDD} from './io/test/domain-impl-bdd';
import { ReadOnlyContext, SystemExecutionContext } from '../../../src/app/domain/contexts/domain-execution-context';
import { PassportImpl } from '../../../src/app/domain/contexts/iam/passport';
// import { getCommunityByName } from '../../helpers/get-community-by-name';
// import { getMemberByUserAndCommunity } from '../../helpers/get-member-by-user-community';
// import { getOrCreateUserForActor } from '../../helpers/get-or-create-user-for-actor';
import { NotepadType } from '../../actors';
import { MemoryCognitiveSearchImpl } from '../../../src/infrastructure-services-impl/cognitive-search/in-memory/impl';
import { PropertyRepository } from '../../../src/app/domain/contexts/property/property.repository';
import { PropertyProps } from '../../../src/app/domain/contexts/property/property';
import { NodeEventBusInstance } from '../../../seedwork/event-bus-seedwork-node';
import { MemorydbDatastoreImpl } from '../../../src/infrastructure-services-impl/datastore/memorydb/impl';
import { ServiceTicketRepository } from '../../../src/app/domain/contexts/service-ticket/service-ticket.repository';
import { ServiceTicketProps } from '../../../src/app/domain/contexts/service-ticket/service-ticket';

export interface InteractWithTheDomainAsUnregisteredUser {
  registerAsUser: (actor: Actor) => Promise<InteractWithTheDomainAsRegisteredUser>;
}
export interface InteractWithTheDomainAsRegisteredUser {
  createCommunity: (communityName: string) => Promise<CommunityProps>;
  getMyCommunities: () => Promise<CommunityProps[]>;
  asMemberOf: (communityName: string) => Promise<InteractWithTheDomainAsCommunityMember>;
}

export interface InteractWithTheDomainAsCommunityMember {
  actOnCommunity: (func:(repo:CommunityRepository<CommunityProps>) => Promise<void>) => Promise<void>;
  readCommunityDb: (func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>) => Promise<void>;
  actOnRole: (func:(repo:RoleRepository<RoleProps>) => Promise<void>) => Promise<void>;
  readRoleDb: (func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>) => Promise<void>;
  actOnMember: (func:(repo:MemberRepository<MemberProps>) => Promise<void>) => Promise<void>;
  readMemberDb: (func:(db: ReadOnlyMemoryStore<MemberProps>) => Promise<void>) => Promise<void>;
  actOnUser: (func:(repo:UserRepository<UserProps>) => Promise<void>) => Promise<void>;
  readUserDb: (func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>) => Promise<void>;
  actOnProperty: (func:(repo:PropertyRepository<PropertyProps>) => Promise<void>) => Promise<void>;
  readPropertyDb: (func:(db: ReadOnlyMemoryStore<PropertyProps>) => Promise<void>) => Promise<void>;
  actOnServiceTicket: (func: (repo:ServiceTicketRepository<ServiceTicketProps>) => Promise<void>) => Promise<void>;
  readServiceTicketDb: (func: (db: ReadOnlyMemoryStore<ServiceTicketProps>) => Promise<void>) => Promise<void>;
}

export interface InteractWithTheDomainAsReadOnly {
  readCommunityDb: (func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>) => Promise<void>;
  readRoleDb: (func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>) => Promise<void>;
  readMemberDb: (func:(db: ReadOnlyMemoryStore<MemberProps>) => Promise<void>) => Promise<void>;
  readUserDb: (func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>) => Promise<void>;
  readPropertyDb: (func:(db: ReadOnlyMemoryStore<PropertyProps>) => Promise<void>) => Promise<void>;
  readServiceTicketDb: (func:(db: ReadOnlyMemoryStore<ServiceTicketProps>) => Promise<void>) => Promise<void>;
  logSearchDatabase: () => Promise<void>;
  logDatabase: () => Promise<void>;
}

export class InteractWithTheDomain extends Ability 
  implements InteractWithTheDomainAsRegisteredUser, 
  InteractWithTheDomainAsCommunityMember,
  InteractWithTheDomainAsUnregisteredUser
{
  // private static _initialized: boolean = false;
  private static _database: MemorydbDatastoreImpl;
  private static _searchDatabase: MemoryCognitiveSearchImpl;
  // private _user: UserEntityReference;

  // A static method is typically used to inject a client of a given interface
  // and instantiate the ability, for example:
  //   actorCalled('Phil').whoCan(MakePhoneCalls.using(phone))
  private static DomainImplBDDInstance: DomainImplBDD<MemorydbDatastoreImpl, MemoryCognitiveSearchImpl>;
  public static startup() {
    // if(this._initialized === false) {
      this.startWithEmptyDatabase();
      this.startWithEmptySearchDatabase();
      const DomainInfrastructureImplBDDInstance = new InfrastructureServicesBuilderBDD( // new DomainInfrastructureImplBDD(
        InteractWithTheDomain._database,
        InteractWithTheDomain._searchDatabase
      )
      this.DomainImplBDDInstance = new DomainImplBDD(
        DomainInfrastructureImplBDDInstance.datastore,
        DomainInfrastructureImplBDDInstance.cognitiveSearch
      ) as DomainImplBDD<MemorydbDatastoreImpl, MemoryCognitiveSearchImpl>;
      this.DomainImplBDDInstance.startup();
      // this._initialized = true;
    // }
  }

  public static shutdown() {
    // NodeEventBusInstance.removeAllListeners();
    this.DomainImplBDDInstance.shutdown();
  }
  
  private static using(context: DomainExecutionContext) {
    // this.init();
    return new InteractWithTheDomain(context);
  }

  private async getCommunityByName(communityName: string): Promise<CommunityEntityReference> {
    let community: CommunityEntityReference;
    await InteractWithTheDomain.asReadOnly().readCommunityDb(async (db) => {
      community = db?.getAll()?.find(c => c.name === communityName);
    });
    return community;
  }

  private async getMemberByUserAndCommunity(userExternalId: string, communityName: string): Promise<MemberEntityReference> {
    let member: MemberProps;
    await InteractWithTheDomain.asReadOnly().readMemberDb(async (db) => {
      member = db?.getAll()?.find(c => c.community.name === communityName && c.accounts.items.find(a => a.user.externalId === userExternalId));
    });
    return new Member(member, ReadOnlyContext());
  }

  public async asMemberOf(communityName: string): Promise<InteractWithTheDomainAsCommunityMember>{
    const actor = actorInTheSpotlight();
    const community: CommunityEntityReference = await this.getCommunityByName(communityName);
    const user: UserEntityReference = await this.getOrCreateUserForActor(actor);
    const member: MemberEntityReference = await this.getMemberByUserAndCommunity(user.externalId, community.name);
    const passport = new PassportImpl(user, member, community);
    return new InteractWithTheDomain({passport});
  }

  // [MG-TBD] - make it as no-context
  public static asReadOnly(): InteractWithTheDomainAsReadOnly{
    return this.using(ReadOnlyContext());
  }


  private async getOrCreateUserForActor(actor: Actor): Promise<UserEntityReference> {
    const externalId = await notes<NotepadType>().get('user').externalId.answeredBy(actorInTheSpotlight());
    const firstName = await notes<NotepadType>().get('user').firstName.answeredBy(actorInTheSpotlight());
    const lastName = await notes<NotepadType>().get('user').lastName.answeredBy(actorInTheSpotlight());
  
    let user: UserEntityReference;
    await InteractWithTheDomain.asReadOnly().readUserDb(async (db) => {
      user = db?.getAll()?.find(user => user.externalId === externalId);
    });
    if(user) {
      return user;
    }
    
    let newUser: UserEntityReference;
    await InteractWithTheDomain.as(actor).actOnUser(async (repo) => {
      const user = await repo.getNewInstance(externalId, firstName, lastName);
      newUser = await repo.save(user);
    });
    return newUser;
  }
  
  // private async setUserForActor(actor: Actor): Promise<void> {
  //   // this._user = await this.getOrCreateUserForActor(actor);
  //   await this.getOrCreateUserForActor(actor);
  // }

  public static async asUser(actor: Actor): Promise<InteractWithTheDomainAsRegisteredUser>{
    const interactWithTheDomain = InteractWithTheDomain.using(ReadOnlyContext());
    return interactWithTheDomain;
  }

  // asSystem() is okay here because we don't have a domain execution context for non-community functions
  // public createCommunity = async (communityName: string): Promise<CommunityProps> => {
  //   let community: CommunityProps;
  //   await InteractWithTheDomain.asUser(actorInTheSpotlight()).actOnCommunity(async (repo) => {
  //     const user: UserEntityReference = await this.getOrCreateUserForActor(actorInTheSpotlight());
  //     const communityToBeSaved = await repo.getNewInstance(communityName, user);
  //     const savedCommunity = await repo.save(communityToBeSaved);
  //     community = savedCommunity['props'] as CommunityProps;
  //   });
  //   return community;
  // }

  public getMyCommunities = async(): Promise<CommunityProps[]> => {
    let communities: CommunityProps[];
    await InteractWithTheDomain.asReadOnly().readMemberDb(async (db) => {
      const user: UserEntityReference = await this.getOrCreateUserForActor(actorInTheSpotlight());
      communities = db?.getAll()?.filter(c => c.accounts.items.find(a => a.user.externalId === user.externalId))?.map(c => c.community);
    });
    return communities;
  }

  public forCommunity = async(communityName: string): Promise<InteractWithTheDomainAsCommunityMember> => {
    return this.asMemberOf(communityName);
  }
  
  public async registerAsUser (actor: Actor): Promise<InteractWithTheDomainAsRegisteredUser> {
    const interactWithTheDomain = InteractWithTheDomain.using(ReadOnlyContext());
    await interactWithTheDomain.getOrCreateUserForActor(actor);
    return interactWithTheDomain;
  }

  public static asActor(actor: Actor): InteractWithTheDomainAsUnregisteredUser {
    const interactWithTheDomain = this.using(ReadOnlyContext());
    return interactWithTheDomain;
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
    InteractWithTheDomain._database = new MemorydbDatastoreImpl(
      new MemoryDatabase()
    );
  }

  public static startWithEmptySearchDatabase() {
    InteractWithTheDomain._searchDatabase = new MemoryCognitiveSearchImpl();
  }

  // Abilities can hold state, for example: the client of a given interface,
  // additional configuration, or the result of the last interaction with a given interface.
  public constructor(
    private readonly context: DomainExecutionContext // BaseDomainExecutionContext,
  ) {
    super();
  }

  

  // Abilities expose methods that enable Interactions to call the system under test,
  // and Questions to retrieve information about its state.


  public async createCommunity(communityName: string): Promise<CommunityProps> {
    let community: CommunityProps;
    await InteractWithTheDomain._database.communityUnitOfWork.withTransaction(this.context, async (repo) => {
        const user: UserEntityReference = await this.getOrCreateUserForActor(actorInTheSpotlight());
        const communityToBeSaved = await repo.getNewInstance(communityName, user);
        const savedCommunity = await repo.save(communityToBeSaved);
        community  = savedCommunity['props'];
    });
    return community;
  }
  // community
  public async actOnCommunity(func:(repo:CommunityRepository<CommunityProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.communityUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readCommunityDb(func:(db: ReadOnlyMemoryStore<CommunityProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.communityReadonlyMemoryStore);
  }

  // user
  public async actOnUser(func:(repo:UserRepository<UserProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.userUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readUserDb(func:(db: ReadOnlyMemoryStore<UserProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.userReadonlyMemoryStore);
  }

  // role
  public async actOnRole(func:(repo:RoleRepository<RoleProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.roleUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readRoleDb(func:(db: ReadOnlyMemoryStore<RoleProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.roleReadonlyMemoryStore);
  }

  // member
  public async actOnMember(func:(repo:MemberRepository<MemberProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.memberUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readMemberDb(func:(db: ReadOnlyMemoryStore<MemberProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.memberReadonlyMemoryStore);
  }

  // property
  public async actOnProperty(func:(repo:PropertyRepository<PropertyProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.propertyUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readPropertyDb(func:(db: ReadOnlyMemoryStore<PropertyProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.propertyReadonlyMemoryStore);
  }

  // service ticket
  public async actOnServiceTicket(func:(repo:ServiceTicketRepository<ServiceTicketProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.serviceTicketUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readServiceTicketDb(func:(db: ReadOnlyMemoryStore<ServiceTicketProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.serviceTicketReadonlyMemoryStore);
  }

  // service
  public async actOnService(func:(repo:ServiceTicketRepository<ServiceTicketProps>) => Promise<void>): Promise<void> {
    InteractWithTheDomain._database.serviceTicketUnitOfWork.withTransaction(this.context, async (repo) => {
      await func(repo);
    });
  }
  public async readServiceDb(func:(db: ReadOnlyMemoryStore<ServiceTicketProps>) => Promise<void>): Promise<void> {
    return await func(InteractWithTheDomain._database.serviceTicketReadonlyMemoryStore);
  }

  public async logSearchDatabase() {
    console.log('===> Memory Search Database ************');
    InteractWithTheDomain._searchDatabase.logSearchCollectionIndexMap();
  }

  public async logDatabase() {
    console.log('===> Memory Database ************');
    await InteractWithTheDomain.asReadOnly().readCommunityDb(async (db) => {
      console.log('===> database > community : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asReadOnly().readUserDb(async (db) => {
      console.log('===> database > user : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asReadOnly().readRoleDb(async (db) => {
      console.log('===> database > role : ', JSON.stringify(db));
    });

    await InteractWithTheDomain.asReadOnly().readMemberDb(async (db) => {
      console.log('===> database > member : ', JSON.stringify(db));
    });
    await InteractWithTheDomain.asReadOnly().readPropertyDb(async (db) => {
      console.log('===> database > property : ', JSON.stringify(db));
    });
  }

}