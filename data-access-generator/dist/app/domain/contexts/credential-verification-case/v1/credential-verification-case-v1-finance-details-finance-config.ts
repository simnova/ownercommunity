export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps extends ValueObjectProps {
  // Primitive Fields
  effectiveAt?: Date;
  createdAt?: Date;
  note?: string;

  // NestedPath Fields
  readonly glConfig: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigProps;

  // PopulateDoc Fields
  readonly createdBy: StaffUserProps;
  setCreatedByRef(createdBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps, 'glConfig' | 'createdBy' | 'setCreatedByRef'>> {
  readonly glConfig: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigEntityReference;

  readonly createdBy: StaffUserEntityReference;


}

export class CredentialVerificationCaseV1FinanceDetailsFinanceConfig extends ValueObject<CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps> implements CredentialVerificationCaseV1FinanceDetailsFinanceConfigEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
      return this.props.glConfig ? new CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfig(this.props.glConfig, this.context) : undefined;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsFinanceConfigProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsFinanceConfig {
      return new CredentialVerificationCaseV1FinanceDetailsFinanceConfig(newProps, context
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
