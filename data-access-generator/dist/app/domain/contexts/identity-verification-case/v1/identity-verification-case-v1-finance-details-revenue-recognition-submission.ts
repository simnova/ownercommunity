export interface IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  debitGlAccount: string;
  creditGlAccount: string;
  amount: number;
  recognizedAt?: Date;
  completedAt: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionEntityReference extends Readonly<IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps>{



}

export class IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmission extends ValueObject<IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps> implements IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }
  get amount() {
    return this.props.amount;
    }
  get recognizedAt() {
    return this.props.recognizedAt;
    }
  get completedAt() {
    return this.props.completedAt;
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
    newProps: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmission {
      return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmission(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }
  set Amount(value: number) {
    this.props.amount = value;
  }
  set RecognizedAt(value: Date) {
    this.props.recognizedAt = value;
  }
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
