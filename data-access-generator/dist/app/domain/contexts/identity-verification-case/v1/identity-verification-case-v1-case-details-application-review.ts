export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly affirmations: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps;
  readonly notaryAffirmations: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps;
  readonly decision: IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps;

  // PopulateDoc Fields
  readonly caseWorkerAssigned: StaffUserProps;
  setCaseWorkerAssignedRef(caseWorkerAssigned: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewProps, 'caseWorkerAssigned' | 'setCaseWorkerAssignedRef' | 'affirmations' | 'notaryAffirmations' | 'decision'>> {
  readonly affirmations: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsEntityReference;
  readonly notaryAffirmations: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsEntityReference;
  readonly decision: IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionEntityReference;

  readonly caseWorkerAssigned: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1CaseDetailsApplicationReview extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get affirmations() {
      return this.props.affirmations ? new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmations(this.props.affirmations, this.context) : undefined;
    }
  get notaryAffirmations() {
      return this.props.notaryAffirmations ? new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmations(this.props.notaryAffirmations, this.context) : undefined;
    }
  get decision() {
      return this.props.decision ? new IdentityVerificationCaseV1CaseDetailsApplicationReviewDecision(this.props.decision, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReview {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReview(newProps, context
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
