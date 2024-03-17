import { UnitOfWork } from '../../../domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../execution-context';
import { Service, ServiceProps } from './service';
import { ServiceRepository } from './service.repository';

export interface ServiceUnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceProps, Service<ServiceProps>, ServiceRepository<ServiceProps>> {
}
