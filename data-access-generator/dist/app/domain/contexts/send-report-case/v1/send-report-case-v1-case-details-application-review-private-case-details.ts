export interface SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly institutionContactDetails: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps, 'institutionContactDetails'>> {
  readonly institutionContactDetails: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsEntityReference;



}

export class SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetails extends ValueObject<SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps> implements SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get institutionContactDetails() {
      return this.props.institutionContactDetails ? new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails(this.props.institutionContactDetails, this.context) : undefined;
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
    newProps: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetails {
      return new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
