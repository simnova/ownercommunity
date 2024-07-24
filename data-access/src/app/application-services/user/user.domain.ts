import { DomainDataSource } from "../../data-sources/domain-data-source";
import { UserData } from "../../external-dependencies/datastore";
import { User } from "../../domain/contexts/user/user";
import { UserDomainAdapter, UserRepository, UserConverter } from "../../external-dependencies/domain";
import { UserUpdateInput } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface UserDomainApi {
  addUser() : Promise<UserData>;
  updateUser(user: UserUpdateInput) : Promise<UserData>; 
}

type PropType = UserDomainAdapter;
type DomainType = User<PropType>;
type RepoType = UserRepository<PropType>;

export class UserDomainApiImpl
  extends DomainDataSource<AppContext,UserData,PropType,DomainType,RepoType> 
  implements UserDomainApi
{

  async updateUser(user: UserUpdateInput) : Promise<UserData> {
    if(!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let result : UserData;
    await this.withTransaction(async (repo) => {
      let domainObject = await repo.get(user.id);
      if(!domainObject || domainObject.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      domainObject.setFirstName(user.firstName);
      domainObject.setLastName(user.lastName);
      result = (new UserConverter()).toPersistence(await repo.save(domainObject));
    });
    return result;
  }
  

  async addUser() : Promise<UserData> {
    console.log(`addUser`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }
    
    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userFirstName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

    let userToReturn : UserData;
    await this.withTransaction(async (repo) => {
      let userConverter = new UserConverter();
      let userExists = await repo.getByExternalId(userExternalId);
      if(userExists) {
        userToReturn = userConverter.toPersistence(userExists);
      }else{
        let newUser = await repo.getNewInstance(
          userExternalId,
          userFirstName,
          userLastName);
        if(userEmail) {
          newUser.setEmail(userEmail);
        }
        userToReturn = userConverter.toPersistence(await repo.save(newUser));
      }
    });
    return userToReturn;
  }
  
}