
import { EntityProps, Entity } from '../../../../../../../seedwork/domain-seedwork/entity';
import { MemberProps, MemberEntityReference, Member } from '../../../community/member';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { ServiceTicketVisa } from '../../../iam/domain-visa/service-ticket-visa';
import * as ValueObjects from './violation-ticket-activity-detail.value-objects';

export interface ViolationTicketV1ActivityDetailPropValues extends EntityProps {
  activityType: string;
  activityDescription: string;
  readonly activityBy: MemberProps;
  setActivityByRef: (activityBy: MemberEntityReference) => void;
}

export interface ViolationTicketV1ActivityDetailProps extends ViolationTicketV1ActivityDetailPropValues {}

export interface ViolationTicketV1ActivityDetailEntityReference extends Readonly<Omit<ViolationTicketV1ActivityDetailPropValues, 'activityBy' | 'setActivityByRef'>> {
  readonly activityBy: MemberEntityReference;
}

export class ViolationTicketV1ActivityDetail extends Entity<ViolationTicketV1ActivityDetailProps> implements ViolationTicketV1ActivityDetailEntityReference {
  constructor(props: ViolationTicketV1ActivityDetailProps, private context: DomainExecutionContext, private readonly visa: ServiceTicketVisa) {
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
