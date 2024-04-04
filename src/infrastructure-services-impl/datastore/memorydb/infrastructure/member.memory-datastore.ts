import { MemberDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMemoryDatastore } from './_base.memory-datastore';
import { ReadOnlyMemoryStore } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store';
import { MemberDataStructure } from '../../data-structures/member';
import { CommunityDataStructure } from '../../data-structures/community';
import { UserDataStructure } from '../../data-structures/user';

type PropType = MemberDataStructure;

export class MemoryMemberDatastore 
  extends BaseMemoryDatastore<PropType>
  implements MemberDatastoreInfrastructureService {

  private _memoryStore: ReadOnlyMemoryStore<PropType>;

  constructor(memoryStore: ReadOnlyMemoryStore<PropType>){
    super(memoryStore);
    this._memoryStore = memoryStore;
  }

  async getMembersAssignableToTickets(communityId: string): Promise<MemberDataStructure[]> {
    return (await this._memoryStore.getAll())?.
      filter(r => (typeof r.community === 'string' && r.community === communityId) || ((r.community as CommunityDataStructure)?.id === communityId)); // [MG-TBD]: implement this  
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure> {
    return this.findOneById(memberId); // [MG-TBD]: implement this
    // return member as MemberEntityReference;
  }

  async getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<MemberDataStructure> {
    return (await this._memoryStore.getAll())?.
      find(r => (
        ((typeof r.community === 'string' && r.community === communityId) || ((r.community as CommunityDataStructure)?.id === communityId))
         && r.accounts?.some(a => ((typeof a.user === 'string' && a.user === userId) || ((a.user as UserDataStructure)?.id === userId)))
      )); // [MG-TBD]: implement this
  }
}