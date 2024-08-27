export interface SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsProps extends ValueObjectProps {
  // Primitive Fields
  creditGlAccount: string;
  debitGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsEntityReference extends Readonly<SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsProps>{



}

export class SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefunds extends ValueObject<SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsProps> implements SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsEntityReference {
  constructor(props: SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefundsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefunds {
      return new SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRefunds(newProps, context
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
