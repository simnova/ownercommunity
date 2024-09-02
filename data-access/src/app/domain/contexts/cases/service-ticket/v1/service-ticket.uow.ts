import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket';
import { ServiceTicketV1Repository } from './service-ticket.repository';

export interface ServiceTicketV1UnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceTicketV1Props, ServiceTicketV1<ServiceTicketV1Props>, ServiceTicketV1Repository<ServiceTicketV1Props>> {
}
