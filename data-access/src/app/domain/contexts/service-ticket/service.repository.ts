import { Service, ServiceProps } from './service';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../community/community';

export interface ServiceRepository<props extends ServiceProps> extends Repository<Service<props>> {
  getNewInstance(serviceName: string, description: string, community: CommunityEntityReference): Promise<Service<props>>;
  getById(id: string): Promise<Service<props>>
}