
import { EntityProps, Entity } from '../../../../../../../seedwork/domain-seedwork/entity';
import { MemberProps, MemberEntityReference, Member } from '../../../community/member';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { ServiceTicketVisa } from '../../../iam/domain-visa/service-ticket-visa';
import * as ValueObjects from './service-ticket-activity-detail.value-objects';

export interface ServiceTicketV1ActivityDetailPropValues extends EntityProps {
  activityType: string;
  activityDescription: string;
  readonly activityBy: MemberProps;
  setActivityByRef: (activityBy: MemberEntityReference) => void;
}

export interface ServiceTicketV1ActivityDetailProps extends ServiceTicketV1ActivityDetailPropValues {}

export interface ServiceTicketV1ActivityDetailEntityReference extends Readonly<Omit<ServiceTicketV1ActivityDetailPropValues, 'activityBy' | 'setActivityByRef'>> {
  readonly activityBy: MemberEntityReference;
}

export class ServiceTicketV1ActivityDetail extends Entity<ServiceTicketV1ActivityDetailProps> implements ServiceTicketV1ActivityDetailEntityReference {
  constructor(props: ServiceTicketV1ActivityDetailProps, private context: DomainExecutionContext, private readonly visa: ServiceTicketVisa) {
    super(props);
  }

  get activityType() {
    return this.props.activityType;
  }
  get activityDescription() {
    return this.props.activityDescription;
  }
  get activityBy(): MemberEntityReference {
    return new Member(this.props.activityBy, this.context);
  }

  // using set from TS 5.1

  set ActivityType(activityTypeCode: ValueObjects.ActivityTypeCode) {
    this.props.activityType = activityTypeCode.valueOf();
  }
  set ActivityDescription(activityDescription: ValueObjects.Description) {
    this.props.activityDescription = activityDescription.valueOf();
  }

  set ActivityBy(activityBy: MemberEntityReference) {
    this.props.setActivityByRef(activityBy);
  }
}
