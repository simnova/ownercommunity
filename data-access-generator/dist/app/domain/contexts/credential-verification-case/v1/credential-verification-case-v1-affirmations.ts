export interface CredentialVerificationCaseV1AffirmationsProps extends ValueObjectProps {
  // Primitive Fields
  isNameAcceptable?: boolean;
  isTranslationAcceptable?: boolean;
  isCredentialAcceptable?: boolean;
  isCredentialDetailsAcceptable?: boolean;
  isDateOfBirthAcceptable?: boolean;
  isEntityAcceptable?: boolean;
  isCredentialSentForVerification?: boolean;

  // NestedPath Fields
  readonly audit: CredentialVerificationCaseV1AuditProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1AffirmationsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1AffirmationsProps, 'audit'>> {
  readonly audit: CredentialVerificationCaseV1AuditEntityReference;



}

export class CredentialVerificationCaseV1Affirmations extends ValueObject<CredentialVerificationCaseV1AffirmationsProps> implements CredentialVerificationCaseV1AffirmationsEntityReference {
  constructor(props: CredentialVerificationCaseV1AffirmationsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isNameAcceptable() {
    return this.props.isNameAcceptable;
    }
  get isTranslationAcceptable() {
    return this.props.isTranslationAcceptable;
    }
  get isCredentialAcceptable() {
    return this.props.isCredentialAcceptable;
    }
  get isCredentialDetailsAcceptable() {
    return this.props.isCredentialDetailsAcceptable;
    }
  get isDateOfBirthAcceptable() {
    return this.props.isDateOfBirthAcceptable;
    }
  get isEntityAcceptable() {
    return this.props.isEntityAcceptable;
    }
  get isCredentialSentForVerification() {
    return this.props.isCredentialSentForVerification;
    }

  // NestedPath Field Getters
  get audit() {
      return this.props.audit ? new CredentialVerificationCaseV1Audit(this.props.audit, this.context) : undefined;
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
    newProps: CredentialVerificationCaseV1AffirmationsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1Affirmations {
      return new CredentialVerificationCaseV1Affirmations(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsNameAcceptable(value: boolean) {
    this.props.isNameAcceptable = value;
  }
  set IsTranslationAcceptable(value: boolean) {
    this.props.isTranslationAcceptable = value;
  }
  set IsCredentialAcceptable(value: boolean) {
    this.props.isCredentialAcceptable = value;
  }
  set IsCredentialDetailsAcceptable(value: boolean) {
    this.props.isCredentialDetailsAcceptable = value;
  }
  set IsDateOfBirthAcceptable(value: boolean) {
    this.props.isDateOfBirthAcceptable = value;
  }
  set IsEntityAcceptable(value: boolean) {
    this.props.isEntityAcceptable = value;
  }
  set IsCredentialSentForVerification(value: boolean) {
    this.props.isCredentialSentForVerification = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
