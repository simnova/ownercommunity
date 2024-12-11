import { VendorUserRole as VendorUserRoleDO, VendorUserRoleProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role';
import { VendorUserRoleRepository } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role.repository';
import { VendorUserRole } from '../../../models/roles/vendor-user-role';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community/community';
import { CommunityVisa } from '../../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class MongoVendorUserRoleRepository<PropType extends VendorUserRoleProps>
  extends MongoRepositoryBase<DomainExecutionContext, VendorUserRole, PropType, CommunityVisa, VendorUserRoleDO<PropType>, InfrastructureContext>
  implements VendorUserRoleRepository<PropType>
{
  async getById(id: string): Promise<VendorUserRoleDO<PropType>> {
    const mongoRole = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(mongoRole, this.infrastructureContext, this.domainExecutionContext);
  }

  async getNewInstance(name: string, community: CommunityEntityReference): Promise<VendorUserRoleDO<PropType>> {
    const adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return VendorUserRoleDO.getNewInstance(adapter, name, false, community, this.domainExecutionContext);
  }
}
