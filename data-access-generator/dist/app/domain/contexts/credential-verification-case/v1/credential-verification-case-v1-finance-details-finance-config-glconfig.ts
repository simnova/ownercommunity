export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionProps;
  readonly refunds: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRefundsProps;
  readonly recognition: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly additionalCharges: PropArray<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps>;

}

export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps, 'submission' | 'additionalCharges' | 'refunds' | 'recognition'>> {
  readonly submission: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmissionEntityReference;
  readonly refunds: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRefundsEntityReference;
  readonly recognition: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognitionEntityReference;


  readonly additionalCharges: ReadonlyArray<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeEntityReference>;

}

export class CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfig extends ValueObject<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps> implements CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigSubmission(this.props.submission, this.context) : undefined;
    }
  get refunds() {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRefunds(this.props.refunds, this.context
      //, this.visa
      );
    }
  get recognition() {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigRecognition(this.props.recognition, this.context
      //, this.visa
      );
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get additionalCharges(): ReadonlyArray<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge> {
    return this.props.additionalCharges.items.map((item) => new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge(item, this.context
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
    newProps: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfig {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfig(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
