export interface IdentityVerificationCaseV1FinanceDetailsProps extends ValueObjectProps {
  // Primitive Fields
  serviceFee: number;

  // NestedPath Fields
  readonly revenueRecognition: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps;
  readonly transactions: IdentityVerificationCaseV1FinanceDetailsTransactionsProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1FinanceDetailsProps, 'revenueRecognition' | 'transactions'>> {
  readonly revenueRecognition: IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionEntityReference;
  readonly transactions: IdentityVerificationCaseV1FinanceDetailsTransactionsEntityReference;



}

export class IdentityVerificationCaseV1FinanceDetails extends ValueObject<IdentityVerificationCaseV1FinanceDetailsProps> implements IdentityVerificationCaseV1FinanceDetailsEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get serviceFee() {
    return this.props.serviceFee;
    }

  // NestedPath Field Getters
  get revenueRecognition() {
      return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognition(this.props.revenueRecognition, this.context
      //, this.visa
      );
    }
  get transactions() {
      return this.props.transactions ? new IdentityVerificationCaseV1FinanceDetailsTransactions(this.props.transactions, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1FinanceDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetails {
      return new IdentityVerificationCaseV1FinanceDetails(newProps, context
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
