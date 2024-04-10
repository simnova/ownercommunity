import { Role, RoleProps } from './role';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from './community';

export interface RoleRepository<props extends RoleProps> extends Repository<Role<props>> {
  getNewInstance(name: string, community: CommunityEntityReference): Promise<Role<props>>;
  getById(id: string): Promise<Role<props>>;
}