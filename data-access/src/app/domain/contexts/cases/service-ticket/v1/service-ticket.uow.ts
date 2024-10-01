import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket-v1';
import { ServiceTicketV1Repository } from './service-ticket.repository';
import { ServiceTicketV1Visa } from './service-ticket.visa';

export interface ServiceTicketV1UnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceTicketV1Props, ServiceTicketV1Visa, ServiceTicketV1<ServiceTicketV1Props>, ServiceTicketV1Repository<ServiceTicketV1Props>, InfrastructureContext> {
}
