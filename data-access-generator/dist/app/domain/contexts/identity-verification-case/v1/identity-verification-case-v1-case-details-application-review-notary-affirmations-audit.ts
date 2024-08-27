export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps extends ValueObjectProps {
  // Primitive Fields
  completedAt: Date;
  result: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAudit extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAudit {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAudit(newProps, context
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
