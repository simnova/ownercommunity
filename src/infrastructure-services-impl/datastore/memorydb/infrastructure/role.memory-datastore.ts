import { RoleDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { RoleDataStructure } from '../../data-structures/role';

type PropType = RoleDataStructure;

export class MemoryRoleDatastore 
  extends BaseMemoryDatastore<PropType>
  implements RoleDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }
}