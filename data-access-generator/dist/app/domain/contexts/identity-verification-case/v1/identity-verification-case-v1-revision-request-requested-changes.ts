export interface IdentityVerificationCaseV1RevisionRequestRequestedChangesProps extends ValueObjectProps {
  // Primitive Fields
  requestUpdatedPassportDetails: boolean;
  requestUploadPassport: boolean;
  requestUploadExpirationPage: boolean;
  requestUploadPassportTranslation: boolean;
  requestUploadPhoto: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1RevisionRequestRequestedChangesEntityReference extends Readonly<IdentityVerificationCaseV1RevisionRequestRequestedChangesProps>{



}

export class IdentityVerificationCaseV1RevisionRequestRequestedChanges extends ValueObject<IdentityVerificationCaseV1RevisionRequestRequestedChangesProps> implements IdentityVerificationCaseV1RevisionRequestRequestedChangesEntityReference {
  constructor(props: IdentityVerificationCaseV1RevisionRequestRequestedChangesProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get requestUpdatedPassportDetails() {
    return this.props.requestUpdatedPassportDetails;
    }
  get requestUploadPassport() {
    return this.props.requestUploadPassport;
    }
  get requestUploadExpirationPage() {
    return this.props.requestUploadExpirationPage;
    }
  get requestUploadPassportTranslation() {
    return this.props.requestUploadPassportTranslation;
    }
  get requestUploadPhoto() {
    return this.props.requestUploadPhoto;
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
    newProps: IdentityVerificationCaseV1RevisionRequestRequestedChangesProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1RevisionRequestRequestedChanges {
      return new IdentityVerificationCaseV1RevisionRequestRequestedChanges(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set RequestUpdatedPassportDetails(value: boolean) {
    this.props.requestUpdatedPassportDetails = value;
  }
  set RequestUploadPassport(value: boolean) {
    this.props.requestUploadPassport = value;
  }
  set RequestUploadExpirationPage(value: boolean) {
    this.props.requestUploadExpirationPage = value;
  }
  set RequestUploadPassportTranslation(value: boolean) {
    this.props.requestUploadPassportTranslation = value;
  }
  set RequestUploadPhoto(value: boolean) {
    this.props.requestUploadPhoto = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
