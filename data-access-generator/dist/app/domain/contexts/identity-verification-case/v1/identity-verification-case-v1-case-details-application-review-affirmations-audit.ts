export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps extends ValueObjectProps {
  // Primitive Fields
  completedAt: Date;
  result: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAudit extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get completedAt() {
    return this.props.completedAt;
    }
  get result() {
    return this.props.result;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get completedBy(): StaffUserEntityReference {
          return new StaffUser(this.props.completedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAudit {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAudit(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
  }
  set Result(value: string) {
    this.props.result = value;
  }

  // PopulatedDoc Field Setters
  set CompletedBy(completedBy: StaffUserEntityReference) {
    this.props.setCompletedByRef(completedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
