import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { ViolationTicket, ViolationTicketProps } from './violation-ticket';
import { ViolationTicketRepository } from './violation-ticket.repository';

export interface ViolationTicketUnitOfWork extends UnitOfWork<DomainExecutionContext, ViolationTicketProps, ViolationTicket<ViolationTicketProps>, ViolationTicketRepository<ViolationTicketProps>> {
}
