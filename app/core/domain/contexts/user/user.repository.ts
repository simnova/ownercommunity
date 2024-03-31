import { User, UserProps } from './user';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';

export interface UserRepository<props extends UserProps> extends Repository<User<props>> {
  delete(id:string): Promise<void>;
  getByExternalId(externalId:string): Promise<User<props>>;
  getNewInstance(externalId: string, firstName: string, lastName: string): Promise<User<props>>;
}