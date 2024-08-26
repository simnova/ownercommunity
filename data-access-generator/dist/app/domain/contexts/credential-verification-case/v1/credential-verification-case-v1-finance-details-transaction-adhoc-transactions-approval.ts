export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps extends ValueObjectProps {
  // Primitive Fields
  isApplicantApprovalRequired?: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalEntityReference extends Readonly<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps>{



}

export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApproval extends ValueObject<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps> implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isApplicantApprovalRequired() {
    return this.props.isApplicantApprovalRequired;
    }
  get isApplicantApproved() {
    return this.props.isApplicantApproved;
    }
  get applicantRespondedAt() {
    return this.props.applicantRespondedAt;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApproval {
      return new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApproval(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsApplicantApprovalRequired(value: boolean) {
    this.props.isApplicantApprovalRequired = value;
  }
  set IsApplicantApproved(value: boolean) {
    this.props.isApplicantApproved = value;
  }
  set ApplicantRespondedAt(value: Date) {
    this.props.applicantRespondedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
