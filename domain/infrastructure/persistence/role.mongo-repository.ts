import { Role as RoleDO, RoleProps } from '../../contexts/community/role';
import { RoleRepository } from '../../contexts/community/role.repository';
import { Role } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

export class MongoRoleRepository<PropType extends RoleProps>
  extends MongoRepositoryBase<DomainExecutionContext, Role, PropType, RoleDO<PropType>>
  implements RoleRepository<PropType>
{
  async getById(id: string): Promise<RoleDO<PropType>> {
    const mongoRole = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(mongoRole, this.context);
  }

  async getNewInstance(name: string, community: CommunityEntityReference): Promise<RoleDO<PropType>> {
    const adapter = this.typeConverter.toAdapter(new this.model());
    return RoleDO.getNewInstance(adapter, name, false, community, this.context);
  }
}
