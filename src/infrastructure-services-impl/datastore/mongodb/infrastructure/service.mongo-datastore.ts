import { Service, ServiceModel } from '../models/service';
import { ServiceDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMongoDatastore } from './_base.mongo-datastore';

export class MongoServiceDatastore 
  extends BaseMongoDatastore<Service>
  implements ServiceDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: ServiceModel})
  }

}