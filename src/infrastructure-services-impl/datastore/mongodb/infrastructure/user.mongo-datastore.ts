import { User, UserModel } from '../models/user';
import { UserDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { UserDataStructure } from '../../data-structures/user';
import { BaseMongoDatastore } from './_base.mongo-datastore';

export class MongoUserDatastore 
  extends BaseMongoDatastore<User>
  implements UserDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: UserModel})
  }

  async getAll(): Promise<UserDataStructure[]> {
    return this.model.find().exec();
  }
}