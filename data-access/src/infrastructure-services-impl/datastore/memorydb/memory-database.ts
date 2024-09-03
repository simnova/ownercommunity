// core
import { DomainEntityProps } from "../../../../framework/seedwork/domain-seedwork/domain-entity";
import { BaseDomainExecutionContext } from "../../../../framework/seedwork/domain-seedwork/base-domain-execution-context";
import { MemoryUnitOfWork } from "../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStore, ReadOnlyMemoryStore } from "../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
// community
import { Community, CommunityProps } from "../../../components/domain/contexts/community/community/community";
import { MemoryCommunityRepository } from "./infrastructure/community/community.memory-repository";
import { buildMemoryCommunityUnitOfWork } from "./infrastructure/community/community.memory-uow"
// import { MemoryCommunityDatastore } from "./infrastructure/community.memory-datastore";
// staff user
import { StaffUser, StaffUserProps } from "../../../components/domain/contexts/users/staff-user/staff-user";
import { MemoryStaffUserRepository } from "./infrastructure/users/staff-user/staff-user.memory-repository";
import { buildMemoryStaffUserUnitOfWork } from "./infrastructure/users/staff-user/staff-user.memory-uow";
// end user
import { EndUser, EndUserProps } from "../../../components/domain/contexts/users/end-user/end-user";
import { MemoryEndUserRepository } from "./infrastructure/users/end-user/end-user.memory-repository";
import { buildMemoryEndUserUnitOfWork } from "./infrastructure/users/end-user/end-user.memory-uow";
// import { MemoryUserDatastore } from "./infrastructure/user.memory-datastore";
// end user role
import { EndUserRole, EndUserRoleProps } from "../../../components/domain/contexts/community/roles/end-user-role/end-user-role";
import { MemoryEndUserRoleRepository } from "./infrastructure/roles/end-user-role/end-user-role.memory-repository";
import { buildMemoryEndUserRoleUnitOfWork } from "./infrastructure/roles/end-user-role/end-user-role.memory-uow";

// staff role
import { StaffRole, StaffRoleProps } from "../../../components/domain/contexts/community/roles/staff-role/staff-role";
import { MemoryStaffRoleRepository } from "./infrastructure/roles/staff-role/staff-role.memory-repository";
import { buildMemoryStaffRoleUnitOfWork } from "./infrastructure/roles/staff-role/staff-role.memory-uow";
// import { MemoryRoleDatastore } from "./infrastructure/role.memory-datastore";

// member
import { Member, MemberProps } from "../../../components/domain/contexts/community/member/member";
import { MemoryMemberRepository } from "./infrastructure/member/member.memory-repository";
import { buildMemoryMemberUnitOfWork } from "./infrastructure/member/member.memory-uow";
// import { MemoryMemberDatastore } from "./infrastructure/member.memory-datastore";

// property
import { Property, PropertyProps } from "../../../components/domain/contexts/property/property/property";
import { MemoryPropertyRepository } from "./infrastructure/property/property.memory-repository";
import { buildMemoryPropertyUnitOfWork } from "./infrastructure/property/property.memory-uow";
// import { MemoryPropertyDatastore } from "./infrastructure/property.memory-datastore";

// service
import { Service, ServiceProps } from "../../../components/domain/contexts/community/service/service";
import { MemoryServiceRepository } from "./infrastructure/service/service.memory-repository";
import { buildMemoryServiceUnitOfWork } from "./infrastructure/service/service.memory-uow";
// import { MemoryServiceDatastore } from "./infrastructure/service.memory-datastore";

// service-ticket
import { ServiceTicketV1, ServiceTicketV1Props } from "../../../components/domain/contexts/cases/service-ticket/v1/service-ticket";
import { MemoryServiceTicketV1Repository } from "./infrastructure/cases/service-ticket/v1/service-ticket.memory-repository";
import { buildMemoryServiceTicketV1UnitOfWork } from "./infrastructure/cases/service-ticket/v1/service-ticket.memory-uow";
import { ViolationTicketV1, ViolationTicketV1Props } from "../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket";
import { MemoryViolationTicketV1Repository } from './infrastructure/cases/violation-ticket/v1/violation-ticket.memory-repository';
import { buildMemoryViolationTicketV1UnitOfWork } from './infrastructure/cases/violation-ticket/v1/violation-ticket.memory-uow';
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
  communityUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  communityReadonlyMemoryStore: ReadOnlyMemoryStore<CommunityProps>;
  // communityDatastore: MemoryCommunityDatastore;
  // user
  endUserUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUser<EndUserProps>, MemoryEndUserRepository<EndUserProps, EndUser<EndUserProps>>>;
  endUserReadonlyMemoryStore: ReadOnlyMemoryStore<EndUserProps>;

  staffUserUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffUser<StaffUserProps>, MemoryStaffUserRepository<StaffUserProps, StaffUser<StaffUserProps>>>;
  staffUserReadonlyMemoryStore: ReadOnlyMemoryStore<StaffUserProps>;
  // userDatastore: MemoryUserDatastore;
  
  // end user role
  endUserRoleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUserRole<EndUserRoleProps>, MemoryEndUserRoleRepository<EndUserRoleProps, EndUserRole<EndUserRoleProps>>>;
  endUserRoleReadonlyMemoryStore: ReadOnlyMemoryStore<EndUserRoleProps>;

  // staff role
  staffRoleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffRole<StaffRoleProps>, MemoryStaffRoleRepository<StaffRoleProps, StaffRole<StaffRoleProps>>>;
  staffRoleReadonlyMemoryStore: ReadOnlyMemoryStore<StaffRoleProps>;
  // roleDatastore: MemoryRoleDatastore;
  // member
  memberUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
  memberReadonlyMemoryStore: ReadOnlyMemoryStore<MemberProps>;
  // memberDatastore: MemoryMemberDatastore;
  // property
  propertyUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
  propertyReadonlyMemoryStore: ReadOnlyMemoryStore<PropertyProps>;
  // propertyDatastore: MemoryPropertyDatastore;
  // service
  serviceUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
  serviceReadonlyMemoryStore: ReadOnlyMemoryStore<ServiceProps>;
  // serviceDatastore: MemoryServiceDatastore;
  // service-ticket
  serviceTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>>;
  serviceTicketV1ReadonlyMemoryStore: ReadOnlyMemoryStore<ServiceTicketV1Props>;
  // serviceTicketDatastore: MemoryServiceTicketDatastore;
  violationTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ViolationTicketV1<ViolationTicketV1Props>,MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>>;
  violationTicketV1ReadonlyMemoryStore: ReadOnlyMemoryStore<ViolationTicketV1Props>;
}


export class MemoryDatabase implements IMemoryDatabase{
  constructor() {}

  // community
  private _communityUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
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
  public get communityUnitOfWork():  MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>{
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
  private _staffUserUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffUser<StaffUserProps>, MemoryStaffUserRepository<StaffUserProps, StaffUser<StaffUserProps>>>;
  private _staffUserMemoryStore: MemoryStore<StaffUserProps>;
  // private _userMemoryDatastore: MemoryUserDatastore;
  private get staffUserMemoryStore(): MemoryStore<StaffUserProps> {
    if(!this._staffUserMemoryStore) {
      this._staffUserMemoryStore = new MemoryStore<StaffUserProps>();
    }
    return this._staffUserMemoryStore;
  }
  // private buildUserMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<UserProps>): MemoryUserDatastore {
  //   return new MemoryUserDatastore(readonlyMemoryStore);
  // }
  public get staffUserUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffUser<StaffUserProps>, MemoryStaffUserRepository<StaffUserProps, StaffUser<StaffUserProps>>> {
    if(!this._staffUserUnitOfWork) {
      // this._userMemoryStore = new MemoryStore<UserProps>();
      this._staffUserUnitOfWork = buildMemoryStaffUserUnitOfWork(this.staffUserMemoryStore);
    }
    return this._staffUserUnitOfWork;
  }
  public get staffUserReadonlyMemoryStore(): ReadOnlyMemoryStore<StaffUserProps> {
    return this._staffUserMemoryStore;
  }

    // user
    private _endUserUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUser<EndUserProps>, MemoryEndUserRepository<EndUserProps, EndUser<EndUserProps>>>;
    private _endUserMemoryStore: MemoryStore<EndUserProps>;
    // private _userMemoryDatastore: MemoryUserDatastore;
    private get endUserMemoryStore(): MemoryStore<EndUserProps> {
      if(!this._endUserMemoryStore) {
        this._endUserMemoryStore = new MemoryStore<EndUserProps>();
      }
      return this._endUserMemoryStore;
    }
    // private buildUserMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<UserProps>): MemoryUserDatastore {
    //   return new MemoryUserDatastore(readonlyMemoryStore);
    // }
    public get endUserUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUser<EndUserProps>, MemoryEndUserRepository<EndUserProps, EndUser<EndUserProps>>> {
      if(!this._endUserUnitOfWork) {
        // this._userMemoryStore = new MemoryStore<UserProps>();
        this._endUserUnitOfWork = buildMemoryEndUserUnitOfWork(this.endUserMemoryStore);
      }
      return this._endUserUnitOfWork;
    }
    public get endUserReadonlyMemoryStore(): ReadOnlyMemoryStore<EndUserProps> {
      return this._endUserMemoryStore;
    }
  // public get userDatastore(): MemoryUserDatastore {
  //   if(!this._userMemoryDatastore) {
  //     this._userMemoryDatastore = this.buildUserMemoryDatastore(this.userReadonlyMemoryStore);
  //   }
  //   return this._userMemoryDatastore;
  // }
  
  // end user role
  private _endUserRoleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUserRole<EndUserRoleProps>, MemoryEndUserRoleRepository<EndUserRoleProps, EndUserRole<EndUserRoleProps>>>;
  private _endUserRoleMemoryStore: MemoryStore<EndUserRoleProps>;
  // private _roleMemoryDatastore: MemoryRoleDatastore;
  private get endUserRoleMemoryStore(): MemoryStore<EndUserRoleProps> {
    if(!this._endUserRoleMemoryStore) {
      this._endUserRoleMemoryStore = new MemoryStore<EndUserRoleProps>();
    }
    return this._endUserRoleMemoryStore;
  }
  // private buildRoleMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<RoleProps>): MemoryRoleDatastore {
  //   return new MemoryRoleDatastore(readonlyMemoryStore);
  // }
  public get endUserRoleUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, EndUserRole<EndUserRoleProps>, MemoryEndUserRoleRepository<EndUserRoleProps, EndUserRole<EndUserRoleProps>>> {
    if(!this._endUserRoleUnitOfWork) {
      // this._roleMemoryStore = new MemoryStore<RoleProps>();
      this._endUserRoleUnitOfWork = buildMemoryEndUserRoleUnitOfWork(this.endUserRoleMemoryStore);
    }
    return this._endUserRoleUnitOfWork;
  }
  public get endUserRoleReadonlyMemoryStore(): ReadOnlyMemoryStore<EndUserRoleProps> {
    return this._endUserRoleMemoryStore;
  }

    // staff role
    private _staffRoleUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffRole<StaffRoleProps>, MemoryStaffRoleRepository<StaffRoleProps, StaffRole<StaffRoleProps>>>;
    private _staffRoleMemoryStore: MemoryStore<StaffRoleProps>;
    // private _roleMemoryDatastore: MemoryRoleDatastore;
    private get staffRoleMemoryStore(): MemoryStore<StaffRoleProps> {
      if(!this._staffRoleMemoryStore) {
        this._staffRoleMemoryStore = new MemoryStore<StaffRoleProps>();
      }
      return this._staffRoleMemoryStore;
    }
    // private buildRoleMemoryDatastore(readonlyMemoryStore: ReadOnlyMemoryStore<RoleProps>): MemoryRoleDatastore {
    //   return new MemoryRoleDatastore(readonlyMemoryStore);
    // }
    public get staffRoleUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, StaffRole<StaffRoleProps>, MemoryStaffRoleRepository<StaffRoleProps, StaffRole<StaffRoleProps>>> {
      if(!this._staffRoleUnitOfWork) {
        // this._roleMemoryStore = new MemoryStore<RoleProps>();
        this._staffRoleUnitOfWork = buildMemoryStaffRoleUnitOfWork(this.staffRoleMemoryStore);
      }
      return this._staffRoleUnitOfWork;
    }
    public get staffRoleReadonlyMemoryStore(): ReadOnlyMemoryStore<StaffRoleProps> {
      return this._staffRoleMemoryStore;
    }
  // public get roleDatastore(): MemoryRoleDatastore {
  //   if(!this._roleMemoryDatastore) {
  //     this._roleMemoryDatastore = this.buildRoleMemoryDatastore(this.roleReadonlyMemoryStore);
  //   }
  //   return this._roleMemoryDatastore;
  // }

  // member
  private _memberUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>>;
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
  public get memberUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Member<MemberProps>, MemoryMemberRepository<MemberProps, Member<MemberProps>>> {
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
  private _propertyUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>>;
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
  public get propertyUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Property<PropertyProps>, MemoryPropertyRepository<PropertyProps, Property<PropertyProps>>> {
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
  private _serviceUnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>>;
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
  public get serviceUnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, Service<ServiceProps>, MemoryServiceRepository<ServiceProps, Service<ServiceProps>>> {
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
  private _serviceTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>>;
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
  public get serviceTicketV1UnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ServiceTicketV1<ServiceTicketV1Props>, MemoryServiceTicketV1Repository<ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>>> {
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
  private _violationTicketV1UnitOfWork: MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ViolationTicketV1<ViolationTicketV1Props>, MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>>;
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
  public get violationTicketV1UnitOfWork(): MemoryUnitOfWork<BaseDomainExecutionContext, DomainEntityProps, ViolationTicketV1<ViolationTicketV1Props>, MemoryViolationTicketV1Repository<ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>>> {
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

