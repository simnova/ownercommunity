import { EndUserRole as EndUserRoleDO, EndUserRoleProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role';
import { EndUserRoleRepository } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role.repository';
import { EndUserRole } from '../../../models/roles/end-user-role';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community/community';
import { CommunityVisa } from '../../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class MongoEndUserRoleRepository<PropType extends EndUserRoleProps>
  extends MongoRepositoryBase<DomainExecutionContext, EndUserRole, PropType, CommunityVisa, EndUserRoleDO<PropType>, InfrastructureContext>
  implements EndUserRoleRepository<PropType>
{
  async getById(id: string): Promise<EndUserRoleDO<PropType>> {
    const mongoRole = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(mongoRole, this.infrastructureContext, this.domainExecutionContext);
  }

  async getNewInstance(name: string, community: CommunityEntityReference): Promise<EndUserRoleDO<PropType>> {
    const adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return EndUserRoleDO.getNewInstance(adapter, name, false, community, this.domainExecutionContext);
  }
}
