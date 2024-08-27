export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  amount: number;
  debitGlAccount: string;
  creditGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference extends Readonly<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps>{



}

export class CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmission extends ValueObject<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps> implements CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get amount() {
    return this.props.amount;
    }
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmission {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmission(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Amount(value: number) {
    this.props.amount = value;
  }
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
