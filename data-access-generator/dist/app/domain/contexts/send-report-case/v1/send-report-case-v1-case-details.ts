export interface SendReportCaseV1CaseDetailsProps extends ValueObjectProps {
  // Primitive Fields
  initiatedByApplicant?: boolean;
  createdAt?: Date;

  // NestedPath Fields
  readonly application: SendReportCaseV1CaseDetailsApplicationProps;
  readonly applicationReview: SendReportCaseV1CaseDetailsApplicationReviewProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsProps, 'application' | 'applicationReview'>> {
  readonly application: SendReportCaseV1CaseDetailsApplicationEntityReference;
  readonly applicationReview: SendReportCaseV1CaseDetailsApplicationReviewEntityReference;



}

export class SendReportCaseV1CaseDetails extends ValueObject<SendReportCaseV1CaseDetailsProps> implements SendReportCaseV1CaseDetailsEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get initiatedByApplicant() {
    return this.props.initiatedByApplicant;
    }
  get createdAt() {
    return this.props.createdAt;
    }

  // NestedPath Field Getters
  get application() {
      return this.props.application ? new SendReportCaseV1CaseDetailsApplication(this.props.application, this.context) : undefined;
    }
  get applicationReview() {
      return this.props.applicationReview ? new SendReportCaseV1CaseDetailsApplicationReview(this.props.applicationReview, this.context) : undefined;
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
    newProps: SendReportCaseV1CaseDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetails {
      return new SendReportCaseV1CaseDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set InitiatedByApplicant(value: boolean) {
    this.props.initiatedByApplicant = value;
  }
  set CreatedAt(value: Date) {
    this.props.createdAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
