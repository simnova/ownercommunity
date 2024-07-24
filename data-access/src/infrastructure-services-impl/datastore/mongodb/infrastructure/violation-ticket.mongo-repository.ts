import { ViolationTicket as ViolationTicketDO, ViolationTicketProps } from '../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicket } from '../models/violation-ticket';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { MemberEntityReference } from '../../../../app/domain/contexts/community/member/member';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community/community';
import { PropertyEntityReference } from '../../../../app/domain/contexts/property/property';
import { ViolationTicketRepository } from '../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.repository';

export class MongoViolationTicketRepository<PropType extends ViolationTicketProps>
  extends MongoRepositoryBase<DomainExecutionContext, ViolationTicket, PropType, ViolationTicketDO<PropType>>
  implements ViolationTicketRepository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<ViolationTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ViolationTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.context, penaltyAmount);
  }

  async getById(id: string): Promise<ViolationTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service', 'penaltyAmount', 'penaltyPaidDate']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
