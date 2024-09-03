import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket';
import { Repository } from '../../../../../../../framework/seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../../../community/community/community';
import { PropertyEntityReference } from '../../../property/property/property';
import { MemberEntityReference } from '../../../community/member/member';

export interface ServiceTicketV1Repository<props extends ServiceTicketV1Props> extends Repository<ServiceTicketV1<props>> {
  getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference
  ): Promise<ServiceTicketV1<props>>;

  getById(id: string): Promise<ServiceTicketV1<props>>
}