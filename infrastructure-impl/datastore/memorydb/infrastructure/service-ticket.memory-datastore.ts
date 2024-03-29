import { ServiceTicketDatastoreInfrastructureService } from '../../../../infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { ServiceTicketDataStructure } from '../../data-structures/service-ticket';
import { Fields } from '../../../../infrastructure-services/datastore/_base';

type PropType = ServiceTicketDataStructure;

export class MemoryServiceTicketDatastore 
  extends BaseMemoryDatastore<PropType>
  implements ServiceTicketDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }

  async findByFieldsWithPopulatedValues(fields: Fields): Promise<PropType[]>{
    return this.findByFields(fields); // [MG-TBD]: implement this
  }

}