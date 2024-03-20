// core
import { EntityProps } from "../../../domain-seedwork/entity";
import { ExecutionContext } from "../../../domain-seedwork/execution-context";
import { MemoryUnitOfWork } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStore, ReadOnlyMemoryStore } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
// community
import { Community, CommunityProps } from "../../../domain/contexts/community/community";
import { MemoryCommunityRepository } from "./infrastructure/community.memory-repository";
import { buildMemoryCommunityUnitOfWork } from "./infrastructure/community.memory-uow"
// user
import { User, UserProps } from "../../../domain/contexts/user/user";
import { MemoryUserRepository } from "./infrastructure/user.memory-repository";
import { buildMemoryUserUnitOfWork } from "./infrastructure/user.memory-uow";
// role
import { Role, RoleProps } from "../../../domain/contexts/community/role";
import { MemoryRoleRepository } from "./infrastructure/role.memory-repository";
import { buildMemoryRoleUnitOfWork } from "./infrastructure/role.memory-uow";

// member
import { Member, MemberProps } from "../../../domain/contexts/community/member";
import { MemoryMemberRepository } from "./infrastructure/member.memory-repository";
import { buildMemoryMemberUnitOfWork } from "./infrastructure/member.memory-uow";

// property
import { Property, PropertyProps } from "../../../domain/contexts/property/property";
import { MemoryPropertyRepository } from "./infrastructure/property.memory-repository";
import { buildMemoryPropertyUnitOfWork } from "./infrastructure/property.memory-uow";

export interface IMemoryDatabase {
  CommunityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  CommunityMemoryStore: ReadOnlyMemoryStore<CommunityProps>;
  UserUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  UserMemoryStore: ReadOnlyMemoryStore<UserProps>;
  RoleUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  RoleMemoryStore: ReadOnlyMemoryStore<RoleProps>;
  MemberUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  MemberMemoryStore: ReadOnlyMemoryStore<MemberProps>;
  PropertyUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  PropertyMemoryStore: ReadOnlyMemoryStore<PropertyProps>;
}


export class MemoryDatabase implements IMemoryDatabase{
  constructor() {}

  // community
  private communityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  private communityMemoryStore: MemoryStore<CommunityProps>;
  public get CommunityUnitOfWork():  MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>{
    if(!this.communityUnitOfWork) {
      this.communityMemoryStore = new MemoryStore<CommunityProps>();
      this.communityUnitOfWork = buildMemoryCommunityUnitOfWork(this.communityMemoryStore);
    }
    return this.communityUnitOfWork;
  }
  public get CommunityMemoryStore(): ReadOnlyMemoryStore<CommunityProps> {
    return this.communityMemoryStore;
  }

  // user
  private userUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  private userMemoryStore: MemoryStore<UserProps>;
  public get UserUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>> {
    if(!this.userUnitOfWork) {
      this.userMemoryStore = new MemoryStore<UserProps>();
      this.userUnitOfWork = buildMemoryUserUnitOfWork(this.userMemoryStore);
    }
    return this.userUnitOfWork;
  }
  public get UserMemoryStore(): ReadOnlyMemoryStore<UserProps> {
    return this.userMemoryStore;
  }
  
  // role
  private roleUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>>;
  private roleMemoryStore: MemoryStore<RoleProps>;
  public get RoleUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Role<RoleProps>, MemoryRoleRepository<RoleProps, Role<RoleProps>>> {
    if(!this.roleUnitOfWork) {
      this.roleMemoryStore = new MemoryStore<RoleProps>();
      this.roleUnitOfWork = buildMemoryRoleUnitOfWork(this.roleMemoryStore);
    }
    return this.roleUnitOfWork;
  }
  public get RoleMemoryStore(): ReadOnlyMemoryStore<RoleProps> {
    return this.roleMemoryStore;
  }

  // member
  private memberUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  private memberMemoryStore: MemoryStore<MemberProps>;
  public get MemberUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>> {
    if(!this.memberUnitOfWork) {
      this.memberMemoryStore = new MemoryStore<MemberProps>();
      this.memberUnitOfWork = buildMemoryMemberUnitOfWork(this.memberMemoryStore);
    }
    return this.memberUnitOfWork;
  }
  public get MemberMemoryStore(): ReadOnlyMemoryStore<MemberProps> {
    return this.memberMemoryStore;
  }

  // property
  private propertyUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  private propertyMemoryStore: MemoryStore<PropertyProps>;
  public get PropertyUnitOfWork(): MemoryUnitOfWork<ExecutionContext, EntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>> {
    if(!this.propertyUnitOfWork) {
      this.propertyMemoryStore = new MemoryStore<PropertyProps>();
      this.propertyUnitOfWork = buildMemoryPropertyUnitOfWork(this.propertyMemoryStore);
    }
    return this.propertyUnitOfWork;
  }
  public get PropertyMemoryStore(): ReadOnlyMemoryStore<PropertyProps> {
    return this.propertyMemoryStore;
  }
}

