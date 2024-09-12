import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { Service, ServiceProps } from './service';
import { ServiceRepository } from './service.repository';
import { ServiceVisa } from './service.visa';

export interface ServiceUnitOfWork extends UnitOfWork<DomainExecutionContext, ServiceProps, ServiceVisa, Service<ServiceProps>, ServiceRepository<ServiceProps>> {
}
