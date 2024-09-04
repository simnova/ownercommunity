import { ValueObject, ValueObjectProps } from '../../../../../../../framework/seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import {
  ViolationTicketV1RevisionRequestedChanges,
  ViolationTicketV1RevisionRequestedChangesEntityReference,
  ViolationTicketV1RevisionRequestedChangesProps,
} from './violation-ticket-v1-revision-requested-changes';
import { ViolationTicketV1Visa } from '../violation-ticket.domain-visa';

export interface ViolationTicketV1RevisionRequestProps extends ValueObjectProps {
  requestedAt: Date;
  readonly requestedBy: MemberProps;
  setRequestedByRef(requestedBy: MemberEntityReference): void;
  revisionSummary: string;
  readonly requestedChanges: ViolationTicketV1RevisionRequestedChangesProps;
  revisionSubmittedAt?: Date;
}

export interface ViolationTicketV1RevisionRequestEntityReference
  extends Readonly<Omit<ViolationTicketV1RevisionRequestProps, 'requestedBy' | 'setRequestedByRef' | 'requestedChanges' >> {
  readonly requestedBy: MemberEntityReference;
  readonly requestedChanges: ViolationTicketV1RevisionRequestedChangesEntityReference;
}

export class ViolationTicketV1RevisionRequest extends ValueObject<ViolationTicketV1RevisionRequestProps> implements ViolationTicketV1RevisionRequestEntityReference {
  constructor(props: ViolationTicketV1RevisionRequestProps, private readonly context: DomainExecutionContext, private readonly visa: ViolationTicketV1Visa) {
    super(props);
  }

  get requestedAt() {
    return this.props.requestedAt;
  }
  get requestedBy(): MemberEntityReference {
    return new Member(this.props.requestedBy, this.context);
  }
  get revisionSummary() {
    return this.props.revisionSummary;
  }
  get requestedChanges() {
    return new ViolationTicketV1RevisionRequestedChanges(this.props.requestedChanges, this.visa);
  }
  get revisionSubmittedAt() {
    return this.props.revisionSubmittedAt;
  }

  static getNewInstance(
    newProps: ViolationTicketV1RevisionRequestProps, 
    context: DomainExecutionContext, 
    visa: ViolationTicketV1Visa): ViolationTicketV1RevisionRequest {
      return new ViolationTicketV1RevisionRequest(newProps, context, visa);
  }

  private validateVisa(): void {
    if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
  }

  set RequestedAt(requestedAt: Date) {
    this.validateVisa();
    this.props.requestedAt = requestedAt;
  }

  set RequestedBy(requestedBy: MemberEntityReference) {
    this.validateVisa();
    this.props.setRequestedByRef(requestedBy);
  }

  set RevisionSummary(revisionSummary: string) {
    this.validateVisa();
    this.props.revisionSummary = revisionSummary;
  }

  set RevisionSubmittedAt(revisionSubmittedAt: Date) {
    if (!this.visa.determineIf((permissions) => 
      permissions.isEditingOwnTicket || 
      (permissions.canManageTickets && permissions.isEditingAssignedTicket) ||
      permissions.isSystemAccount
    )) {
      throw new Error('Unauthorized');
    }
    this.props.revisionSubmittedAt = revisionSubmittedAt;
  }
}
