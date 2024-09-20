import { ServiceTicketV1 as ServiceTicketV1DO, ServiceTicketV1Props } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-v1';
import { ServiceTicketV1Repository } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket.repository';
import { ServiceTicket } from '../../../../models/cases/service-ticket';
import { MongoRepositoryBase } from '../../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../../app/domain/domain-execution-context';
import { MemberEntityReference } from '../../../../../../../app/domain/contexts/community/member/member';
import { CommunityEntityReference } from '../../../../../../../app/domain/contexts/community/community/community';
import { PropertyEntityReference } from '../../../../../../../app/domain/contexts/property/property/property';
import { ServiceTicketV1Visa } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket.visa';
import { InfrastructureContext } from '../../../../../../../app/init/infrastructure-context';

export class MongoServiceTicketV1Repository<PropType extends ServiceTicketV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, ServiceTicket, PropType, ServiceTicketV1Visa, ServiceTicketV1DO<PropType>, InfrastructureContext>
  implements ServiceTicketV1Repository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference
  ): Promise<ServiceTicketV1DO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return ServiceTicketV1DO.getNewInstance(adapter, title, description, community, property, requestor, this.domainExecutionContext);
  }

  async getById(id: string): Promise<ServiceTicketV1DO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service']).exec();
    return this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext);
  }
}
