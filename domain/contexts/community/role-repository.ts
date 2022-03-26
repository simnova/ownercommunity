import { Role, RoleProps } from './role';
import { Repository } from '../../shared/repository';

export interface RoleRepository<props extends RoleProps> extends Repository<Role<props>> {
  
}