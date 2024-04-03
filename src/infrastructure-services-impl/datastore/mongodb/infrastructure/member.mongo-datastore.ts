import { Member, MemberModel } from '../models/member';
import { MemberDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { BaseMongoDatastore } from './_base.mongo-datastore';
import { Types } from 'mongoose';
import { RoleModel } from '../models/role';
import { MemberDataStructure } from '../../data-structures/member';

export class MongoMemberDatastore 
  extends BaseMongoDatastore<Member>
  implements MemberDatastoreInfrastructureService {

  constructor(){
    super({modelOrCollection: MemberModel})
  }

  async getMembersAssignableToTickets(communityId: string): Promise<MemberDataStructure[]> {
    const result = await RoleModel.aggregate<Member>([
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
    return result;
    // return result.map((r) => new MemberConverter().toDomain(r, ReadOnlyContext()));
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure> {
    const result = await this.model.findById(memberId).populate('community').exec();
    return result;
    // return new MemberConverter().toDomain(result,ReadOnlyContext()); // Add type assertion
  }
  
  async getMemberByCommunityAccountWithCommunityAccountRole(communityId: string, userId: string): Promise<MemberDataStructure> {
    const result = await this.model.findOne({community: communityId, 'accounts.user': userId})
    .populate('community')
    .populate('accounts.user')
    .populate('role')
    .exec();
    return result;
  }
}
