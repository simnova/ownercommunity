import { StaffUser, StaffUserProps } from './staff-user';
import { Repository } from '../../../../../../seedwork/domain-seedwork/repository';

export interface StaffUserRepository<props extends StaffUserProps> extends Repository<StaffUser<props>> {
  delete(id:string): Promise<void>;
  getByExternalId(externalId:string): Promise<StaffUser<props>>;
  getNewInstance(externalId: string, firstName: string, lastName: string): Promise<StaffUser<props>>;
}