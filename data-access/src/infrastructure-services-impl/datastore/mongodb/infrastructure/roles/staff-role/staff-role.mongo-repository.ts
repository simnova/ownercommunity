import { StaffRoleRepository } from '../../../../../../app/domain/contexts/community/roles/staff-role/staff-role.repository';
import { StaffRole as StaffRoleDO, StaffRoleProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/staff-role';
import { StaffRole } from '../../../models/roles/staff-role';
import { MongoRepositoryBase } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { CommunityVisa } from '../../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';

export class MongoStaffRoleRepository<PropType extends StaffRoleProps>
  extends MongoRepositoryBase<DomainExecutionContext, StaffRole, PropType, CommunityVisa, StaffRoleDO<PropType>, InfrastructureContext>
  implements StaffRoleRepository<PropType>
{
  async getById(id: string): Promise<StaffRoleDO<PropType>> {
    const mongoRole = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(mongoRole, this.infrastructureContext, this.domainExecutionContext);
  }

  async getNewInstance(name: string): Promise<StaffRoleDO<PropType>> {
    const adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return StaffRoleDO.getNewInstance(adapter, name, false, this.domainExecutionContext);
  }

  async getByRoleName(roleName: string): Promise<StaffRoleDO<PropType>> {
    const mongoRole = await this.model.findOne({ roleName });
    return this.typeConverter.toDomain(mongoRole, this.infrastructureContext, this.domainExecutionContext);
  }
}
