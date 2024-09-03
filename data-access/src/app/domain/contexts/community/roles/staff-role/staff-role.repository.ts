import { StaffRole, StaffRoleProps } from './staff-role';
import { Repository } from '../../../../../../../framework/seedwork/domain-seedwork/repository';

export interface StaffRoleRepository<props extends StaffRoleProps> extends Repository<StaffRole<props>> {
  getNewInstance(name: string): Promise<StaffRole<props>>;
  getById(id: string): Promise<StaffRole<props>>;
  getByRoleName(roleName: string): Promise<StaffRole<props>>;
}