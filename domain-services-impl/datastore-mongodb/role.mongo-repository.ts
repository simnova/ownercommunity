import { Role as RoleDO, RoleProps } from '../../domain/contexts/community/role';
import { RoleRepository } from '../../domain/contexts/community/role.repository';
import { Role } from '../../infrastructure/data-sources/cosmos-db/models/role';
import { MongoRepositoryBase } from '../../domain-seedwork-mongodb/mongo-repository';
import { DomainExecutionContext } from '../../domain/contexts/execution-context';
import { CommunityEntityReference } from '../../domain/contexts/community/community';

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
