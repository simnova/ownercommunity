export interface SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionProps extends ValueObjectProps {
  // Primitive Fields
  creditGlAccount: string;
  debitGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionEntityReference extends Readonly<SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionProps>{



}

export class SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognition extends ValueObject<SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionProps> implements SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionEntityReference {
  constructor(props: SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognition {
      return new SendReportCaseV1CaseFinanceDetailsFinanceConfigGLConfigRecognition(newProps, context
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
