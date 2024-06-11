import { UnitOfWork } from '../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../domain-execution-context';
import { AdminTicket, AdminTicketProps } from './admin-ticket';
import { AdminTicketRepository } from './admin-ticket.repository';

export interface AdminTicketUnitOfWork extends UnitOfWork<DomainExecutionContext, AdminTicketProps, AdminTicket<AdminTicketProps>, AdminTicketRepository<AdminTicketProps>> {
}
