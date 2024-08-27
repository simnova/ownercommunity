export interface CredentialVerificationCaseV1ApplicationReviewProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly affirmations: CredentialVerificationCaseV1AffirmationsProps;
  readonly verificationAffirmations: CredentialVerificationCaseV1VerificationAffirmationsProps;
  readonly privateCaseDetails: CredentialVerificationCaseV1PrivateCaseDetailsProps;
  readonly decision: CredentialVerificationCaseV1ApplicationReviewDecisionProps;

  // PopulateDoc Fields
  readonly caseWorkerAssigned: StaffUserProps;
  setCaseWorkerAssignedRef(caseWorkerAssigned: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1ApplicationReviewEntityReference extends Readonly<Omit<CredentialVerificationCaseV1ApplicationReviewProps, 'caseWorkerAssigned' | 'setCaseWorkerAssignedRef' | 'affirmations' | 'verificationAffirmations' | 'privateCaseDetails' | 'decision'>> {
  readonly affirmations: CredentialVerificationCaseV1AffirmationsEntityReference;
  readonly verificationAffirmations: CredentialVerificationCaseV1VerificationAffirmationsEntityReference;
  readonly privateCaseDetails: CredentialVerificationCaseV1PrivateCaseDetailsEntityReference;
  readonly decision: CredentialVerificationCaseV1ApplicationReviewDecisionEntityReference;

  readonly caseWorkerAssigned: StaffUserEntityReference;


}

export class CredentialVerificationCaseV1ApplicationReview extends ValueObject<CredentialVerificationCaseV1ApplicationReviewProps> implements CredentialVerificationCaseV1ApplicationReviewEntityReference {
  constructor(props: CredentialVerificationCaseV1ApplicationReviewProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get affirmations() {
      return this.props.affirmations ? new CredentialVerificationCaseV1Affirmations(this.props.affirmations, this.context) : undefined;
    }
  get verificationAffirmations() {
      return this.props.verificationAffirmations ? new CredentialVerificationCaseV1VerificationAffirmations(this.props.verificationAffirmations, this.context) : undefined;
    }
  get privateCaseDetails() {
      return this.props.privateCaseDetails ? new CredentialVerificationCaseV1PrivateCaseDetails(this.props.privateCaseDetails, this.context) : undefined;
    }
  get decision() {
      return this.props.decision ? new CredentialVerificationCaseV1ApplicationReviewDecision(this.props.decision, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get caseWorkerAssigned(): StaffUserEntityReference {
          return this.props.caseWorkerAssigned ? new StaffUser(this.props.caseWorkerAssigned, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1ApplicationReviewProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1ApplicationReview {
      return new CredentialVerificationCaseV1ApplicationReview(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters
  set CaseWorkerAssigned(caseWorkerAssigned: StaffUserEntityReference) {
    this.props.setCaseWorkerAssignedRef(caseWorkerAssigned);
  }

//DocumentArrayFieldSetters: added as needed
}
