export interface CredentialVerificationCaseV1AuditProps extends ValueObjectProps {
  // Primitive Fields
  completedOn?: Date;
  result?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1AuditEntityReference extends Readonly<Omit<CredentialVerificationCaseV1AuditProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class CredentialVerificationCaseV1Audit extends ValueObject<CredentialVerificationCaseV1AuditProps> implements CredentialVerificationCaseV1AuditEntityReference {
  constructor(props: CredentialVerificationCaseV1AuditProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get completedOn() {
    return this.props.completedOn;
    }
  get result() {
    return this.props.result;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get completedBy(): StaffUserEntityReference {
          return new StaffUser(this.props.completedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1AuditProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1Audit {
      return new CredentialVerificationCaseV1Audit(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CompletedOn(value: Date) {
    this.props.completedOn = value;
  }
  set Result(value: string) {
    this.props.result = value;
  }

  // PopulatedDoc Field Setters
  set CompletedBy(completedBy: StaffUserEntityReference) {
    this.props.setCompletedByRef(completedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
