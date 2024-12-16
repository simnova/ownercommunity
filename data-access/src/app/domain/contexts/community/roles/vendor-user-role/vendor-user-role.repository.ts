import { VendorUserRole, VendorUserRoleProps } from './vendor-user-role';
import { Repository } from '../../../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../../community/community';

export interface VendorUserRoleRepository<props extends VendorUserRoleProps> extends Repository<VendorUserRole<props>> {
  getNewInstance(name: string, community: CommunityEntityReference): Promise<VendorUserRole<props>>;
  getById(id: string): Promise<VendorUserRole<props>>;
}