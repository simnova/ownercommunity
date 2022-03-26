import { Community as CommunityDO, CommunityProps } from '../../../../domain/contexts/community/community';
import { CommunityRepository } from '../../../contexts/community/community-repository';
import { Community, CommunityModel }from '../../../../infrastructure/data-sources/cosmos-db/models/community';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';

export class MongoCommunityRepository<PropType extends CommunityProps> extends MongoRepositoryBase<DomainExecutionContext, Community,PropType,CommunityDO<PropType>> implements CommunityRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof CommunityModel, 
    typeConverter: TypeConverter<Community, CommunityDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }
  
  async getNewInstance(name:string, domain:string, whiteLabelDomain:string, handle:string): Promise<CommunityDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return CommunityDO.getNewInstance(adapter, name, domain, whiteLabelDomain, handle, this.context);
  }

}