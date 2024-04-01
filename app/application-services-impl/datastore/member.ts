import { Context } from '../../core/context';
import { MemberDatastoreApplicationService } from '../../core/application-services/datastore/member.interface';
import { DatastoreApplicationServiceImpl } from './_datastore.application-service';
import { MemberDataStructure } from '../../core/application-services/datastore';

export class MemberDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
  implements MemberDatastoreApplicationService
{

  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberDataStructure> {
    let memberToReturn: MemberDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = (await datastore.memberDatastore.findByFields({ community: communityId, 'accounts.user': userId }))?.[0];
    });
    return memberToReturn;
  }

  async getMembers(): Promise<MemberDataStructure[]> {
    let memberToReturn: MemberDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.findByFields({ community: this.context.community });
    });
    return memberToReturn;
  }

  async getMembersByCommunityId(communityId: string): Promise<MemberDataStructure[]> {
    let memberToReturn: MemberDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.findByFields({ community: communityId });
    });
    return memberToReturn;
  }

  async getMembersAssignableToTickets(): Promise<MemberDataStructure[]> {
    const communityId = this.context.community;
    let memberToReturn: MemberDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.getMembersAssignableToTickets(communityId);
    });
    return memberToReturn;
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure> {
    let memberToReturn: MemberDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.getMemberByIdWithCommunity(memberId);
    });
    return memberToReturn;
  }

  async getMemberById(memberId: string): Promise<MemberDataStructure> {
    let memberToReturn: MemberDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      memberToReturn = await datastore.memberDatastore.findOneById(memberId);
    });
    return memberToReturn;
  }
}
