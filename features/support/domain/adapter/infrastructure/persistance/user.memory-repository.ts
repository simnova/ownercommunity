import { DomainExecutionContext } from "../../../../../../domain/contexts/context";
import { UserProps, User } from "../../../../../../domain/contexts/user/user";
import { UserRepository } from "../../../../../../domain/contexts/user/user.repository";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";

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
    return User.getNewUser({} as PropType, externalId, firstName, lastName);
  }

  async delete(id: string): Promise<void> {
    this.memoryStore.delete(id);
  }
}