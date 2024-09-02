import { EndUser as EndUserDO, EndUserProps } from '../../../../../../app/domain/contexts/users/end-user/end-user';
import { EndUserRepository } from '../../../../../../app/domain/contexts/users/end-user/end-user.repository';
import { EndUser } from '../../../models/users/end-user';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';

export class MongoEndUserRepository<PropType extends EndUserProps>
  extends MongoRepositoryBase<DomainExecutionContext, EndUser, PropType, EndUserDO<PropType>>
  implements EndUserRepository<PropType>
{
  async getByExternalId(externalId: string): Promise<EndUserDO<PropType>> {
    let user = await this.model.findOne({ externalId: externalId }).exec();
    return this.typeConverter.toDomain(user, this.context);
  }

  async getNewInstance(externalId: string, lastName: string, restOfName?: string): Promise<EndUserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return EndUserDO.getNewUser(adapter, externalId, lastName, this.context, restOfName); //no context needed for new user
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
