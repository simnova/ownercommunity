import { UnitOfWork } from '../../../domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../execution-context';
import { ServiceTicket, ServiceTicketProps } from './service-ticket';
import { ServiceTicketRepository } from './service-ticket.repository';

export interface ServiceTicketUnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceTicketProps, ServiceTicket<ServiceTicketProps>, ServiceTicketRepository<ServiceTicketProps>> {
}
