import { User } from '../../app/domain/contexts/user/user';
import { UserUpdateInput } from '../../app/application-services/domain/user.interface';
import { UserProps } from '../../app/domain/contexts/user/user';
import { UserRepository } from '../../app/domain/contexts/user/user.repository';
import { UserDomainApplicationService } from '../../app/application-services/domain/user.interface';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { DomainApplicationServiceImpl } from './_domain.application-service';

type PropType = UserProps;
type Root = User<PropType>;
type RepoType = UserRepository<PropType>;

export class UserDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements UserDomainApplicationService
{

  async updateUser(input: UserUpdateInput) : Promise<Root> {
    if(!this.context.verifiedUser || this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized');
    }

    let userToReturn : Root;
    await this.withTransaction(async (repo) => {
      let user = await repo.get(input.id);
      if(!user || user.externalId !== this.context.verifiedUser.verifiedJWT.sub) {
        throw new Error('Unauthorized');
      }
      user.setFirstName(user.firstName);
      user.setLastName(user.lastName);
      userToReturn =await repo.save(user);
    });
    return userToReturn;
  }
  

  async addUser() : Promise<Root> {
    console.log(`addUser`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized 99');
    }
    
    let userExternalId = this.context.verifiedUser.verifiedJWT.sub;
    let userFirstName = this.context.verifiedUser.verifiedJWT.given_name;
    let userLastName = this.context.verifiedUser.verifiedJWT.family_name;
    let userEmail = this.context.verifiedUser.verifiedJWT.email;

    let userToReturn : Root;
    await this.withTransaction(async (repo) => {
      let existingUser = await repo.getByExternalId(userExternalId);
      if(existingUser) {
        userToReturn = existingUser;
      }else{
        let newUser = await repo.getNewInstance(
          userExternalId,
          userFirstName,
          userLastName);
        if(userEmail) {
          newUser.setEmail(userEmail);
        }
        userToReturn = await repo.save(newUser);
      }
    });
    return userToReturn;
  }
  
}