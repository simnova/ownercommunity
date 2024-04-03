import { UserDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { UserDataStructure } from '../../../../app/application-services/datastore';

type PropType = UserDataStructure;

export class MemoryUserDatastore 
  extends BaseMemoryDatastore<PropType>
  implements UserDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }

  async getAll(): Promise<PropType[]>{
    return this._memoryStore.getAll();
  }

}