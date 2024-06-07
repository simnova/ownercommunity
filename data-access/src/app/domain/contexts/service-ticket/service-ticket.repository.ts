import { ServiceTicket, ServiceTicketProps } from './service-ticket';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../community/community';
import { PropertyEntityReference } from '../property/property';
import { MemberEntityReference } from '../community/member';

export interface ServiceTicketRepository<props extends ServiceTicketProps> extends Repository<ServiceTicket<props>> {
  getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number,
    paymentDate: Date
  ): Promise<ServiceTicket<props>>;

  getById(id: string): Promise<ServiceTicket<props>>
}