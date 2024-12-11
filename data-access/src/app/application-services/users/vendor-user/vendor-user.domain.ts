import { VendorUserConverter, VendorUserDomainAdapter, VendorUserRepository } from '../../../external-dependencies/domain';
import { DomainDataSource } from '../../../data-sources/domain-data-source';
import { VendorUser } from '../../../domain/contexts/users/vendor-user/vendor-user';
import { VendorUserVisa } from '../../../domain/contexts/users/vendor-user/vendor-user.visa';
import { VendorUserData } from '../../../external-dependencies/datastore';
import { VendorUserUpdateInput } from '../../../external-dependencies/graphql-api';
import { AppContext } from '../../../init/app-context-builder';

export interface VendorUserDomainApi {
  addUser(): Promise<VendorUserData>;
  updateUser(user: VendorUserUpdateInput): Promise<VendorUserData>;
}
type PropType = VendorUserDomainAdapter;
type DomainType = VendorUser<PropType>;
type RepoType = VendorUserRepository<PropType>;

export class VendorUserDomainApiImpl extends DomainDataSource<AppContext, VendorUserData, PropType, VendorUserVisa, DomainType, RepoType> implements VendorUserDomainApi {
  async updateUser(user: VendorUserUpdateInput): Promise<VendorUserData> {
    if (!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result: VendorUserData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if (!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      if (user.personalInformation?.identityDetails?.restOfName !== undefined) {
        domainObject.personalInformation.identityDetails.RestOfName = user.personalInformation?.identityDetails?.restOfName;
      }

      if (user.personalInformation?.identityDetails?.lastName !== undefined) {
        domainObject.personalInformation.identityDetails.LastName = user.personalInformation?.identityDetails?.lastName;
      }

      if (user.personalInformation?.identityDetails?.legalNameConsistsOfOneName !== undefined) {
        domainObject.personalInformation.identityDetails.LegalNameConsistsOfOneName = user.personalInformation?.identityDetails?.legalNameConsistsOfOneName;
      }
      if (user.personalInformation?.contactInformation?.email !== undefined) {
        domainObject.personalInformation.contactInformation.Email = user.personalInformation?.contactInformation?.email;
      }

      if (user.displayName != undefined) {
        domainObject.DisplayName = user.displayName;
      }

      if (user.accessBlocked !== undefined) {
        domainObject.AccessBlocked = user.accessBlocked;
      }

      if (user.externalId !== undefined) {
        domainObject.ExternalId = user.externalId;
      }

      result = new VendorUserConverter().toPersistence(await repo.save(domainObject));
    });
    return result;
  }

  async addUser(): Promise<VendorUserData> {
    console.log(`addUser`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }

    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userRestOfName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

    let userToReturn: VendorUserData;
    await this.withTransaction(async (repo) => {
      let userConverter = new VendorUserConverter();
      let userExists = await repo.getByExternalId(userExternalId);
      if (userExists) {
        userToReturn = userConverter.toPersistence(userExists);
      } else {
        let newUser = await repo.getNewInstance(userExternalId, userLastName, userRestOfName);
        if (userEmail) {
          newUser.Email = userEmail;
          newUser.personalInformation.contactInformation.Email = userEmail;
        }
        userToReturn = userConverter.toPersistence(await repo.save(newUser));
      }
    });
    return userToReturn;
  }
}
