import { Community, CommunityModel } from '../models/community';
import { CommunityDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMongoDatastore } from './_base.mongo-datastore';
import { Types, isValidObjectId } from 'mongoose';
import { UserModel } from '../models/user';
import { MemberModel } from '../models/member';
import { CommunityConverter } from './community.domain-adapter';
import { ReadOnlyContext } from '../../../../app/domain/contexts/domain-execution-context';
import { CommunityDataStructure } from '../../data-structures/community';

export class MongoCommunityDatastore 
  extends BaseMongoDatastore<Community>
  implements CommunityDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: CommunityModel});
  }

  async getCommunityByHeader(header: string): Promise<CommunityDataStructure> {
    console.log(`getCommunityByHeader`, header);
    if (isValidObjectId(header)) {
      console.log('valid header!objectId');
      const result = await this.findOneById(header); 
      return new CommunityConverter().toDomain(result,ReadOnlyContext());
    }

    return this.collection.find({
      $or: [{ handle: header }, { domain: header }, { whileLabelDomain: header }],
    })?.[0];
  }
  
  async isUserAdmin(communityId: string, externalId: string): Promise<boolean> {
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

  async getCommunitiesForUser(externalId: string): Promise<CommunityDataStructure[]> {
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
    // return result.map((r) => this.model.hydrate(r));
    return result.map((r) => new CommunityConverter().toDomain(r,ReadOnlyContext()));
  }
}