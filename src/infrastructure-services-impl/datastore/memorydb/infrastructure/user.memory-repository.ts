import { DomainExecutionContext } from "../../../../app/domain/contexts/domain-execution-context";
import { UserProps, User } from "../../../../app/domain/contexts/user/user";
import { UserRepository } from "../../../../app/domain/contexts/user/user.repository";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";

export class MemoryUser extends MemoryBaseAdapter implements UserProps{
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}
export class MemoryUserRepository<
  PropType extends UserProps, 
  DomainType extends User<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements UserRepository<PropType> 
  {

  async getByExternalId(externalId: string): Promise<User<PropType>> {
    const user = this.memoryStore.getAll().find((user) => user.externalId === externalId);
    if (user) {
      return Promise.resolve(new this.domainClass(user, this.context));
    } else {
      return Promise.reject(new Error("User not found."));
    }
  }

  async getNewInstance(externalId: string, firstName: string, lastName: string): Promise<User<PropType>> {
    return User.getNewUser(new MemoryUser as unknown as PropType, externalId, firstName, lastName);
  }

  async delete(id: string): Promise<void> {
    this.memoryStore.delete(id);
  }
}