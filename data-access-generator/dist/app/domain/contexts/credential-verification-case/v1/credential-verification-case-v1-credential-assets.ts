export interface CredentialVerificationCaseV1CredentialAssetsProps extends ValueObjectProps {
  // Primitive Fields
  credential?: string;
  credentialUploadedAt?: Date;
  credentialVersion?: string;
  translation?: string;
  translationUploadedAt?: Date;
  translationVersion?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1CredentialAssetsEntityReference extends Readonly<CredentialVerificationCaseV1CredentialAssetsProps>{



}

export class CredentialVerificationCaseV1CredentialAssets extends ValueObject<CredentialVerificationCaseV1CredentialAssetsProps> implements CredentialVerificationCaseV1CredentialAssetsEntityReference {
  constructor(props: CredentialVerificationCaseV1CredentialAssetsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get credential() {
    return this.props.credential;
    }
  get credentialUploadedAt() {
    return this.props.credentialUploadedAt;
    }
  get credentialVersion() {
    return this.props.credentialVersion;
    }
  get translation() {
    return this.props.translation;
    }
  get translationUploadedAt() {
    return this.props.translationUploadedAt;
    }
  get translationVersion() {
    return this.props.translationVersion;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1CredentialAssetsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1CredentialAssets {
      return new CredentialVerificationCaseV1CredentialAssets(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Credential(value: string) {
    this.props.credential = value;
  }
  set CredentialUploadedAt(value: Date) {
    this.props.credentialUploadedAt = value;
  }
  set CredentialVersion(value: string) {
    this.props.credentialVersion = value;
  }
  set Translation(value: string) {
    this.props.translation = value;
  }
  set TranslationUploadedAt(value: Date) {
    this.props.translationUploadedAt = value;
  }
  set TranslationVersion(value: string) {
    this.props.translationVersion = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
