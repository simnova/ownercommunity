import { ServiceTicket, ServiceTicketProps } from './service-ticket';
import { Repository } from '../../shared/repository';

export interface ServiceTicketRepository<props extends ServiceTicketProps> extends Repository<ServiceTicket<props>> {
  
}