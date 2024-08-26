export interface CredentialVerificationCaseV1ApplicationProps extends ValueObjectProps {
  // Primitive Fields
  attestedAt?: Date;
  credentialTitle?: string;
  program?: string;
  nameOnCredential?: string;
  dateCredentialIssued?: Date;
  credentialType?: string;
  isCredentialInEnglish?: boolean;

  // NestedPath Fields
  readonly otherIssuingInstitution: CredentialVerificationCaseV1OtherIssuingInstitutionProps;
  readonly credentialAssets: CredentialVerificationCaseV1CredentialAssetsProps;

  // PopulateDoc Fields
  readonly issuingInstitution: EntityProps;
  setIssuingInstitutionRef(issuingInstitution: EntityEntityReference): void;
  readonly sendDestination: EntityProps;
  setSendDestinationRef(sendDestination: EntityEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1ApplicationEntityReference extends Readonly<Omit<CredentialVerificationCaseV1ApplicationProps, 'issuingInstitution' | 'setIssuingInstitutionRef' | 'otherIssuingInstitution' | 'credentialAssets' | 'sendDestination' | 'setSendDestinationRef'>> {
  readonly otherIssuingInstitution: CredentialVerificationCaseV1OtherIssuingInstitutionEntityReference;
  readonly credentialAssets: CredentialVerificationCaseV1CredentialAssetsEntityReference;

  readonly issuingInstitution: EntityEntityReference;
  readonly sendDestination: EntityEntityReference;


}

export class CredentialVerificationCaseV1Application extends ValueObject<CredentialVerificationCaseV1ApplicationProps> implements CredentialVerificationCaseV1ApplicationEntityReference {
  constructor(props: CredentialVerificationCaseV1ApplicationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get attestedAt() {
    return this.props.attestedAt;
    }
  get credentialTitle() {
    return this.props.credentialTitle;
    }
  get program() {
    return this.props.program;
    }
  get nameOnCredential() {
    return this.props.nameOnCredential;
    }
  get dateCredentialIssued() {
    return this.props.dateCredentialIssued;
    }
  get credentialType() {
    return this.props.credentialType;
    }
  get isCredentialInEnglish() {
    return this.props.isCredentialInEnglish;
    }

  // NestedPath Field Getters
  get otherIssuingInstitution() {
      return this.props.otherIssuingInstitution ? new CredentialVerificationCaseV1OtherIssuingInstitution(this.props.otherIssuingInstitution, this.context) : undefined;
    }
  get credentialAssets() {
      return this.props.credentialAssets ? new CredentialVerificationCaseV1CredentialAssets(this.props.credentialAssets, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get issuingInstitution(): EntityEntityReference {
          return this.props.issuingInstitution ? new Entity(this.props.issuingInstitution, this.context) : undefined;
        }
  get sendDestination(): EntityEntityReference {
          return this.props.sendDestination ? new Entity(this.props.sendDestination, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1ApplicationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1Application {
      return new CredentialVerificationCaseV1Application(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set AttestedAt(value: Date) {
    this.props.attestedAt = value;
  }
  set CredentialTitle(value: string) {
    this.props.credentialTitle = value;
  }
  set Program(value: string) {
    this.props.program = value;
  }
  set NameOnCredential(value: string) {
    this.props.nameOnCredential = value;
  }
  set DateCredentialIssued(value: Date) {
    this.props.dateCredentialIssued = value;
  }
  set CredentialType(value: string) {
    this.props.credentialType = value;
  }
  set IsCredentialInEnglish(value: boolean) {
    this.props.isCredentialInEnglish = value;
  }

  // PopulatedDoc Field Setters
  set IssuingInstitution(issuingInstitution: EntityEntityReference) {
    this.props.setIssuingInstitutionRef(issuingInstitution);
  }
  set SendDestination(sendDestination: EntityEntityReference) {
    this.props.setSendDestinationRef(sendDestination);
  }

//DocumentArrayFieldSetters: added as needed
}
