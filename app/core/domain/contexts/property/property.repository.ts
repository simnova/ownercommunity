import { Property, PropertyProps } from './property';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../community/community';

export interface PropertyRepository<props extends PropertyProps> extends Repository<Property<props>> {
  getNewInstance(propertyName: string, community: CommunityEntityReference): Promise<Property<props>>;
  getById(id: string): Promise<Property<props>>;
  getAll(): Promise<Property<props>[]>;
}