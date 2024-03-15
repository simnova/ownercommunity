import { Property, PropertyProps } from './property';
import { Repository } from '../../../domain-seedwork/repository';

export interface PropertyRepository<props extends PropertyProps> extends Repository<Property<props>> {
  
}