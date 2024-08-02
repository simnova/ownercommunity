import { EndUser, EndUserProps } from './end-user';
import { Repository } from '../../../../../../seedwork/domain-seedwork/repository';

export interface EndUserRepository<props extends EndUserProps> extends Repository<EndUser<props>> {
  delete(id:string): Promise<void>;
  getByExternalId(externalId:string): Promise<EndUser<props>>;
  getNewInstance(externalId: string, lastName: string, restOfName?: string): Promise<EndUser<props>>;
}