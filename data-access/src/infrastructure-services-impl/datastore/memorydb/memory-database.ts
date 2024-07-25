// core
import { EntityProps } from "../../../../seedwork/domain-seedwork/entity";
import { BaseDomainExecutionContext } from "../../../../seedwork/domain-seedwork/base-domain-execution-context";
import { MemoryUnitOfWork } from "../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStore, ReadOnlyMemoryStore } from "../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
// community
import { Community, CommunityProps } from "../../../app/domain/contexts/community/community/community";
import { MemoryCommunityRepository } from "./infrastructure/community/community.memory-repository";
import { buildMemoryCommunityUnitOfWork } from "./infrastructure/community/community.memory-uow"
// import { MemoryCommunityDatastore } from "./infrastructure/community.memory-datastore";
// user
import { User, UserProps } from "../../../app/domain/contexts/user/user";
import { MemoryUserRepository } from "./infrastructure/user/user.memory-repository";
import { buildMemoryUserUnitOfWork } from "./infrastructure/user/user.memory-uow";
// import { MemoryUserDatastore } from "./infrastructure/user.memory-datastore";
// role
import { Role, RoleProps } from "../../../app/domain/contexts/community/role/role";
import { MemoryRoleRepository } from "./infrastructure/role/role.memory-repository";
import { buildMemoryRoleUnitOfWork } from "./infrastructure/role/role.memory-uow";
// import { MemoryRoleDatastore } from "./infrastructure/role.memory-datastore";

// member
import { Member, MemberProps } from "../../../app/domain/contexts/community/member/member";
import { MemoryMemberRepository } from "./infrastructure/member/member.memory-repository";
import { buildMemoryMemberUnitOfWork } from "./infrastructure/member/member.memory-uow";
// import { MemoryMemberDatastore } from "./infrastructure/member.memory-datastore";

// property
import { Property, PropertyProps } from "../../../app/domain/contexts/property/property";
import { MemoryPropertyRepository } from "./infrastructure/property/property.memory-repository";
import { buildMemoryPropertyUnitOfWork } from "./infrastructure/property/property.memory-uow";
// import { MemoryPropertyDatastore } from "./infrastructure/property.memory-datastore";

// service
import { Service, ServiceProps } from "../../../app/domain/contexts/community/service/service";
import { MemoryServiceRepository } from "./infrastructure/service/service.memory-repository";
import { buildMemoryServiceUnitOfWork } from "./infrastructure/service/service.memory-uow";
// import { MemoryServiceDatastore } from "./infrastructure/service.memory-datastore";

// service-ticket
import { ServiceTicketV1, ServiceTicketV1Props } from "../../../app/domain/contexts/cases/service-ticket/v1/service-ticket";
import { MemoryServiceTicketV1Repository } from "./infrastructure/service-ticket/v1/service-ticket.memory-repository";
import { buildMemoryServiceTicketV1UnitOfWork } from "./infrastructure/service-ticket/v1/service-ticket.memory-uow";
import { ViolationTicketV1, ViolationTicketV1Props } from "../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket";
import { MemoryViolationTicketV1Repository } from './infrastructure/violation-ticket/v1/violation-ticket.memory-repository';
import { buildMemoryViolationTicketV1UnitOfWork } from './infrastructure/violation-ticket/v1/violation-ticket.memory-uow';
// import { MemoryServiceTicketDatastore } from "./infrastructure/service-ticket.memory-datastore";

// import { MemberDataStructure } from "../data-structures/member";
// import { CommunityDataStructure } from "../data-structures/community";
// import { UserDataStructure } from "../data-structures/user";
// import { RoleDataStructure } from "../data-structures/role";
// import { PropertyDataStructure } from "../data-structures/property";
// import { ServiceDataStructure } from "../data-structures/service";
// import { ServiceTicketDataStructure } from "../data-structures/service-ticket";

export interface IMemoryDatabase {
  // community
  communityUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  communityReadonlyMemoryStore: ReadOnlyMemoryStore<CommunityProps>;
  // communityDatastore: MemoryCommunityDatastore;
  // user
  userUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  userReadonlyMemoryStore: ReadOnlyMemoryStore<UserProps>;
  // userDatastore: MemoryUserDatastore;
  
  // role
  roleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  roleReadonlyMemoryStore: ReadOnlyMemoryStore<RoleProps>;
  // roleDatastore: MemoryRoleDatastore;
  // member
  memberUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  memberReadonlyMemoryStore: ReadOnlyMemoryStore<MemberProps>;
  // memberDatastore: MemoryMemberDatastore;
  // property
  propertyUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  propertyReadonlyMemoryStore: ReadOnlyMemoryStore<PropertyProps>;
  // propertyDatastore: MemoryPropertyDatastore;
  // service
  serviceUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
  serviceReadonlyMemoryStore: ReadOnlyMemoryStore<ServiceProps>;
  // serviceDatastore: MemoryServiceDatastore;
  // service-ticket
  serviceTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>>;
  serviceTicketV1ReadonlyMemoryStore: ReadOnlyMemoryStore<ServiceTicketV1Props>;
  // serviceTicketDatastore: MemoryServiceTicketDatastore;
  violationTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ViolationTicketV1<ViolationTicketV1Props>,MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>>;
  violationTicketV1ReadonlyMemoryStore: ReadOnlyMemoryStore<ViolationTicketV1Props>;
}


export class MemoryDatabase implements IMemoryDatabase{
  constructor() {}

  // community
  private _communityUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  private _communityMemoryStore: MemoryStore<CommunityProps>;
  // private _communityMemoryDatastore : MemoryCommunityDatastore;
  private get communityMemoryStore(): MemoryStore<CommunityProps> {
    if(!this._communityMemoryStore) {
      this._communityMemoryStore = new MemoryStore<CommunityProps>();
    }
    return this._communityMemoryStore;
  }
  // private buildCommunityMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<CommunityProps>): MemoryCommunityDatastore {
  //   return new MemoryCommunityDatastore(readonlyMemoryStore);
  // }
  public get communityUnitOfWork():  MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>{
    if(!this._communityUnitOfWork) {
      // this._communityMemoryStore = new MemoryStore<CommunityProps>();
      this._communityUnitOfWork = buildMemoryCommunityUnitOfWork(this.communityMemoryStore);
    }
    return this._communityUnitOfWork;
  }
  public get communityReadonlyMemoryStore(): ReadOnlyMemoryStore<CommunityProps> {
    return this._communityMemoryStore;
  }
  // public get communityDatastore(): MemoryCommunityDatastore {
  //   if(!this._communityMemoryDatastore) {
  //     this._communityMemoryDatastore = this.buildCommunityMemoryDatastore(this.communityReadonlyMemoryStore);
  //   }
  //   return this._communityMemoryDatastore;
  // }

  // user
  private _userUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  private _userMemoryStore: MemoryStore<UserProps>;
  // private _userMemoryDatastore: MemoryUserDatastore;
  private get userMemoryStore(): MemoryStore<UserProps> {
    if(!this._userMemoryStore) {
      this._userMemoryStore = new MemoryStore<UserProps>();
    }
    return this._userMemoryStore;
  }
  // private buildUserMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<UserProps>): MemoryUserDatastore {
  //   return new MemoryUserDatastore(readonlyMemoryStore);
  // }
  public get userUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>> {
    if(!this._userUnitOfWork) {
      // this._userMemoryStore = new MemoryStore<UserProps>();
      this._userUnitOfWork = buildMemoryUserUnitOfWork(this.userMemoryStore);
    }
    return this._userUnitOfWork;
  }
  public get userReadonlyMemoryStore(): ReadOnlyMemoryStore<UserProps> {
    return this._userMemoryStore;
  }
  // public get userDatastore(): MemoryUserDatastore {
  //   if(!this._userMemoryDatastore) {
  //     this._userMemoryDatastore = this.buildUserMemoryDatastore(this.userReadonlyMemoryStore);
  //   }
  //   return this._userMemoryDatastore;
  // }
  
  // role
  private _roleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  private _roleMemoryStore: MemoryStore<RoleProps>;
  // private _roleMemoryDatastore: MemoryRoleDatastore;
  private get roleMemoryStore(): MemoryStore<RoleProps> {
    if(!this._roleMemoryStore) {
      this._roleMemoryStore = new MemoryStore<RoleProps>();
    }
    return this._roleMemoryStore;
  }
  // private buildRoleMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<RoleProps>): MemoryRoleDatastore {
  //   return new MemoryRoleDatastore(readonlyMemoryStore);
  // }
  public get roleUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>> {
    if(!this._roleUnitOfWork) {
      // this._roleMemoryStore = new MemoryStore<RoleProps>();
      this._roleUnitOfWork = buildMemoryRoleUnitOfWork(this.roleMemoryStore);
    }
    return this._roleUnitOfWork;
  }
  public get roleReadonlyMemoryStore(): ReadOnlyMemoryStore<RoleProps> {
    return this._roleMemoryStore;
  }
  // public get roleDatastore(): MemoryRoleDatastore {
  //   if(!this._roleMemoryDatastore) {
  //     this._roleMemoryDatastore = this.buildRoleMemoryDatastore(this.roleReadonlyMemoryStore);
  //   }
  //   return this._roleMemoryDatastore;
  // }

  // member
  private _memberUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  private _memberMemoryStore: MemoryStore<MemberProps>;
  // private _memberMemoryDatastore: MemoryMemberDatastore;
  private get memberMemoryStore(): MemoryStore<MemberProps> {
    if(!this._memberMemoryStore) {
      this._memberMemoryStore = new MemoryStore<MemberProps>();
    }
    return this._memberMemoryStore;
  }
  // private buildMemberMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<MemberProps>): MemoryMemberDatastore {
  //   return new MemoryMemberDatastore(JSON.parse(JSON.stringify(readonlyMemoryStore))); // [MG-TBD] - fix this temp workaround
  // }
  public get memberUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>> {
    if(!this._memberUnitOfWork) {
      // this._memberMemoryStore = new MemoryStore<MemberProps>();
      this._memberUnitOfWork = buildMemoryMemberUnitOfWork(this.memberMemoryStore);
    }
    return this._memberUnitOfWork;
  }
  public get memberReadonlyMemoryStore(): ReadOnlyMemoryStore<MemberProps> {
    return this._memberMemoryStore;
  }
  // public get memberDatastore(): MemoryMemberDatastore {
  //   if(!this._memberMemoryDatastore) {
  //     this._memberMemoryDatastore = this.buildMemberMemoryDatastore(this.memberReadonlyMemoryStore);
  //   }
  //   return this._memberMemoryDatastore;
  // }

  // property
  private _propertyUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  private _propertyMemoryStore: MemoryStore<PropertyProps>;
  // private _propertyMemoryDatastore: MemoryPropertyDatastore;
  private get propertyMemoryStore(): MemoryStore<PropertyProps> {
    if(!this._propertyMemoryStore) {
      this._propertyMemoryStore = new MemoryStore<PropertyProps>();
    }
    return this._propertyMemoryStore;
  }
  // private buildPropertyMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<PropertyProps>): MemoryPropertyDatastore {
  //   return new MemoryPropertyDatastore(JSON.parse(JSON.stringify(readonlyMemoryStore))); // [MG-TBD] - fix this temp workaround
  // }
  public get propertyUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>> {
    if(!this._propertyUnitOfWork) {
      // this._propertyMemoryStore = new MemoryStore<PropertyProps>();
      this._propertyUnitOfWork = buildMemoryPropertyUnitOfWork(this.propertyMemoryStore);
    }
    return this._propertyUnitOfWork;
  }
  public get propertyReadonlyMemoryStore(): ReadOnlyMemoryStore<PropertyProps> {
    return this._propertyMemoryStore;
  }
  // public get propertyDatastore(): MemoryPropertyDatastore {
  //   if(!this._propertyMemoryDatastore) {
  //     this._propertyMemoryDatastore = this.buildPropertyMemoryDatastore(this.propertyReadonlyMemoryStore);
  //   }
  //   return this._propertyMemoryDatastore;
  // }

  // service
  private _serviceUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
  private _serviceMemoryStore: MemoryStore<ServiceProps>;
  // private _serviceMemoryDatastore: MemoryServiceDatastore;
  private get serviceMemoryStore(): MemoryStore<ServiceProps> {
    if(!this._serviceMemoryStore) {
      this._serviceMemoryStore = new MemoryStore<ServiceProps>();
    }
    return this._serviceMemoryStore;
  }
  // private buildServiceMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<ServiceProps>): MemoryServiceDatastore {
  //   return new MemoryServiceDatastore(readonlyMemoryStore);
  // }
  public get serviceUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>> {
    if(!this._serviceUnitOfWork) {
      // this._serviceMemoryStore = new MemoryStore<ServiceProps>();
      this._serviceUnitOfWork = buildMemoryServiceUnitOfWork(this.serviceMemoryStore);
    }
    return this._serviceUnitOfWork;
  }
  public get serviceReadonlyMemoryStore(): ReadOnlyMemoryStore<ServiceProps> {
    return this._serviceMemoryStore;
  }
  // public get serviceDatastore(): MemoryServiceDatastore {
  //   if(!this._serviceMemoryDatastore) {
  //     this._serviceMemoryDatastore = this.buildServiceMemoryDatastore(this.serviceReadonlyMemoryStore);
  //   }
  //   return this._serviceMemoryDatastore;
  // }

  // service-ticket
  private _serviceTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>>;
  private _serviceTicketV1MemoryStore: MemoryStore<ServiceTicketV1Props>;
  // private _serviceTicketMemoryDatastore: MemoryServiceTicketDatastore;
  private get serviceTicketV1MemoryStore(): MemoryStore<ServiceTicketV1Props> {
    if(!this._serviceTicketV1MemoryStore) {
      this._serviceTicketV1MemoryStore = new MemoryStore<ServiceTicketV1Props>();
    }
    return this._serviceTicketV1MemoryStore;
  }
  // private buildServiceTicketMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<ServiceTicketProps>): MemoryServiceTicketDatastore {
  //   return new MemoryServiceTicketDatastore(JSON.parse(JSON.stringify(readonlyMemoryStore))); // [MG-TBD] - fix this temp workaround
  // }
  public get serviceTicketV1UnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>> {
    if(!this._serviceTicketV1UnitOfWork) {
      // this._serviceTicketMemoryStore = new MemoryStore<ServiceTicketProps>();
      this._serviceTicketV1UnitOfWork = buildMemoryServiceTicketV1UnitOfWork(this.serviceTicketV1MemoryStore);
    }
    return this._serviceTicketV1UnitOfWork;
  }
  public get serviceTicketV1ReadonlyMemoryStore(): ReadOnlyMemoryStore<ServiceTicketV1Props> {
    return this._serviceTicketV1MemoryStore;
  }

  // violation-ticket
  private _violationTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ViolationTicketV1<ViolationTicketV1Props>, MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>>;
  private _violationTicketV1MemoryStore: MemoryStore<ViolationTicketV1Props>;
  // private _serviceTicketMemoryDatastore: MemoryServiceTicketDatastore;
  private get violationTicketV1MemoryStore(): MemoryStore<ViolationTicketV1Props> {
    if(!this._violationTicketV1MemoryStore) {
      this._violationTicketV1MemoryStore = new MemoryStore<ViolationTicketV1Props>();
    }
    return this.violationTicketV1MemoryStore;
  }
  // private buildServiceTicketMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<ServiceTicketProps>): MemoryServiceTicketDatastore {
  //   return new MemoryServiceTicketDatastore(JSON.parse(JSON.stringify(readonlyMemoryStore))); // [MG-TBD] - fix this temp workaround
  // }
  public get violationTicketV1UnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, EntityProps, ViolationTicketV1<ViolationTicketV1Props>, MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>> {
    if(!this._violationTicketV1UnitOfWork) {
      this._violationTicketV1UnitOfWork = buildMemoryViolationTicketV1UnitOfWork(this.violationTicketV1MemoryStore);
    }
    return this._violationTicketV1UnitOfWork;
  }
  public get violationTicketV1ReadonlyMemoryStore(): ReadOnlyMemoryStore<ViolationTicketV1Props> {
    return this._violationTicketV1MemoryStore;
  }
  // public get serviceTicketDatastore(): MemoryServiceTicketDatastore {
  //   if(!this._serviceTicketMemoryDatastore) {
  //     this._serviceTicketMemoryDatastore = this.buildServiceTicketMemoryDatastore(this.serviceTicketReadonlyMemoryStore);
  //   }
  //   return this._serviceTicketMemoryDatastore;
  // }
}

