export interface CredentialVerificationCaseV1FinanceDetailsProps extends ValueObjectProps {
  // Primitive Fields
  serviceFee?: number;

  // NestedPath Fields
  readonly financeConfig: CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps;
  readonly revenueRecognition: CredentialVerificationCaseV1RevenueRecognitionProps;
  readonly transactions: CredentialVerificationCaseV1FinanceDetailsTransactionsProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsProps, 'financeConfig' | 'revenueRecognition' | 'transactions'>> {
  readonly financeConfig: CredentialVerificationCaseV1FinanceDetailsFinanceConfigEntityReference;
  readonly revenueRecognition: CredentialVerificationCaseV1RevenueRecognitionEntityReference;
  readonly transactions: CredentialVerificationCaseV1FinanceDetailsTransactionsEntityReference;



}

export class CredentialVerificationCaseV1FinanceDetails extends ValueObject<CredentialVerificationCaseV1FinanceDetailsProps> implements CredentialVerificationCaseV1FinanceDetailsEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get serviceFee() {
    return this.props.serviceFee;
    }

  // NestedPath Field Getters
  get financeConfig() {
      return this.props.financeConfig ? new CredentialVerificationCaseV1FinanceDetailsFinanceConfig(this.props.financeConfig, this.context) : undefined;
    }
  get revenueRecognition() {
      return this.props.revenueRecognition ? new CredentialVerificationCaseV1RevenueRecognition(this.props.revenueRecognition, this.context) : undefined;
    }
  get transactions() {
      return this.props.transactions ? new CredentialVerificationCaseV1FinanceDetailsTransactions(this.props.transactions, this.context) : undefined;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetails {
      return new CredentialVerificationCaseV1FinanceDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set ServiceFee(value: number) {
    this.props.serviceFee = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
