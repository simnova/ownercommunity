export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps extends ValueObjectProps {
  // Primitive Fields
  isNotaryAcceptable?: boolean;
  isNotarizedIdAcceptable?: boolean;

  // NestedPath Fields
  readonly audit: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps, 'audit'>> {
  readonly audit: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditEntityReference;



}

export class IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmations extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isNotaryAcceptable() {
    return this.props.isNotaryAcceptable;
    }
  get isNotarizedIdAcceptable() {
    return this.props.isNotarizedIdAcceptable;
    }

  // NestedPath Field Getters
  get audit() {
      return this.props.audit ? new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAudit(this.props.audit, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmations {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmations(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsNotaryAcceptable(value: boolean) {
    this.props.isNotaryAcceptable = value;
  }
  set IsNotarizedIdAcceptable(value: boolean) {
    this.props.isNotarizedIdAcceptable = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
