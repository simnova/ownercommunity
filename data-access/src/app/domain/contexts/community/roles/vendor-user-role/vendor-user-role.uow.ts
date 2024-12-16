import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { CommunityVisa } from '../../community.visa';
import { VendorUserRole, VendorUserRoleProps } from './vendor-user-role';
import { VendorUserRoleRepository } from './vendor-user-role.repository';

export interface VendorUserRoleUnitOfWork extends UnitOfWork<DomainExecutionContext, VendorUserRoleProps, CommunityVisa, VendorUserRole<VendorUserRoleProps>, VendorUserRoleRepository<VendorUserRoleProps>, InfrastructureContext> {
}
