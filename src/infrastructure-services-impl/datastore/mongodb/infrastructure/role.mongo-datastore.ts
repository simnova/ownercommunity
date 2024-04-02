import { Role, RoleModel } from '../models/role';
import { RoleDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMongoDatastore } from './_base.mongo-datastore';

export class MongoRoleDatastore 
  extends BaseMongoDatastore<Role>
  implements RoleDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: RoleModel})
  }

}