export interface SendReportCaseV1AuditTypeProps extends ValueObjectProps {
  // Primitive Fields
  completedAt?: Date;
  result?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1AuditTypeEntityReference extends Readonly<Omit<SendReportCaseV1AuditTypeProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class SendReportCaseV1AuditType extends ValueObject<SendReportCaseV1AuditTypeProps> implements SendReportCaseV1AuditTypeEntityReference {
  constructor(props: SendReportCaseV1AuditTypeProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
          return this.props.completedBy ? new StaffUser(this.props.completedBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1AuditTypeProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1AuditType {
      return new SendReportCaseV1AuditType(newProps, context
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
