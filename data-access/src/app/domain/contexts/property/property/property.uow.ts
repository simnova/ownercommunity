import { UnitOfWork } from '../../../../../../framework/seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { Property, PropertyProps } from './property';
import { PropertyRepository } from './property.repository';

export interface PropertyUnitOfWork extends UnitOfWork<DomainExecutionContext, PropertyProps, Property<PropertyProps>, PropertyRepository<PropertyProps>> {
}
