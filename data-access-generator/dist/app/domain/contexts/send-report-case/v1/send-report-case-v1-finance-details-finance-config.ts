export interface SendReportCaseV1FinanceDetailsFinanceConfigProps extends ValueObjectProps {
  // Primitive Fields
  effectiveAt?: Date;
  createdAt?: Date;
  note?: string;

  // NestedPath Fields
  readonly glConfig: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigProps;

  // PopulateDoc Fields
  readonly createdBy: StaffUserProps;
  setCreatedByRef(createdBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsFinanceConfigEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsFinanceConfigProps, 'glConfig' | 'createdBy' | 'setCreatedByRef'>> {
  readonly glConfig: SendReportCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference;

  readonly createdBy: StaffUserEntityReference;


}

export class SendReportCaseV1FinanceDetailsFinanceConfig extends ValueObject<SendReportCaseV1FinanceDetailsFinanceConfigProps> implements SendReportCaseV1FinanceDetailsFinanceConfigEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsFinanceConfigProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get effectiveAt() {
    return this.props.effectiveAt;
    }
  get createdAt() {
    return this.props.createdAt;
    }
  get note() {
    return this.props.note;
    }

  // NestedPath Field Getters
  get glConfig() {
      return this.props.glConfig ? new SendReportCaseV1FinanceDetailsFinanceConfigGLConfig(this.props.glConfig, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get createdBy(): StaffUserEntityReference {
          return this.props.createdBy ? new StaffUser(this.props.createdBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1FinanceDetailsFinanceConfigProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsFinanceConfig {
      return new SendReportCaseV1FinanceDetailsFinanceConfig(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set EffectiveAt(value: Date) {
    this.props.effectiveAt = value;
  }
  set CreatedAt(value: Date) {
    this.props.createdAt = value;
  }
  set Note(value: string) {
    this.props.note = value;
  }

  // PopulatedDoc Field Setters
  set CreatedBy(createdBy: StaffUserEntityReference) {
    this.props.setCreatedByRef(createdBy);
  }

//DocumentArrayFieldSetters: added as needed
}
