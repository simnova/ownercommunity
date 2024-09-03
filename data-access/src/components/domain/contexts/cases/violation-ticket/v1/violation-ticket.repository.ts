import { Repository } from '../../../../../../../framework/seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../../../community/community/community';
import { PropertyEntityReference } from '../../../property/property/property';
import { MemberEntityReference } from '../../../community/member/member';
import { ViolationTicketV1 , ViolationTicketV1Props } from './violation-ticket';

export interface ViolationTicketV1Repository<props extends ViolationTicketV1Props> extends Repository<ViolationTicketV1<props>> {
  getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<ViolationTicketV1<props>>;

  getById(id: string): Promise<ViolationTicketV1<props>>
}