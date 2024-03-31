import { Community, CommunityProps } from './community';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { UserEntityReference } from '../user/user';

export interface CommunityRepository<props extends CommunityProps> extends Repository<Community<props>> {
  getNewInstance(communityName: string, createdByUser: UserEntityReference): Promise<Community<props>> ;
  getByIdWithCreatedBy(id: string): Promise<Community<props>>;
}