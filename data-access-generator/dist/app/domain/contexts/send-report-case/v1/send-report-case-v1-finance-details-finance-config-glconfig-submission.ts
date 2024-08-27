export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  amount: number;
  debitGlAccount: string;
  creditGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference extends Readonly<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps>{



}

export class SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmission extends ValueObject<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps> implements SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmission {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmission(newProps, context
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
