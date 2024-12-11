import { VendorUser as VendorUserDO, VendorUserProps } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user';
import { VendorUserRepository } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user.repository';
import { VendorUser } from '../../../models/users/vendor-user';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { VendorUserVisa } from '../../../../../../app/domain/contexts/users/vendor-user/vendor-user.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class MongoVendorUserRepository<PropType extends VendorUserProps>
  extends MongoRepositoryBase<DomainExecutionContext, VendorUser, PropType, VendorUserVisa, VendorUserDO<PropType>, InfrastructureContext>
  implements VendorUserRepository<PropType>
{
  async getByExternalId(externalId: string): Promise<VendorUserDO<PropType>> {
    let user = await this.model.findOne({ externalId: externalId }).exec();
    return this.typeConverter.toDomain(user, this.infrastructureContext, this.domainExecutionContext);
  }

  async getNewInstance(externalId: string, lastName: string, restOfName?: string): Promise<VendorUserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return VendorUserDO.getNewUser(adapter, externalId, lastName, this.domainExecutionContext, restOfName); //no context needed for new user
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
