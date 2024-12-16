import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { VendorUser, VendorUserProps } from './vendor-user';
import { VendorUserRepository } from './vendor-user.repository';
import { VendorUserVisa } from './vendor-user.visa';

export interface VendorUserUnitOfWork extends UnitOfWork<DomainExecutionContext, VendorUserProps, VendorUserVisa, VendorUser<VendorUserProps>, VendorUserRepository<VendorUserProps>, InfrastructureContext> {
}
