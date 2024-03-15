import { ServiceTicket, ServiceTicketProps } from './service-ticket';
import { Repository } from '../../../domain-seedwork/repository';

export interface ServiceTicketRepository<props extends ServiceTicketProps> extends Repository<ServiceTicket<props>> {
  
}