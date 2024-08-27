export interface SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps extends ValueObjectProps {
  // Primitive Fields
  vendor?: string;
  referenceId?: string;
  completedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceEntityReference extends Readonly<SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps>{



}

export class SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReference extends ValueObject<SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps> implements SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get vendor() {
    return this.props.vendor;
    }
  get referenceId() {
    return this.props.referenceId;
    }
  get completedAt() {
    return this.props.completedAt;
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
    newProps: SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReference {
      return new SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReference(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Vendor(value: string) {
    this.props.vendor = value;
  }
  set ReferenceId(value: string) {
    this.props.referenceId = value;
  }
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
