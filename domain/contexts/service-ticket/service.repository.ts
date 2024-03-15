import { Service, ServiceProps } from './service';
import { Repository } from '../../../domain-seedwork/repository';

export interface ServiceRepository<props extends ServiceProps> extends Repository<Service<props>> {
  
}