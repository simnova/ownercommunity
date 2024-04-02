import { PropertyDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { MemberDataStructure } from '../../data-structures/member';
import { CommunityDataStructure } from '../../data-structures/community';
import { PropertyDataStructure } from '../../data-structures/property';

type PropType = PropertyDataStructure;

export class MemoryPropertyDatastore 
  extends BaseMemoryDatastore<PropType>
  implements PropertyDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }

  async getAll(): Promise<PropertyDataStructure[]> {
    return this._memoryStore.getAll();
  }

  async getPropertiesByCommunityIdUserId(communityId: string, userId: string): Promise<PropertyDataStructure[]> {
    return (await this._memoryStore.getAll())?.
      filter(r => (
          (typeof r.community === 'string' && r.community === communityId) || ((r.community as CommunityDataStructure)?.id === communityId) // [MG-TBD]: implement this
          && (typeof r.owner === 'string' && r.owner === userId) || ((r.owner as MemberDataStructure)?.id === userId) // [MG-TBD]: implement this
      )
    );
  }

  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure> {
    return this.findOneById(propertyId); // [MG-TBD]: implement this
  }
}