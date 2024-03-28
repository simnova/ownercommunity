import { Member, MemberModel } from '../models/member';
import { MemberDatastoreInfrastructureService } from '../../../../infrastructure-services/datastore';
import { MemberDataStructure } from '../../data-structures/member';
import { BaseMongoDatastore } from './_base.mongo-datastore';
import { Types } from 'mongoose';
import { RoleModel } from '../models/role';

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
    return result.map((r) => this.model.hydrate(r));
  }

  async getMemberByIdWithCommunity(memberId: string): Promise<MemberDataStructure> {
    return this.model.findById(memberId).populate('community').exec();
  }
}