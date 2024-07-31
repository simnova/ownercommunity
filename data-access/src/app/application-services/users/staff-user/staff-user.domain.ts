import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { StaffUser } from "../../../domain/contexts/users/staff-user/staff-user";
import { StaffUserData } from "../../../external-dependencies/datastore";
import { StaffUserDomainAdapter, StaffUserConverter, StaffUserRepository } from "../../../external-dependencies/domain";
import { UserUpdateInput } from "../../../external-dependencies/graphql-api";
import { AppContext } from "../../../init/app-context-builder";

export interface StaffUserDomainApi {
  addUser() : Promise<StaffUserData>;
  updateUser(user: UserUpdateInput) : Promise<StaffUserData>; 
}
type PropType = StaffUserDomainAdapter;
type DomainType = StaffUser<PropType>;
type RepoType = StaffUserRepository<PropType>;

export class StaffUserDomainApiImpl
  extends DomainDataSource<AppContext, StaffUserData, PropType, DomainType, RepoType>
  implements StaffUserDomainApi {

  async updateUser(user: UserUpdateInput): Promise<StaffUserData> {
    if (!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result: StaffUserData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if (!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      if (user?.personalInformation?.identityDetails?.restOfName !== undefined) domainObject.FirstName=(user.personalInformation?.identityDetails?.restOfName);
      if (user?.personalInformation?.identityDetails?.lastName !== undefined) domainObject.LastName=(user.personalInformation?.identityDetails?.lastName);
      if (user?.personalInformation?.contactInformation?.email !== undefined) domainObject.Email=(user.personalInformation?.contactInformation?.email);
      result = (new StaffUserConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }


  async addUser(): Promise<StaffUserData> {
    console.log(`addUser`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }

    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userFirstName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

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
          userLastName);
        if (userEmail) {
          newUser.Email=(userEmail);
        }
        userToReturn = userConverter.toPersistence(await repo.save(newUser));
      }
    });
    return userToReturn;
  }

}
