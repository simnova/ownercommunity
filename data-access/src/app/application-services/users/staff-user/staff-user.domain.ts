import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { StaffUser } from "../../../domain/contexts/users/staff-user/staff-user";
import { StaffUserVisa } from "../../../domain/contexts/users/staff-user/staff-user.visa";
import { StaffUserData } from "../../../external-dependencies/datastore";
import { StaffUserDomainAdapter, StaffUserConverter, StaffUserRepository } from "../../../external-dependencies/domain";
import { StaffUserUpdateInput } from "../../../external-dependencies/graphql-api";
import { AppContext, OpenIdConfigKeyEnum } from "../../../init/app-context-builder";

export interface StaffUserDomainApi {
  addUser() : Promise<StaffUserData>;
  updateUser(user: StaffUserUpdateInput) : Promise<StaffUserData>; 
}
type PropType = StaffUserDomainAdapter;
type DomainType = StaffUser<PropType>;
type RepoType = StaffUserRepository<PropType>;

export class StaffUserDomainApiImpl
  extends DomainDataSource<AppContext, StaffUserData, PropType, StaffUserVisa, DomainType, RepoType>
  implements StaffUserDomainApi {

  async updateUser(user: StaffUserUpdateInput): Promise<StaffUserData> {
    if (!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result: StaffUserData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if (!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      if (user?.firstName !== undefined) domainObject.FirstName=(user.firstName);
      if (user?.lastName !== undefined) domainObject.LastName=(user.lastName);
      if (user?.email !== undefined) domainObject.Email=(user.email);
      result = (new StaffUserConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }


  async addUser(): Promise<StaffUserData> {
    console.log(`addUser`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== OpenIdConfigKeyEnum.STAFF_PORTAL) {
      throw new Error('Unauthorized 99');
    }

    let userExternalId = this.context.verifiedUser.verifiedJWT?.oid;
    let userFirstName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT?.unique_name;

    let userToReturn: StaffUserData;
    await this.withTransaction(async (repo) => {
      let userConverter = new StaffUserConverter();
      let userExists = await repo.getByExternalId(userExternalId);
      if (userExists) {
        userToReturn = userConverter.toPersistence(userExists);
      } else {
        let newUser = await repo.getNewInstance(
          userExternalId,
          userFirstName,
          userLastName,
          userEmail);
        userToReturn = userConverter.toPersistence(await repo.save(newUser));
      }
    });
    return userToReturn;
  }

}
