export interface IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps;
  readonly recognition: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognitionProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionEntityReference extends Readonly<Omit<IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps, 'submission' | 'recognition'>> {
  readonly submission: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionEntityReference;
  readonly recognition: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognitionEntityReference;



}

export class IdentityVerificationCaseV1FinanceDetailsRevenueRecognition extends ValueObject<IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps> implements IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmission(this.props.submission, this.context) : undefined;
    }
  get recognition() {
      return this.props.recognition ? new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognition(this.props.recognition, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsRevenueRecognition {
      return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognition(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
