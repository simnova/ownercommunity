export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps extends ValueObjectProps {
  // Primitive Fields
  vendor?: string;
  referenceId?: string;
  completedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceEntityReference extends Readonly<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps>{



}

export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReference extends ValueObject<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps> implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReference {
      return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReference(newProps, context
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
