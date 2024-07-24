import { ViolationTicketV1 as ViolationTicketV1DO, ViolationTicketV1Props } from '../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicket } from '../../../models/violation-ticket';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/contexts/domain-execution-context';
import { MemberEntityReference } from '../../../../../../app/domain/contexts/community/member';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community';
import { PropertyEntityReference } from '../../../../../../app/domain/contexts/property/property';
import { ViolationTicketV1Repository } from '../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.repository';

export class MongoViolationTicketV1Repository<PropType extends ViolationTicketV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, ViolationTicket, PropType, ViolationTicketV1DO<PropType>>
  implements ViolationTicketV1Repository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<ViolationTicketV1DO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ViolationTicketV1DO.getNewInstance(adapter, title, description, community, property, requestor, this.context, penaltyAmount);
  }

  async getById(id: string): Promise<ViolationTicketV1DO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service', 'penaltyAmount', 'penaltyPaidDate']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
