import { MemberData, MemberModel, RoleModel, ViolationTicketModel } from '../../external-dependencies/datastore';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';
import { MemberDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';

export class MemberDataApiImpl 
  extends CosmosDataSource<MemberData, AppContext> 
  implements MemberDataApi
{
  async getMembers(): Promise<MemberData[]> {
    return this.findByFields({ community: this.context.community?.id });
  }
  async getMembersByCommunityId(communityId: string): Promise<MemberData[]> {
    return this.findByFields({ community: communityId });
  }
  async getMembersAssignableToTickets(): Promise<MemberData[]> {
    const communityId = this.context.community?.id;
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

  async getMemberAssignableToViolationTickets(violationTicketId: string): Promise<MemberData> {
    const communityId = this.context.community?.id;
    const result = await ViolationTicketModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(violationTicketId),
          community: new Types.ObjectId(communityId),
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'property',
          foreignField: '_id',
          as: 'p',
        },
      },
      {
        $unwind: {
          path: '$p',
        },
      },
      {
        $replaceWith: '$p',
      },
      {
        $lookup: {
          from: 'members',
          localField: 'owner',
          foreignField: '_id',
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
    console.log(`getMemberAssignableToViolationTickets`, result);
    return MemberModel.hydrate(result[0]);
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberData> {
    const result = await this.model.findById(memberId).populate('community').exec();
    return result;
  }
  async getMemberByIdWithCommunityAccountRole(memberId: string): Promise<MemberData> {
    const result = await this.model.findById(memberId).populate('community').populate('accounts.user').populate('role').exec();
    return result;
  }
  async getMemberById(memberId: string): Promise<MemberData> {
    let result = await (await this.findOneById(memberId)).populate('role');
    return result;
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
        $match: {
          'u.externalId': userExternalId,
        },
      },
      {
        $unwind: {
          path: '$m',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceWith: '$m',
      },
    ]).exec();

    return result.map((r) => MemberModel.hydrate(r));
  }

  async isAdmin(memberId: string): Promise<boolean> {
    const result = await this.model.findById(memberId).populate('role').exec();
    const p = result.role.permissions;
    return (
      p?.serviceTicketPermissions?.canWorkOnTickets ||
      p?.serviceTicketPermissions?.canManageTickets ||
      p?.serviceTicketPermissions?.canAssignTickets ||
      p?.communityPermissions?.canManageRolesAndPermissions ||
      p?.communityPermissions?.canManageCommunitySettings ||
      p?.communityPermissions?.canManageSiteContent ||
      p?.communityPermissions?.canManageMembers ||
      p?.propertyPermissions?.canManageProperties ||
      p?.violationTicketPermissions?.canManageTickets ||
      p?.violationTicketPermissions?.canAssignTickets ||
      p?.violationTicketPermissions?.canWorkOnTickets ||
      p?.violationTicketPermissions?.canCreateTickets
    );
  }
}
