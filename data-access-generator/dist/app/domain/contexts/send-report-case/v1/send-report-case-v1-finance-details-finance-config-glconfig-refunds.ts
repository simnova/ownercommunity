export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps extends ValueObjectProps {
  // Primitive Fields
  creditGlAccount: string;
  debitGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsEntityReference extends Readonly<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps>{



}

export class SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefunds extends ValueObject<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps> implements SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefunds {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefunds(newProps, context
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
