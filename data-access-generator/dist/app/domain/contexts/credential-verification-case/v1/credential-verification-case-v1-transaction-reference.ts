export interface CredentialVerificationCaseV1TransactionReferenceProps extends ValueObjectProps {
  // Primitive Fields
  vendor?: string;
  referenceId?: string;
  completedOn?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1TransactionReferenceEntityReference extends Readonly<CredentialVerificationCaseV1TransactionReferenceProps>{



}

export class CredentialVerificationCaseV1TransactionReference extends ValueObject<CredentialVerificationCaseV1TransactionReferenceProps> implements CredentialVerificationCaseV1TransactionReferenceEntityReference {
  constructor(props: CredentialVerificationCaseV1TransactionReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get vendor() {
    return this.props.vendor;
    }
  get referenceId() {
    return this.props.referenceId;
    }
  get completedOn() {
    return this.props.completedOn;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1TransactionReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1TransactionReference {
      return new CredentialVerificationCaseV1TransactionReference(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Vendor(value: string) {
    this.props.vendor = value;
  }
  set ReferenceId(value: string) {
    this.props.referenceId = value;
  }
  set CompletedOn(value: Date) {
    this.props.completedOn = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
