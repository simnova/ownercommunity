import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ViolationTicketV1, ViolationTicketV1Props } from './violation-ticket';
import { ViolationTicketV1Repository } from './violation-ticket.repository';
import { ViolationTicketV1Visa } from './violation-ticket.visa';

export interface ViolationTicketV1UnitOfWork extends UnitOfWork<DomainExecutionContext, ViolationTicketV1Props, ViolationTicketV1Visa, ViolationTicketV1<ViolationTicketV1Props>, ViolationTicketV1Repository<ViolationTicketV1Props>, InfrastructureContext> {
}
