export interface IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps extends ValueObjectProps {
  // Primitive Fields
  photo?: string;
  photoUploadedAt?: Date;
  photoVersion?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsEntityReference extends Readonly<IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps>{



}

export class IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssets extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get photo() {
    return this.props.photo;
    }
  get photoUploadedAt() {
    return this.props.photoUploadedAt;
    }
  get photoVersion() {
    return this.props.photoVersion;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssets {
      return new IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssets(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Photo(value: string) {
    this.props.photo = value;
  }
  set PhotoUploadedAt(value: Date) {
    this.props.photoUploadedAt = value;
  }
  set PhotoVersion(value: string) {
    this.props.photoVersion = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
