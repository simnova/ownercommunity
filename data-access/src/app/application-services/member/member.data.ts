import { Types } from "mongoose";
import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { MemberData, MemberModel, EndUserRoleModel, ViolationTicketModel } from "../../external-dependencies/datastore";
import { AppContext } from "../../init/app-context-builder";

export interface MemberDataApi {
  getMembers(): Promise<MemberData[]>;
  getMembersByCommunityId(communityId: string): Promise<MemberData[]>;
  getMembersAssignableToTickets(): Promise<MemberData[]>;
  getMemberAssignableToViolationTickets(violationTicketId: string): Promise<MemberData>;
  getMemberByIdWithCommunity(memberId: string): Promise<MemberData>;
  getMemberById(memberId: string): Promise<MemberData>;
  getMemberByIdWithCommunityAccountRole(memberId: string): Promise<MemberData>;
  getMembersByUserExternalId(userExternalId: string): Promise<MemberData[]>;
  isAdmin(memberId: string): Promise<boolean>;
}

export class MemberDataApiImpl
  extends CosmosDataSource<MemberData, AppContext>
  implements MemberDataApi {
  async getMembers(): Promise<MemberData[]> {
    return this.findByFields({ community: this.context.community?.id });
  }
  async getMembersByCommunityId(communityId: string): Promise<MemberData[]> {
    return await this.model.find({ community: communityId }).populate('role').exec();
  }
  async getMembersAssignableToTickets(): Promise<MemberData[]> {
    const communityId = this.context.community?.id;
    const result = await EndUserRoleModel.aggregate<MemberData>([
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
    return MemberModel.hydrate(result[0]);
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberData> {
    return await this.model.findById(memberId).populate('community').exec();
  }
  async getMemberByIdWithCommunityAccountRole(memberId: string): Promise<MemberData> {
    return await this.model.findById(memberId).populate('community').populate('accounts.user').populate('role').exec();  
  }
  async getMemberById(memberId: string): Promise<MemberData> {
    return await this.model.findById(memberId).populate('role');
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
    const p = result?.role?.permissions;
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
