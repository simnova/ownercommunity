import { Role as RoleDO, RoleProps } from '../../contexts/community/role';
import { RoleRepository } from '../../contexts/community/role.repository';
import { Role, RoleModel }from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { TypeConverter } from '../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../shared/event-bus';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

export class MongoRoleRepository<PropType extends RoleProps> extends MongoRepositoryBase<DomainExecutionContext, Role,PropType,RoleDO<PropType>> implements RoleRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof RoleModel, 
    typeConverter: TypeConverter<Role, RoleDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }
  async getById(id: string): Promise<RoleDO<PropType>> {
    const mongoRole = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(mongoRole,this.context);
  }
  
  async getNewInstance(name:string, community:CommunityEntityReference): Promise<RoleDO<PropType>> {
    const adapter = this.typeConverter.toAdapter(new this.model());
    return RoleDO.getNewInstance(adapter, name, false, community, this.context);
  }
}