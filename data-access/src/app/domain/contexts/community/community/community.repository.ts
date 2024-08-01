import { Community, CommunityProps } from './community';
import { Repository } from '../../../../../../seedwork/domain-seedwork/repository';
import { EndUserEntityReference } from '../../users/end-user/end-user';

export interface CommunityRepository<props extends CommunityProps> extends Repository<Community<props>> {
  getNewInstance(communityName: string, createdByUser: EndUserEntityReference): Promise<Community<props>> ;
  getByIdWithCreatedBy(id: string): Promise<Community<props>>;
}