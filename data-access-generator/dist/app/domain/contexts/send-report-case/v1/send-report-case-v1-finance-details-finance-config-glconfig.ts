export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps;
  readonly refunds: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps;
  readonly recognition: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly additionalCharges: PropArray<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps>;

}

export interface SendReportCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps, 'submission' | 'additionalCharges' | 'refunds' | 'recognition'>> {
  readonly submission: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference;
  readonly refunds: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefundsEntityReference;
  readonly recognition: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference;


  readonly additionalCharges: ReadonlyArray<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeEntityReference>;

}

export class SendReportCaseV1FinanceDetailsFinanceConfigGLConfig extends ValueObject<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps> implements SendReportCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigSubmission(this.props.submission, this.context) : undefined;
    }
  get refunds() {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRefunds(this.props.refunds, this.context
      //, this.visa
      );
    }
  get recognition() {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigRecognition(this.props.recognition, this.context
      //, this.visa
      );
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get additionalCharges(): ReadonlyArray<SendReportCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge> {
    return this.props.additionalCharges.items.map((item) => new SendReportCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge(item, this.context
    //, this.visa
    ));
  }


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsFinanceConfigGLConfig {
      return new SendReportCaseV1FinanceDetailsFinanceConfigGLConfig(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
