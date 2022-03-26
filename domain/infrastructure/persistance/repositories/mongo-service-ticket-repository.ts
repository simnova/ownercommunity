import { ServiceTicket as ServiceTicketDO, ServiceTicketProps } from '../../../../domain/contexts/service-ticket/service-ticket';
import { ServiceTicketRepository } from '../../../contexts/service-ticket/service-ticket-repository';
import { ServiceTicket, ServiceTicketModel }from '../../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';

export class MongoServiceTicketRepository<PropType extends ServiceTicketProps> extends MongoRepositoryBase<DomainExecutionContext, ServiceTicket,PropType,ServiceTicketDO<PropType>> implements ServiceTicketRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof ServiceTicketModel, 
    typeConverter: TypeConverter<ServiceTicket, ServiceTicketDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }
  
}