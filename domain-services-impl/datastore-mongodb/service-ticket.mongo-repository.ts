import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../domain/contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../domain/contexts/service-ticket/service-ticket.repository';
import { ServiceTicket } from '../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { MongoRepositoryBase } from '../../domain-seedwork-mongodb/mongo-repository';
import { DomainExecutionContext } from '../../domain/contexts/execution-context';
import { MemberEntityReference } from '../../domain/contexts/community/member';
import { CommunityEntityReference } from '../../domain/contexts/community/community';
import { PropertyEntityReference } from '../../domain/contexts/property/property';

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
