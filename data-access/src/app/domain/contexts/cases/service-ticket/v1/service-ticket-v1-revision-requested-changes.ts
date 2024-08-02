import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { ServiceTicketV1Visa } from './service-ticket.visa';

export interface ServiceTicketV1RevisionRequestedChangesProps extends ValueObjectProps {
  requestUpdatedAssignment: boolean;
  requestUpdatedStatus: boolean;
  requestUpdatedProperty: boolean;
}

export interface ServiceTicketV1RevisionRequestedChangesEntityReference extends Readonly<ServiceTicketV1RevisionRequestedChangesProps> {}

export class ServiceTicketV1RevisionRequestedChanges
  extends ValueObject<ServiceTicketV1RevisionRequestedChangesProps>
  implements ServiceTicketV1RevisionRequestedChangesEntityReference
{
  constructor(props: ServiceTicketV1RevisionRequestedChangesProps, private readonly visa: ServiceTicketV1Visa) {
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

  private validateVisa(): void {
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
    return
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
}
