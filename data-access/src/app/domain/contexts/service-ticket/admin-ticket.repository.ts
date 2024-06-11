import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../community/community';
import { PropertyEntityReference } from '../property/property';
import { MemberEntityReference } from '../community/member';
import { AdminTicket, AdminTicketProps } from './admin-ticket';

export interface AdminTicketRepository<props extends AdminTicketProps> extends Repository<AdminTicket<props>> {
  getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number,
    penaltyPaidDate: Date
  ): Promise<AdminTicket<props>>;

  getById(id: string): Promise<AdminTicket<props>>
}