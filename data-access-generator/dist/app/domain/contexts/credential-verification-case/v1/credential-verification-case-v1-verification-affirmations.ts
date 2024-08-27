export interface CredentialVerificationCaseV1VerificationAffirmationsProps extends ValueObjectProps {
  // Primitive Fields
  isReturnedFromCorrectEntity?: boolean;
  isVerificationMethodAcceptable?: boolean;
  isVerificationComplete?: boolean;
  isVerificationInEnglishOrWithTranslation?: boolean;
  isEntityDetailCorrect?: boolean;
  isCredentialReturnedFromEntity?: boolean;
  isVerificationStatusComplete?: boolean;
  isVerificationComponentPacketCompiled?: boolean;

  // NestedPath Fields
  readonly audit: CredentialVerificationCaseV1AuditProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1VerificationAffirmationsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1VerificationAffirmationsProps, 'audit'>> {
  readonly audit: CredentialVerificationCaseV1AuditEntityReference;



}

export class CredentialVerificationCaseV1VerificationAffirmations extends ValueObject<CredentialVerificationCaseV1VerificationAffirmationsProps> implements CredentialVerificationCaseV1VerificationAffirmationsEntityReference {
  constructor(props: CredentialVerificationCaseV1VerificationAffirmationsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isReturnedFromCorrectEntity() {
    return this.props.isReturnedFromCorrectEntity;
    }
  get isVerificationMethodAcceptable() {
    return this.props.isVerificationMethodAcceptable;
    }
  get isVerificationComplete() {
    return this.props.isVerificationComplete;
    }
  get isVerificationInEnglishOrWithTranslation() {
    return this.props.isVerificationInEnglishOrWithTranslation;
    }
  get isEntityDetailCorrect() {
    return this.props.isEntityDetailCorrect;
    }
  get isCredentialReturnedFromEntity() {
    return this.props.isCredentialReturnedFromEntity;
    }
  get isVerificationStatusComplete() {
    return this.props.isVerificationStatusComplete;
    }
  get isVerificationComponentPacketCompiled() {
    return this.props.isVerificationComponentPacketCompiled;
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
    newProps: CredentialVerificationCaseV1VerificationAffirmationsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1VerificationAffirmations {
      return new CredentialVerificationCaseV1VerificationAffirmations(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsReturnedFromCorrectEntity(value: boolean) {
    this.props.isReturnedFromCorrectEntity = value;
  }
  set IsVerificationMethodAcceptable(value: boolean) {
    this.props.isVerificationMethodAcceptable = value;
  }
  set IsVerificationComplete(value: boolean) {
    this.props.isVerificationComplete = value;
  }
  set IsVerificationInEnglishOrWithTranslation(value: boolean) {
    this.props.isVerificationInEnglishOrWithTranslation = value;
  }
  set IsEntityDetailCorrect(value: boolean) {
    this.props.isEntityDetailCorrect = value;
  }
  set IsCredentialReturnedFromEntity(value: boolean) {
    this.props.isCredentialReturnedFromEntity = value;
  }
  set IsVerificationStatusComplete(value: boolean) {
    this.props.isVerificationStatusComplete = value;
  }
  set IsVerificationComponentPacketCompiled(value: boolean) {
    this.props.isVerificationComponentPacketCompiled = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
