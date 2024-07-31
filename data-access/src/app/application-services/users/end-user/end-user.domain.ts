import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { EndUser } from "../../../domain/contexts/users/end-user/end-user";
import { EndUserData } from "../../../external-dependencies/datastore";
import { EndUserDomainAdapter, EndUserConverter, EndUserRepository } from "../../../external-dependencies/domain";
import { UserUpdateInput } from "../../../external-dependencies/graphql-api";
import { AppContext } from "../../../init/app-context-builder";

export interface EndUserDomainApi {
  addUser() : Promise<EndUserData>;
  updateUser(user: UserUpdateInput) : Promise<EndUserData>; 
}
type PropType = EndUserDomainAdapter;
type DomainType = EndUser<PropType>;
type RepoType = EndUserRepository<PropType>;

export class EndUserDomainApiImpl
  extends DomainDataSource<AppContext, EndUserData, PropType, DomainType, RepoType>
  implements EndUserDomainApi {

  async updateUser(user: UserUpdateInput): Promise<EndUserData> {
    if (!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result: EndUserData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if (!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      if (user.firstName !== undefined) domainObject.personalInformation.identityDetails.restOfName=(user.firstName);
      if (user.lastName !== undefined) domainObject.personalInformation.identityDetails.lastName=(user.lastName);
      if (user.email !== undefined) domainObject.personalInformation.contactInformation.email=(user.email);
      result = (new EndUserConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }


  async addUser(): Promise<EndUserData> {
    console.log(`addUser`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }

    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userRestOfName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

    let userToReturn: EndUserData;
    await this.withTransaction(async (repo) => {
      let userConverter = new EndUserConverter();
      let userExists = await repo.getByExternalId(userExternalId);
      if (userExists) {
        userToReturn = userConverter.toPersistence(userExists);
      } else {
        let newUser = await repo.getNewInstance(
          userExternalId,
          userLastName,
          userRestOfName ? userLastName : undefined);
        if (userEmail) {
          newUser.personalInformation.contactInformation.email=(userEmail);
        }
        userToReturn = userConverter.toPersistence(await repo.save(newUser));
      }
    });
    return userToReturn;
  }

}
