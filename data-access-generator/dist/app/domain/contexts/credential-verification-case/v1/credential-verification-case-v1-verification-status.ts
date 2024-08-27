export interface CredentialVerificationCaseV1VerificationStatusProps extends ValueObjectProps {
  // Primitive Fields
  verificationResponse?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1VerificationStatusEntityReference extends Readonly<CredentialVerificationCaseV1VerificationStatusProps>{



}

export class CredentialVerificationCaseV1VerificationStatus extends ValueObject<CredentialVerificationCaseV1VerificationStatusProps> implements CredentialVerificationCaseV1VerificationStatusEntityReference {
  constructor(props: CredentialVerificationCaseV1VerificationStatusProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get verificationResponse() {
    return this.props.verificationResponse;
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
    newProps: CredentialVerificationCaseV1VerificationStatusProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1VerificationStatus {
      return new CredentialVerificationCaseV1VerificationStatus(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set VerificationResponse(value: string) {
    this.props.verificationResponse = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
