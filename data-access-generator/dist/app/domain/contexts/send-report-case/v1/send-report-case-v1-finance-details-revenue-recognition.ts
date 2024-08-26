export interface SendReportCaseV1FinanceDetailsRevenueRecognitionProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: SendReportCaseV1FinanceDetailsRevenueRecognitionSubmissionProps;
  readonly recognition: SendReportCaseV1FinanceDetailsRevenueRecognitionRecognitionProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsRevenueRecognitionEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsRevenueRecognitionProps, 'submission' | 'recognition'>> {
  readonly submission: SendReportCaseV1FinanceDetailsRevenueRecognitionSubmissionEntityReference;
  readonly recognition: SendReportCaseV1FinanceDetailsRevenueRecognitionRecognitionEntityReference;



}

export class SendReportCaseV1FinanceDetailsRevenueRecognition extends ValueObject<SendReportCaseV1FinanceDetailsRevenueRecognitionProps> implements SendReportCaseV1FinanceDetailsRevenueRecognitionEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsRevenueRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new SendReportCaseV1FinanceDetailsRevenueRecognitionSubmission(this.props.submission, this.context) : undefined;
    }
  get recognition() {
      return this.props.recognition ? new SendReportCaseV1FinanceDetailsRevenueRecognitionRecognition(this.props.recognition, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1FinanceDetailsRevenueRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsRevenueRecognition {
      return new SendReportCaseV1FinanceDetailsRevenueRecognition(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
