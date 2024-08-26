export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps extends ValueObjectProps {
  // Primitive Fields
  isIdDocumentAcceptable?: boolean;
  isIdDocumentDetailsAcceptable?: boolean;
  isPhotoAcceptable?: boolean;

  // NestedPath Fields
  readonly audit: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps, 'audit'>> {
  readonly audit: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditEntityReference;



}

export class IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmations extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isIdDocumentAcceptable() {
    return this.props.isIdDocumentAcceptable;
    }
  get isIdDocumentDetailsAcceptable() {
    return this.props.isIdDocumentDetailsAcceptable;
    }
  get isPhotoAcceptable() {
    return this.props.isPhotoAcceptable;
    }

  // NestedPath Field Getters
  get audit() {
      return this.props.audit ? new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAudit(this.props.audit, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmations {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmations(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsIdDocumentAcceptable(value: boolean) {
    this.props.isIdDocumentAcceptable = value;
  }
  set IsIdDocumentDetailsAcceptable(value: boolean) {
    this.props.isIdDocumentDetailsAcceptable = value;
  }
  set IsPhotoAcceptable(value: boolean) {
    this.props.isPhotoAcceptable = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
