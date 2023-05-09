import { Member, MemberModel } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { RoleModel } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { Context } from '../../context';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';

export class Members extends CosmosDataSource<Member, Context> {
  
  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<Member> {
    return (
      await this.findByFields({
        community: communityId,
        'accounts.user': userId,
      })
    )?.[0];
  }
  async getMembers(): Promise<Member[]> {
    return this.findByFields({ community: this.context.community });
  }
  async getMembersByCommunityId(communityId: string): Promise<Member[]> {
    return this.findByFields({ community: communityId });
  }
  async getMembersAssignableToTickets(): Promise<Member[]> {
    const communityId = this.context.community;
    var result = await RoleModel.aggregate<Member>([
      {
        $match: {
          community: new Types.ObjectId(communityId),
          'permissions.serviceTicketPermissions.canWorkOnTickets': true,
        },
      },
      {
        $lookup: {
          from: 'members',
          localField: '_id',
          foreignField: 'role',
          as: 'm',
        },
      },
      {
        $unwind: {
          path: '$m',
        },
      },
      {
        $replaceWith: '$m',
      },
    ]).exec();
    console.log(`getMembersAssignableToTickets`, result);
    return result.map((r) => MemberModel.hydrate(r));
  }
}
