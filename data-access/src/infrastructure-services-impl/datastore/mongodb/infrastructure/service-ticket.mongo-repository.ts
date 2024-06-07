import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../../../app/domain/contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../../../app/domain/contexts/service-ticket/service-ticket.repository';
import { ServiceTicket } from '../models/service-ticket';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { MemberEntityReference } from '../../../../app/domain/contexts/community/member';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community';
import { PropertyEntityReference } from '../../../../app/domain/contexts/property/property';
import { AdminTicket } from '../models/admin-ticket';

export class MongoServiceTicketRepository<PropType extends ServiceTicketProps>
  extends MongoRepositoryBase<DomainExecutionContext, AdminTicket, PropType, ServiceTicketDO<PropType>>
  implements ServiceTicketRepository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount?: number,
    penaltyPaidDate?: Date
  ): Promise<ServiceTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ServiceTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.context, penaltyAmount, penaltyPaidDate);
  }

  async getById(id: string): Promise<ServiceTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
