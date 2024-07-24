import { Repository } from '../../../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from '../../../community/community';
import { MemberEntityReference } from '../../../community/member';
import { PropertyEntityReference } from '../../../property/property';
import { ServiceTicketV1, ServiceTicketV1Props } from './service-ticket';

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