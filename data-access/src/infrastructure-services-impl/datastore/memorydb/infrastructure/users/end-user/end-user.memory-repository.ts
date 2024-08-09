import { MemoryBaseAdapter } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { EndUser, EndUserProps } from "../../../../../../app/domain/contexts/users/end-user/end-user";
import { EndUserContactInformationProps } from "../../../../../../app/domain/contexts/users/end-user/end-user-contact-information";
import { EndUserIdentityDetailsProps } from "../../../../../../app/domain/contexts/users/end-user/end-user-identity-details";
import { EndUserPersonalInformationProps } from "../../../../../../app/domain/contexts/users/end-user/end-user-personal-information";
import { EndUserRepository } from "../../../../../../app/domain/contexts/users/end-user/end-user.repository";
import { DomainExecutionContext } from "../../../../../../app/domain/domain-execution-context";

class MemoryEndUserContactInformation implements EndUserContactInformationProps {
  id: string;
  email: string;
}

class MemoryEndUserIdentityDetails implements EndUserIdentityDetailsProps {
  id: string;
  lastName: string;
  legalNameConsistsOfOneName: boolean;
  restOfName?: string;
}

class MemoryEndUserPersonalInformation  implements EndUserPersonalInformationProps {
  id: string;
  identityDetails: MemoryEndUserIdentityDetails;
  contactInformation: MemoryEndUserContactInformation;
}

class MemoryEndUser extends MemoryBaseAdapter implements EndUserProps{
  _personalInformation: EndUserPersonalInformationProps;
  get personalInformation() {
    if (!this._personalInformation) {
      this._personalInformation = new MemoryEndUserPersonalInformation();
    }
    return this._personalInformation;
  }

  externalId: string;
  displayName: string;
  accessBlocked: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}
export class MemoryEndUserRepository<
  PropType extends EndUserProps, 
  DomainType extends EndUser<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements EndUserRepository<PropType> 
  {

  async getByExternalId(externalId: string): Promise<EndUser<PropType>> {
    const user = this.memoryStore.getAll().find((user) => user.externalId === externalId);
    if (user) {
      return Promise.resolve(new this.domainClass(user, this.context));
    } else {
      return Promise.reject(new Error("User not found."));
    }
  }

  async getNewInstance(externalId: string, lastName: string, restOfName?: string): Promise<EndUser<PropType>> {
    return EndUser.getNewUser(new MemoryEndUser as unknown as PropType, externalId, lastName, this.context, restOfName);
  }

  async delete(id: string): Promise<void> {
    this.memoryStore.delete(id);
  }
}