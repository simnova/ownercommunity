import { UserDataStructure } from '../../application-services/datastore';
import { UserDatastoreApplicationService } from '../../application-services/datastore/user.interface';
import { Context } from '../../startup/context';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';

export class UserDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
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