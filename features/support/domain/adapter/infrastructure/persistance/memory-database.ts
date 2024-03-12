// core
import { EntityProps } from "../../../../../../domain/shared/entity";
import { ExecutionContext } from "../../../../../../domain/shared/execution-context";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryStore, ReadOnlyMemoryStore } from "../core/memory-store/memory-store";
// community
import { Community, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { MemoryCommunityRepository } from "./community.memory-repository";
import { buildMemoryCommunityUnitOfWork } from "./community.memory-uow"
// user
import { User, UserProps } from "../../../../../../domain/contexts/user/user";
import { MemoryUserRepository } from "./user.memory-repository";
import { buildMemoryUserUnitOfWork } from "./user.memory-uow";


export interface IMemoryDatabase {
  CommunityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  CommunityMemoryStore: ReadOnlyMemoryStore<CommunityProps>;
  UserUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  UserMemoryStore: ReadOnlyMemoryStore<UserProps>;
}


export class MemoryDatabase implements IMemoryDatabase{
  private communityUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, Community<CommunityProps>, MemoryCommunityRepository<CommunityProps, Community<CommunityProps>>>;
  private userUnitOfWork: MemoryUnitOfWork<ExecutionContext, EntityProps, User<UserProps>, MemoryUserRepository<UserProps, User<UserProps>>>;
  private communityMemoryStore: MemoryStore<CommunityProps>;
  private userMemoryStore: MemoryStore<UserProps>;

  constructor() {}

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
}

