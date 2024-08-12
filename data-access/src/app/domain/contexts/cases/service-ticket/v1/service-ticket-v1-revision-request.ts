import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { Member, MemberEntityReference, MemberProps } from '../../../community/member/member';
import {
  ServiceTicketV1RevisionRequestedChanges,
  ServiceTicketV1RevisionRequestedChangesEntityReference,
  ServiceTicketV1RevisionRequestedChangesProps,
} from './service-ticket-v1-revision-requested-changes';
import { ServiceTicketV1Visa } from './service-ticket.visa';

export interface ServiceTicketV1RevisionRequestProps extends ValueObjectProps {
  requestedAt: Date;
  readonly requestedBy: MemberProps;
  setRequestedByRef(requestedBy: MemberEntityReference): void;
  revisionSummary: string;
  readonly requestedChanges: ServiceTicketV1RevisionRequestedChangesProps;
  revisionSubmittedAt?: Date;
}

export interface ServiceTicketV1RevisionRequestEntityReference
  extends Readonly<Omit<ServiceTicketV1RevisionRequestProps, 'requestedBy' | 'setRequestedByRef' | 'requestedChanges'>> {
  readonly requestedBy: MemberEntityReference;
  readonly requestedChanges: ServiceTicketV1RevisionRequestedChangesEntityReference;
}

export class ServiceTicketV1RevisionRequest extends ValueObject<ServiceTicketV1RevisionRequestProps> implements ServiceTicketV1RevisionRequestEntityReference {
  constructor(props: ServiceTicketV1RevisionRequestProps, private readonly context: DomainExecutionContext, private readonly visa: ServiceTicketV1Visa) {
    super(props);
  }
  get requestedAt() {
    return this.props.requestedAt;
  }
  get requestedBy() {
    return new Member(this.props.requestedBy, this.context);
  }
  get revisionSummary() {
    return this.props.revisionSummary;
  }
  get requestedChanges() {
    return new ServiceTicketV1RevisionRequestedChanges(this.props.requestedChanges, this.visa);
  }
  get revisionSubmittedAt() {
    return this.props.revisionSubmittedAt;
  }

  private validateVisa(): void {
    if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
  }

  static getNewInstance(
    newProps: ServiceTicketV1RevisionRequestProps, 
    context: DomainExecutionContext, 
    visa: ServiceTicketV1Visa): ServiceTicketV1RevisionRequest {
      return new ServiceTicketV1RevisionRequest(newProps, context, visa);
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
