export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps extends ValueObjectProps {
  // Primitive Fields
  creditGlAccount: string;
  debitGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference extends Readonly<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps>{



}

export class CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognition extends ValueObject<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps> implements CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }
  get debitGlAccount() {
    return this.props.debitGlAccount;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognition {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognition(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
