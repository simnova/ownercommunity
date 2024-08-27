export interface SendReportCaseV1RevisionRequestProps extends ValueObjectProps {
  // Primitive Fields
  requestedAt?: Date;
  revisionSummary?: string;
  revisionSubmittedAt?: Date;

  // NestedPath Fields
  readonly requestedChanges: SendReportCaseV1RevisionRequestRequestChangesProps;

  // PopulateDoc Fields
  readonly requestedBy: StaffUserProps;
  setRequestedByRef(requestedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1RevisionRequestEntityReference extends Readonly<Omit<SendReportCaseV1RevisionRequestProps, 'requestedBy' | 'setRequestedByRef' | 'requestedChanges'>> {
  readonly requestedChanges: SendReportCaseV1RevisionRequestRequestChangesEntityReference;

  readonly requestedBy: StaffUserEntityReference;


}

export class SendReportCaseV1RevisionRequest extends ValueObject<SendReportCaseV1RevisionRequestProps> implements SendReportCaseV1RevisionRequestEntityReference {
  constructor(props: SendReportCaseV1RevisionRequestProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get requestedAt() {
    return this.props.requestedAt;
    }
  get revisionSummary() {
    return this.props.revisionSummary;
    }
  get revisionSubmittedAt() {
    return this.props.revisionSubmittedAt;
    }

  // NestedPath Field Getters
  get requestedChanges() {
      return this.props.requestedChanges ? new SendReportCaseV1RevisionRequestRequestChanges(this.props.requestedChanges, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get requestedBy(): StaffUserEntityReference {
          return this.props.requestedBy ? new StaffUser(this.props.requestedBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1RevisionRequestProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1RevisionRequest {
      return new SendReportCaseV1RevisionRequest(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set RequestedAt(value: Date) {
    this.props.requestedAt = value;
  }
  set RevisionSummary(value: string) {
    this.props.revisionSummary = value;
  }
  set RevisionSubmittedAt(value: Date) {
    this.props.revisionSubmittedAt = value;
  }

  // PopulatedDoc Field Setters
  set RequestedBy(requestedBy: StaffUserEntityReference) {
    this.props.setRequestedByRef(requestedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
