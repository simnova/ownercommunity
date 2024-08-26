export interface CredentialVerificationCaseV1RevenueRecognitionRecognitionProps extends ValueObjectProps {
  // Primitive Fields
  debitGlAccount?: string;
  creditGlAccount?: string;
  amount?: number;
  recognitionDate?: Date;
  completedOn?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1RevenueRecognitionRecognitionEntityReference extends Readonly<CredentialVerificationCaseV1RevenueRecognitionRecognitionProps>{



}

export class CredentialVerificationCaseV1RevenueRecognitionRecognition extends ValueObject<CredentialVerificationCaseV1RevenueRecognitionRecognitionProps> implements CredentialVerificationCaseV1RevenueRecognitionRecognitionEntityReference {
  constructor(props: CredentialVerificationCaseV1RevenueRecognitionRecognitionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }
  get amount() {
    return this.props.amount;
    }
  get recognitionDate() {
    return this.props.recognitionDate;
    }
  get completedOn() {
    return this.props.completedOn;
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
    newProps: CredentialVerificationCaseV1RevenueRecognitionRecognitionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1RevenueRecognitionRecognition {
      return new CredentialVerificationCaseV1RevenueRecognitionRecognition(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }
  set Amount(value: number) {
    this.props.amount = value;
  }
  set RecognitionDate(value: Date) {
    this.props.recognitionDate = value;
  }
  set CompletedOn(value: Date) {
    this.props.completedOn = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
