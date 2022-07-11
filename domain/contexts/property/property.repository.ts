import { Property, PropertyProps } from './property';
import { Repository } from '../../shared/repository';

export interface PropertyRepository<props extends PropertyProps> extends Repository<Property<props>> {
  
}