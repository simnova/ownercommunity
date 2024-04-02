import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../domain-execution-context';
import { ServiceTicketVisa } from '../iam/service-ticket-visa';
import { Member, MemberEntityReference, MemberProps } from '../community/member';
import * as ValueObjects from './activity-detail.value-objects';

export interface ActivityDetailPropValues extends EntityProps {
  activityType: string;
  activityDescription: string;
  readonly activityBy: MemberProps;
  setActivityByRef: (activityBy: MemberEntityReference) => void;
}

export interface ActivityDetailProps extends ActivityDetailPropValues {}

export interface ActivityDetailEntityReference extends Readonly<Omit<ActivityDetailPropValues, 'activityBy' | 'setActivityByRef'>> {
  readonly activityBy: MemberEntityReference;
}

export class ActivityDetail extends Entity<ActivityDetailProps> implements ActivityDetailEntityReference {
  constructor(props: ActivityDetailProps, private context: DomainExecutionContext, private readonly visa: ServiceTicketVisa) {
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
