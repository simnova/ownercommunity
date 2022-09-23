import { Service, ServiceProps } from './service';
import { Repository } from '../../shared/repository';

export interface ServiceRepository<props extends ServiceProps> extends Repository<Service<props>> {
  
}