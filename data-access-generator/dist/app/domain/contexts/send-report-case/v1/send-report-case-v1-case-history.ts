export interface SendReportCaseV1CaseHistoryProps extends DomainEntityProps {
  // Primitive Fields

  // NestedPath Fields
  readonly caseDetails: SendReportCaseV1CaseDetailsProps;
  readonly revisionRequest: SendReportCaseV1RevisionRequestProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseHistoryEntityReference extends Readonly<Omit<SendReportCaseV1CaseHistoryProps, 'caseDetails' | 'revisionRequest'>> {
  readonly caseDetails: SendReportCaseV1CaseDetailsEntityReference;
  readonly revisionRequest: SendReportCaseV1RevisionRequestEntityReference;



}

export class SendReportCaseV1CaseHistory extends DomainEntity<SendReportCaseV1CaseHistoryProps> implements SendReportCaseV1CaseHistoryEntityReference {
  constructor(props: SendReportCaseV1CaseHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get caseDetails() {
      return this.props.caseDetails ? new SendReportCaseV1CaseDetails(this.props.caseDetails, this.context) : undefined;
    }
  get revisionRequest() {
      return this.props.revisionRequest ? new SendReportCaseV1RevisionRequest(this.props.revisionRequest, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnSendReportCaseV1CaseHistorys && permissions.isEditingOwnSendReportCaseV1CaseHistory)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
