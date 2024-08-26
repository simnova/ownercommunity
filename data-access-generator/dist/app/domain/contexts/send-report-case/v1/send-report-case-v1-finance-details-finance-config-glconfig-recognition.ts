export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps extends ValueObjectProps {
  // Primitive Fields
  creditGlAccount: string;
  debitGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference extends Readonly<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps>{



}

export class SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognition extends ValueObject<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps> implements SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognition {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognition(newProps, context
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
