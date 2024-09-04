import { EndUserRole, EndUserRoleProps } from './entities/end-user-role';
import { Repository } from '../../../../../../../framework/seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../../community/community';

export interface EndUserRoleRepository<props extends EndUserRoleProps> extends Repository<EndUserRole<props>> {
  getNewInstance(name: string, community: CommunityEntityReference): Promise<EndUserRole<props>>;
  getById(id: string): Promise<EndUserRole<props>>;
}