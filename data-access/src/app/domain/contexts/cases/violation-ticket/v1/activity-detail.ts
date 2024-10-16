import { DomainEntity, DomainEntityProps } from '../../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { ViolationTicketV1Visa } from './violation-ticket.visa';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import * as ValueObjects from './activity-detail.value-objects';
import { Audit } from '../../../../decorators';
import { AuditContextFactoryType, FuncToGetMemberRefFromAuditContextFactory } from '../../../../../init/audit-context';

export interface ActivityDetailPropValues extends DomainEntityProps {
  activityType: string;
  activityDescription: string;
  readonly activityBy: MemberProps;
  setActivityByRef(funcToGetMemberRef: FuncToGetMemberRefFromAuditContextFactory);
}

export interface ActivityDetailProps extends ActivityDetailPropValues {}

export interface ActivityDetailEntityReference extends Readonly<Omit<ActivityDetailPropValues, 'activityBy' | 'setActivityByRef'>> {
  readonly activityBy: MemberEntityReference;
}

export class ActivityDetail extends DomainEntity<ActivityDetailProps> implements ActivityDetailEntityReference {
  constructor(props: ActivityDetailProps, private context: DomainExecutionContext, private readonly visa: ViolationTicketV1Visa) {
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

  @Audit
  setActivityBy(AuditContextFactory?: AuditContextFactoryType) {
    this.props.setActivityByRef(AuditContextFactory.getMemberRef);
  }
}
