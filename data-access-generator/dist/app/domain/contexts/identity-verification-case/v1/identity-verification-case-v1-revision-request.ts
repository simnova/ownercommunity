export interface IdentityVerificationCaseV1RevisionRequestProps extends ValueObjectProps {
  // Primitive Fields
  requestedAt: Date;
  revisionSummary: string;
  revisionSubmittedAt?: Date;

  // NestedPath Fields
  readonly requestedChanges: IdentityVerificationCaseV1RevisionRequestRequestedChangesProps;

  // PopulateDoc Fields
  readonly requestedBy: StaffUserProps;
  setRequestedByRef(requestedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1RevisionRequestEntityReference extends Readonly<Omit<IdentityVerificationCaseV1RevisionRequestProps, 'requestedBy' | 'setRequestedByRef' | 'requestedChanges'>> {
  readonly requestedChanges: IdentityVerificationCaseV1RevisionRequestRequestedChangesEntityReference;

  readonly requestedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1RevisionRequest extends ValueObject<IdentityVerificationCaseV1RevisionRequestProps> implements IdentityVerificationCaseV1RevisionRequestEntityReference {
  constructor(props: IdentityVerificationCaseV1RevisionRequestProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
      return new IdentityVerificationCaseV1RevisionRequestRequestedChanges(this.props.requestedChanges, this.context
      //, this.visa
      );
    }

  // PopulateDoc Field Getters
  get requestedBy(): StaffUserEntityReference {
          return new StaffUser(this.props.requestedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: IdentityVerificationCaseV1RevisionRequestProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1RevisionRequest {
      return new IdentityVerificationCaseV1RevisionRequest(newProps, context
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
