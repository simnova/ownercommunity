import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { Property, PropertyProps } from './property';
import { PropertyRepository } from './property.repository';
import { PropertyVisa } from './property.visa';

export interface PropertyUnitOfWork extends UnitOfWork<DomainExecutionContext, PropertyProps, PropertyVisa, Property<PropertyProps>, PropertyRepository<PropertyProps>, InfrastructureContext> {
}
