import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { Service, ServiceProps } from './service';
import { ServiceRepository } from './service.repository';

export interface ServiceUnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceProps, Service<ServiceProps>, ServiceRepository<ServiceProps>> {
}
