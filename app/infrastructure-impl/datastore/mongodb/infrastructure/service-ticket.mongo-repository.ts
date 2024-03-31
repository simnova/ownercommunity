import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../../../core/domain/contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../../../core/domain/contexts/service-ticket/service-ticket.repository';
import { ServiceTicket } from '../models/service-ticket';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../core/domain/contexts/domain-execution-context';
import { MemberEntityReference } from '../../../../core/domain/contexts/community/member';
import { CommunityEntityReference } from '../../../../core/domain/contexts/community/community';
import { PropertyEntityReference } from '../../../../core/domain/contexts/property/property';

export class MongoServiceTicketRepository<PropType extends ServiceTicketProps>
  extends MongoRepositoryBase<DomainExecutionContext, ServiceTicket, PropType, ServiceTicketDO<PropType>>
  implements ServiceTicketRepository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference
  ): Promise<ServiceTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ServiceTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.context);
  }

  async getById(id: string): Promise<ServiceTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
