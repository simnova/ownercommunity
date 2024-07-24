import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { ServiceTicketV1 as ServiceTicketDO, ServiceTicketV1Props } from '../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1Repository } from '../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket.repository';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community';
import { MemberEntityReference } from '../../../../../../app/domain/contexts/community/member';
import { DomainExecutionContext } from '../../../../../../app/domain/contexts/domain-execution-context';
import { PropertyEntityReference } from '../../../../../../app/domain/contexts/property/property';
import { ServiceTicket } from '../../../models/service-ticket';

export class MongoServiceTicketV1Repository<PropType extends ServiceTicketV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, ServiceTicket, PropType, ServiceTicketDO<PropType>>
  implements ServiceTicketV1Repository<PropType>
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
