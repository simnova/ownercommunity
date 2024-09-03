import { Repository } from '../../../../framework/seedwork/domain-seedwork/repository';
import { EndUserEntityReference } from '../../domain/contexts/users/end-user/end-user';
import { Community, CommunityProps } from './entities/community';

export interface CommunityRepository<props extends CommunityProps> extends Repository<Community<props>> {
  getNewInstance(communityName: string, createdByUser: EndUserEntityReference): Promise<Community<props>> ;
  getByIdWithCreatedBy(id: string): Promise<Community<props>>;
}