import { ServiceTicketV1 as ServiceTicketDO, ServiceTicketV1Props } from '../../../../../../../components/domain/contexts/cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1Repository } from '../../../../../../../components/domain/contexts/cases/service-ticket/v1/service-ticket.repository';
import { ServiceTicket } from '../../../../models/cases/service-ticket';
import { MongoRepositoryBase } from '../../../../../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../../../framework/domain/domain-execution-context';
import { MemberEntityReference } from '../../../../../../../components/domain/contexts/community/member/member';
import { CommunityEntityReference } from '../../../../../../../components/domain/contexts/community/community/community';
import { PropertyEntityReference } from '../../../../../../../components/domain/contexts/property/property/property';

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
