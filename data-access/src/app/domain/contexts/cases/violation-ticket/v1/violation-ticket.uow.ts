import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { ViolationTicketV1, ViolationTicketV1Props } from './violation-ticket';
import { ViolationTicketV1Repository } from './violation-ticket.repository';

export interface ViolationTicketUnitOfWork extends UnitOfWork<DomainExecutionContext, ViolationTicketV1Props, ViolationTicketV1<ViolationTicketV1Props>, ViolationTicketV1Repository<ViolationTicketV1Props>> {
}
