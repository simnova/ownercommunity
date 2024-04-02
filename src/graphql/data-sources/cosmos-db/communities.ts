import { isValidObjectId, Types } from 'mongoose';
import { Community, CommunityModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { MemberModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { UserModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/user';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class Communities extends CosmosDataSource<Community, GraphqlContext> {

  async getCurrentCommunity(): Promise<Community> {
    return this.findOneById(this.context.community);
  }
  async getCommunityById(id: string): Promise<Community> {
    return this.findOneById(id);
  }
  async getCommunityByHandle(handle: string): Promise<Community> {
    return this.findByFields({ handle: handle })?.[0];
  }
  async getCommunityByDomain(domain: string): Promise<Community> {
    return this.findByFields({ domain: domain })?.[0];
  }
  async getCommunityByHeader(header: string): Promise<Community> {
    console.log(`getCommunityByHeader`, header);
    if (isValidObjectId(header)) {
      console.log('valid header!objectId');
      return this.findOneById(header);
    }

    return this.collection.find({
      $or: [{ handle: header }, { domain: header }, { whileLabelDomain: header }],
    })?.[0];
  }
  async userIsAdmin(communityId: string): Promise<boolean> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    type MatchedDocsType = {
      matchedDocs: number;
    };
    const result = await MemberModel.aggregate<any>(
      [
        {
          $match: {
            community: new Types.ObjectId(communityId),
          },
        },
        {
          $project: {
            _id: 0,
            m: '$$ROOT',
          },
        },
        {
          $lookup: {
            localField: 'm.role',
            from: 'roles',
            foreignField: '_id',
            as: 'r',
          },
        },
        {
          $match: {
            $or: [
              {
                'r.permissions.serviceTicketPermissions.canManageTickets': true,
              },
              {
                'r.permissions.serviceTicketPermissions.canAssignTickets': true,
              },
              {
                'r.permissions.serviceTicketPermissions.canWorkOnTickets': true,
              },
              {
                'r.permissions.communityPermissions.canManageRolesAndPermissions': true,
              },
              {
                'r.permissions.communityPermissions.canManageCommunitySettings': true,
              },
              {
                'r.permissions.communityPermissions.canManageSiteContent': true,
              },
              {
                'r.permissions.communityPermissions.canManageMembers': true,
              },
              {
                'r.permissions.propertyPermissions.canManageProperties': true,
              },
            ],
          },
        },
        {
          $lookup: {
            localField: 'm.accounts.user',
            from: 'users',
            foreignField: '_id',
            as: 'u',
          },
        },
        {
          $match: {
            'u.externalId': externalId,
          },
        },
        {
          $count: 'matchedDocs',
        },
      ],
      {
        allowDiskUse: true,
      }
    );
    console.log(`communityId`, communityId);
    console.log(`userIsAdmin`, result);
    return result.reduce((acc, cur) => acc + cur.matchedDocs, 0) > 0;
  }

  async getCommunitiesForCurrentUser(): Promise<Community[]> {
    const externalId = this.context.verifiedUser.verifiedJWT.sub;
    // starts from user (looking up by externalId), then find where they are a member, and then find the communities they are a member of
    const result = await UserModel.aggregate<Community>([
      {
        $match: {
          externalId: externalId,
        },
      },
      {
        $lookup: {
          from: 'members',
          localField: '_id',
          foreignField: 'accounts.user',
          as: 'm',
        },
      },
      {
        $match: {
          m: {
            $ne: [],
          },
        },
      },
      {
        $lookup: {
          from: 'communities',
          localField: 'm.community',
          foreignField: '_id',
          as: 'c',
        },
      },
      {
        $unwind: {
          path: '$c',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceWith: '$c',
      },
    ]).exec();
    return result.map((r) => CommunityModel.hydrate(r));
  }
}
