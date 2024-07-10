import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../community/community';
import { PropertyEntityReference } from '../property/property';
import { MemberEntityReference } from '../community/member';
import { ViolationTicket as ViolationTicket, ViolationTicketProps as ViolationTicketProps } from './violation-ticket';

export interface ViolationTicketRepository<props extends ViolationTicketProps> extends Repository<ViolationTicket<props>> {
  getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number,
    penaltyPaidDate: Date
  ): Promise<ViolationTicket<props>>;

  getById(id: string): Promise<ViolationTicket<props>>
}