import { UserDataStructure } from '../../app/application-services/datastore';
import { UserDatastoreApplicationService } from '../../app/application-services/datastore/user.interface';
import { AppContext } from '../../app/app-context';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class UserDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements UserDatastoreApplicationService
{
  
  async getUserById(userId : string): Promise<UserDataStructure> {
    let userToReturn: UserDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = await datastore.userDatastore.findOneById(userId);
    });
    return userToReturn;
  }

  async getByExternalId(externalId : string): Promise<UserDataStructure> {
    let userToReturn: UserDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = (await datastore.userDatastore.findByFields({externalId: externalId}))?.[0];
    });
    return userToReturn;
  }

  async getUsers(): Promise<UserDataStructure[]> {
    let userToReturn: UserDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      userToReturn = await datastore.userDatastore.getAll();
    });
    return userToReturn;
  }
  
}