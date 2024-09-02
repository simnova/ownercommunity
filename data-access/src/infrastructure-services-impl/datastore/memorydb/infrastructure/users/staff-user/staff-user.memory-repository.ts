
import { MemoryBaseAdapter } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { StaffRoleEntityReference, StaffRoleProps } from "../../../../../../app/domain/contexts/community/roles/staff-role/staff-role";
import { StaffUserProps, StaffUser } from "../../../../../../app/domain/contexts/users/staff-user/staff-user";
import { StaffUserRepository } from "../../../../../../app/domain/contexts/users/staff-user/staff-user.repository";
import { DomainExecutionContext } from "../../../../../../../framework/domain/domain-execution-context";

export class MemoryStaffUser extends MemoryBaseAdapter implements StaffUserProps{
  role: StaffRoleProps;
  setRoleRef(role: StaffRoleEntityReference): void {
    this.role = role as StaffRoleProps;
  }
  externalId: string;
  displayName: string;
  accessBlocked: boolean;
  tags?: string[];
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}
export class MemoryStaffUserRepository<
  PropType extends StaffUserProps, 
  DomainType extends StaffUser<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements StaffUserRepository<PropType> 
  {

  async getByExternalId(externalId: string): Promise<StaffUser<PropType>> {
    const user = this.memoryStore.getAll().find((user) => user.externalId === externalId);
    if (user) {
      return Promise.resolve(new this.domainClass(user, this.context));
    } else {
      return Promise.reject(new Error("User not found."));
    }
  }

  async getNewInstance(externalId: string, firstName: string, lastName: string, email: string): Promise<StaffUser<PropType>> {
    return StaffUser.getNewUser(new MemoryStaffUser as unknown as PropType, externalId, firstName, lastName, email, this.context);
  }

  async delete(id: string): Promise<void> {
    this.memoryStore.delete(id);
  }
}