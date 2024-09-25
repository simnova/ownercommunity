import { StaffUser as StaffUserDO, StaffUserProps } from '../../../../../../app/domain/contexts/users/staff-user/staff-user';
import { StaffUserRepository } from '../../../../../../app/domain/contexts/users/staff-user/staff-user.repository';
import { StaffUser } from '../../../models/users/staff-user';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { StaffUserVisa } from '../../../../../../app/domain/contexts/users/staff-user/staff-user.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class MongoStaffUserRepository<PropType extends StaffUserProps>
  extends MongoRepositoryBase<DomainExecutionContext, StaffUser, PropType, StaffUserVisa, StaffUserDO<PropType>, InfrastructureContext>
  implements StaffUserRepository<PropType>
{
  async getByExternalId(externalId: string): Promise<StaffUserDO<PropType>> {
    let user = await this.model.findOne({ externalId: externalId }).exec();
    return this.typeConverter.toDomain(user, this.infrastructureContext, this.domainExecutionContext);
  }

  async getNewInstance(externalId: string, firstName: string, lastName: string, email: string): Promise<StaffUserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return StaffUserDO.getNewUser(adapter, externalId, firstName, lastName, email, this.domainExecutionContext);
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
