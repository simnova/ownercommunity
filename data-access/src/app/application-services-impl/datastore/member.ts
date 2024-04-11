import { MemberData, MemberModel, RoleModel } from '../../external-dependencies/datastore';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';
import { MemberDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';

export class MemberDataApiImpl 
  extends CosmosDataSource<MemberData, AppContext> 
  implements MemberDataApi
{
  async getMemberByCommunityIdUserId(communityId: string, userId: string): Promise<MemberData> {
    return (
      await this.findByFields({
        community: communityId,
        'accounts.user': userId,
      })
    )?.[0];
  }
  async getMembers(): Promise<MemberData[]> {
    return this.findByFields({ community: this.context.communityId });
  }
  async getMembersByCommunityId(communityId: string): Promise<MemberData[]> {
    return this.findByFields({ community: communityId });
  }
  async getMembersAssignableToTickets(): Promise<MemberData[]> {
    const communityId = this.context.communityId;
    const result = await RoleModel.aggregate<MemberData>([
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
  async getMemberByIdWithCommunity(memberId: string): Promise<MemberData> {
    const result = await this.model.findById(memberId).populate('community').exec();
    return result;
  }
  async getMemberByIdWithCommunityAccountRole(memberId: string): Promise<MemberData> {
    const result = await this.model.findById(memberId)
    .populate('community')
    .populate('accounts.user')
    .populate('role')
    .exec();
    return result;
  }
  async getMemberById(memberId: string): Promise<MemberData> {
    return this.findOneById(memberId);
  }

  async getMembersByUserExternalId(userExternalId: string): Promise<MemberData[]> {
    const result = await MemberModel.aggregate([
        {
          $project: {
            id: 0,
            m: '$$ROOT',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'm.accounts.user',
            foreignField: '_id',
            as: 'u',
          },
        },
        {
          $match : {
              "u.externalId" : userExternalId
          }
        }, 
        {
          $unwind : {
              path : "$m",
              preserveNullAndEmptyArrays : true
          }
        }, 
        {
          $replaceWith : "$m"
        },
    ]).exec();

    return result.map((r) => MemberModel.hydrate(r));
  }
}
