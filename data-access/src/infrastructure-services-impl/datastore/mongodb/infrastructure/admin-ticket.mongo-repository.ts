import { AdminTicket as AdminTicketDO, AdminTicketProps } from '../../../../app/domain/contexts/service-ticket/admin-ticket';
import { AdminTicket } from '../models/admin-ticket';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { MemberEntityReference } from '../../../../app/domain/contexts/community/member';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community';
import { PropertyEntityReference } from '../../../../app/domain/contexts/property/property';
import { AdminTicketRepository } from '../../../../app/domain/contexts/service-ticket/admin-ticket.repository';

export class MongoAdminTicketRepository<PropType extends AdminTicketProps>
  extends MongoRepositoryBase<DomainExecutionContext, AdminTicket, PropType, AdminTicketDO<PropType>>
  implements AdminTicketRepository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<AdminTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return AdminTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.context, penaltyAmount);
  }

  async getById(id: string): Promise<AdminTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service', 'penaltyAmount', 'penaltyPaidDate']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
