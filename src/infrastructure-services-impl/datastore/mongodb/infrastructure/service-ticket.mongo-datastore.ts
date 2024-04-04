import { ServiceTicket, ServiceTicketModel } from '../models/service-ticket';
import { ServiceTicketDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { ServiceTicketDataStructure } from '../../data-structures/service-ticket';
import { BaseMongoDatastore } from './_base.mongo-datastore';

export class MongoServiceTicketDatastore 
  extends BaseMongoDatastore<ServiceTicket>
  implements ServiceTicketDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: ServiceTicketModel})
  }

  findByFieldsWithPopulatedValues(fields: any): Promise<ServiceTicketDataStructure[]> {
    return this.model.find(fields).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
  }
}
