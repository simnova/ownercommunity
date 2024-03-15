import { User as UserDO, UserProps } from '../domain/contexts/user/user';
import { UserRepository } from '../domain/contexts/user/user.repository';
import { User } from '../infrastructure/data-sources/cosmos-db/models/user';
import { MongoRepositoryBase } from '../domain-seedwork-mongo/mongo-repository';
import { DomainExecutionContext } from '../domain/contexts/context';

export class MongoUserRepository<PropType extends UserProps>
  extends MongoRepositoryBase<DomainExecutionContext, User, PropType, UserDO<PropType>>
  implements UserRepository<PropType>
{
  async getByExternalId(externalId: string): Promise<UserDO<PropType>> {
    let user = await this.model.findOne({ externalId: externalId }).exec();
    return this.typeConverter.toDomain(user, this.context);
  }

  async getNewInstance(externalId: string, firstName: string, lastName: string): Promise<UserDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return UserDO.getNewUser(adapter, externalId, firstName, lastName); //no context needed for new user
  }

  async delete(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id }).exec();
  }
}
