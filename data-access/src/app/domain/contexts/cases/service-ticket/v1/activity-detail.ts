import { DomainEntity, DomainEntityProps } from '../../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { ServiceTicketV1Visa } from './service-ticket.visa';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import * as ValueObjects from './activity-detail.value-objects';

export interface ActivityDetailPropValues extends DomainEntityProps {
  activityType: string;
  activityDescription: string;
  readonly activityBy: MemberProps;
  setActivityByRef: (activityBy: MemberEntityReference) => void;
}

export interface ActivityDetailProps extends ActivityDetailPropValues {}

export interface ActivityDetailEntityReference extends Readonly<Omit<ActivityDetailPropValues, 'activityBy' | 'setActivityByRef'>> {
  readonly activityBy: MemberEntityReference;
}

export class ActivityDetail extends DomainEntity<ActivityDetailProps> implements ActivityDetailEntityReference {
  constructor(props: ActivityDetailProps, private context: DomainExecutionContext, private readonly visa: ServiceTicketV1Visa) {
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

  set ActivityType(activityTypeCode: string) {
    this.props.activityType = new ValueObjects.ActivityTypeCode(activityTypeCode).valueOf();
  }
  set ActivityDescription(activityDescription: string) {
    this.props.activityDescription = new ValueObjects.Description(activityDescription).valueOf();
  }

  set ActivityBy(activityBy: MemberEntityReference) {
    this.props.setActivityByRef(activityBy);
  }
}
