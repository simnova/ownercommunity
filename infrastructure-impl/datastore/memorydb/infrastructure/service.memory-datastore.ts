import { ServiceDatastoreInfrastructureService } from '../../../../infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { ServiceDataStructure } from '../../../../application-services/datastore';

type PropType = ServiceDataStructure;

export class MemoryServiceDatastore 
  extends BaseMemoryDatastore<PropType>
  implements ServiceDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }


}