export interface CredentialVerificationCaseV1CaseHistoryProps extends DomainEntityProps {
  // Primitive Fields

  // NestedPath Fields
  readonly caseDetails: CredentialVerificationCaseV1CaseDetailsProps;
  readonly revisionRequest: CredentialVerificationCaseV1RevisionRequestProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1CaseHistoryEntityReference extends Readonly<Omit<CredentialVerificationCaseV1CaseHistoryProps, 'caseDetails' | 'revisionRequest'>> {
  readonly caseDetails: CredentialVerificationCaseV1CaseDetailsEntityReference;
  readonly revisionRequest: CredentialVerificationCaseV1RevisionRequestEntityReference;



}

export class CredentialVerificationCaseV1CaseHistory extends DomainEntity<CredentialVerificationCaseV1CaseHistoryProps> implements CredentialVerificationCaseV1CaseHistoryEntityReference {
  constructor(props: CredentialVerificationCaseV1CaseHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get caseDetails() {
      return this.props.caseDetails ? new CredentialVerificationCaseV1CaseDetails(this.props.caseDetails, this.context) : undefined;
    }
  get revisionRequest() {
      return this.props.revisionRequest ? new CredentialVerificationCaseV1RevisionRequest(this.props.revisionRequest, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnCredentialVerificationCaseV1CaseHistorys && permissions.isEditingOwnCredentialVerificationCaseV1CaseHistory)
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
