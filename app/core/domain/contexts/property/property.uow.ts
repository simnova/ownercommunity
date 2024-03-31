import { UnitOfWork } from '../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../domain-execution-context';
import { Property, PropertyProps } from './property';
import { PropertyRepository } from './property.repository';

export interface PropertyUnitOfWork extends UnitOfWork<DomainExecutionContext, PropertyProps, Property<PropertyProps>, PropertyRepository<PropertyProps>> {
}
