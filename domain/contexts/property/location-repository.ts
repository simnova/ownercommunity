import { Location, LocationProps } from './location';
import { Repository } from '../../shared/repository';

export interface LocationRepository<props extends LocationProps> extends Repository<Location<props>> {
  
}