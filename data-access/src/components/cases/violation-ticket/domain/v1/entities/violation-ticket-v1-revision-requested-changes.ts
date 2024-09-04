import { ValueObject, ValueObjectProps } from "../../../../../../../framework/seedwork/domain-seedwork/value-object";
import { ViolationTicketV1Visa } from "../violation-ticket.domain-visa";

export interface ViolationTicketV1RevisionRequestedChangesProps extends ValueObjectProps {
  requestUpdatedAssignment: boolean;
  requestUpdatedStatus: boolean;
  requestUpdatedProperty: boolean;
  requestUpdatedPaymentTransaction: boolean;
}

export interface ViolationTicketV1RevisionRequestedChangesEntityReference extends Readonly<ViolationTicketV1RevisionRequestedChangesProps> {}

export class ViolationTicketV1RevisionRequestedChanges extends ValueObject<ViolationTicketV1RevisionRequestedChangesProps> implements ViolationTicketV1RevisionRequestedChangesEntityReference {
  constructor(props: ViolationTicketV1RevisionRequestedChangesProps, private readonly visa: ViolationTicketV1Visa) {
    super(props);
  }

  get requestUpdatedAssignment() {
    return this.props.requestUpdatedAssignment;
  }
  get requestUpdatedStatus() {
    return this.props.requestUpdatedStatus;
  }
  get requestUpdatedProperty() {
    return this.props.requestUpdatedProperty;
  }
  get requestUpdatedPaymentTransaction() {
    return this.props.requestUpdatedPaymentTransaction;
  }

  private validateVisa(): void {
    if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
  }

  set RequestUpdatedAssignment(requestUpdatedAssignment: boolean) {
    this.validateVisa();
    this.props.requestUpdatedAssignment = requestUpdatedAssignment;
  }

  set RequestUpdatedStatus(requestUpdatedStatus: boolean) {
    this.validateVisa();
    this.props.requestUpdatedStatus = requestUpdatedStatus;
  }

  set RequestUpdatedProperty(requestUpdatedProperty: boolean) {
    this.validateVisa();
    this.props.requestUpdatedProperty = requestUpdatedProperty;
  }

  set RequestUpdatedPaymentTransaction(requestUpdatedPaymentTransaction: boolean) {
    this.validateVisa();
    this.props.requestUpdatedPaymentTransaction = requestUpdatedPaymentTransaction;
  }
}