import { VendorUser, VendorUserProps } from './vendor-user';
import { Repository } from '../../../../../../seedwork/domain-seedwork/repository';

export interface VendorUserRepository<props extends VendorUserProps> extends Repository<VendorUser<props>> {
  delete(id:string): Promise<void>;
  getByExternalId(externalId:string): Promise<VendorUser<props>>;
  getNewInstance(externalId: string, lastName: string, restOfName?: string): Promise<VendorUser<props>>;
}