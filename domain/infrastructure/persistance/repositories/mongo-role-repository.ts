import { Role as RoleDO, RoleProps } from '../../../../domain/contexts/community/role';
import { RoleRepository } from '../../../contexts/community/role-repository';
import { Role, RoleModel }from '../../../../infrastructure/data-sources/cosmos-db/models/role';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';

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
  
}