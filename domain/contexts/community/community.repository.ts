import { Community, CommunityProps } from './community';
import { Repository } from '../../shared/repository';
import { UserEntityReference } from '../user/user';

export interface CommunityRepository<props extends CommunityProps> extends Repository<Community<props>> {
  getNewInstance(name: string, user: UserEntityReference): Promise<Community<props>> ;
  getByIdWithCreatedBy(id: string): Promise<Community<props>>;
}