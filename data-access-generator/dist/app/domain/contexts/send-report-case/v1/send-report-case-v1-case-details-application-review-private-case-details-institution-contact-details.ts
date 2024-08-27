export interface SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps extends ValueObjectProps {
  // Primitive Fields
  institutionEmail?: string;
  institutionPhone?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsEntityReference extends Readonly<SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps>{



}

export class SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails extends ValueObject<SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps> implements SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get institutionEmail() {
    return this.props.institutionEmail;
    }
  get institutionPhone() {
    return this.props.institutionPhone;
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
    newProps: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails {
      return new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set InstitutionEmail(value: string) {
    this.props.institutionEmail = value;
  }
  set InstitutionPhone(value: string) {
    this.props.institutionPhone = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
