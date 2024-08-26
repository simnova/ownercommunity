export interface CredentialVerificationCaseV1RevenueRecognitionProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: CredentialVerificationCaseV1RevenueRecognitionSubmissionProps;
  readonly recognition: CredentialVerificationCaseV1RevenueRecognitionRecognitionProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1RevenueRecognitionEntityReference extends Readonly<Omit<CredentialVerificationCaseV1RevenueRecognitionProps, 'submission' | 'recognition'>> {
  readonly submission: CredentialVerificationCaseV1RevenueRecognitionSubmissionEntityReference;
  readonly recognition: CredentialVerificationCaseV1RevenueRecognitionRecognitionEntityReference;



}

export class CredentialVerificationCaseV1RevenueRecognition extends ValueObject<CredentialVerificationCaseV1RevenueRecognitionProps> implements CredentialVerificationCaseV1RevenueRecognitionEntityReference {
  constructor(props: CredentialVerificationCaseV1RevenueRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new CredentialVerificationCaseV1RevenueRecognitionSubmission(this.props.submission, this.context) : undefined;
    }
  get recognition() {
      return this.props.recognition ? new CredentialVerificationCaseV1RevenueRecognitionRecognition(this.props.recognition, this.context) : undefined;
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
    newProps: CredentialVerificationCaseV1RevenueRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1RevenueRecognition {
      return new CredentialVerificationCaseV1RevenueRecognition(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
