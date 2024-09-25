import { ViolationTicketV1 as ViolationTicketDO, ViolationTicketV1Props } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicket } from '../../../../models/cases/violation-ticket';
import { MongoRepositoryBase } from '../../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../../app/domain/domain-execution-context';
import { MemberEntityReference } from '../../../../../../../app/domain/contexts/community/member/member';
import { CommunityEntityReference } from '../../../../../../../app/domain/contexts/community/community/community';
import { PropertyEntityReference } from '../../../../../../../app/domain/contexts/property/property/property';
import { ViolationTicketV1Repository } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.repository';
import { ViolationTicketV1Visa } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.visa';
import { InfrastructureContext } from '../../../../../../../app/init/infrastructure-context';

export class MongoViolationTicketV1Repository<PropType extends ViolationTicketV1Props>
  extends MongoRepositoryBase<DomainExecutionContext, ViolationTicket, PropType, ViolationTicketV1Visa, ViolationTicketDO<PropType>, InfrastructureContext>
  implements ViolationTicketV1Repository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<ViolationTicketDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return ViolationTicketDO.getNewInstance(adapter, title, description, community, property, requestor, this.domainExecutionContext, penaltyAmount);
  }

  async getById(id: string): Promise<ViolationTicketDO<PropType>> {
    let member = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo', 'service']).exec();
    return this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext);
  }
}
