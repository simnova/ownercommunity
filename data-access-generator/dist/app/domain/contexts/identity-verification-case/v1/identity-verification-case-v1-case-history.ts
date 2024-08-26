export interface IdentityVerificationCaseV1CaseHistoryProps extends DomainEntityProps {
  // Primitive Fields

  // NestedPath Fields
  readonly caseDetails: IdentityVerificationCaseV1CaseDetailsProps;
  readonly revisionRequest: IdentityVerificationCaseV1RevisionRequestProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseHistoryEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseHistoryProps, 'caseDetails' | 'revisionRequest'>> {
  readonly caseDetails: IdentityVerificationCaseV1CaseDetailsEntityReference;
  readonly revisionRequest: IdentityVerificationCaseV1RevisionRequestEntityReference;



}

export class IdentityVerificationCaseV1CaseHistory extends DomainEntity<IdentityVerificationCaseV1CaseHistoryProps> implements IdentityVerificationCaseV1CaseHistoryEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get caseDetails() {
      return new IdentityVerificationCaseV1CaseDetails(this.props.caseDetails, this.context
      //, this.visa
      );
    }
  get revisionRequest() {
      return this.props.revisionRequest ? new IdentityVerificationCaseV1RevisionRequest(this.props.revisionRequest, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnIdentityVerificationCaseV1CaseHistorys && permissions.isEditingOwnIdentityVerificationCaseV1CaseHistory)
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
