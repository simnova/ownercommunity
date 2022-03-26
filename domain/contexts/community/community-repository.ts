import { Community, CommunityProps } from './community';
import { Repository } from '../../shared/repository';

export interface CommunityRepository<props extends CommunityProps> extends Repository<Community<props>> {
  
}