export interface CredentialVerificationCaseV1RequestedChangesProps extends ValueObjectProps {
  // Primitive Fields
  requestUpdatedCredentialDetails?: boolean;
  requestUploadCredential?: boolean;
  requestUploadTranslation?: boolean;
  requestUpdatedIssuingInstitution?: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1RequestedChangesEntityReference extends Readonly<CredentialVerificationCaseV1RequestedChangesProps>{



}

export class CredentialVerificationCaseV1RequestedChanges extends ValueObject<CredentialVerificationCaseV1RequestedChangesProps> implements CredentialVerificationCaseV1RequestedChangesEntityReference {
  constructor(props: CredentialVerificationCaseV1RequestedChangesProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get requestUpdatedCredentialDetails() {
    return this.props.requestUpdatedCredentialDetails;
    }
  get requestUploadCredential() {
    return this.props.requestUploadCredential;
    }
  get requestUploadTranslation() {
    return this.props.requestUploadTranslation;
    }
  get requestUpdatedIssuingInstitution() {
    return this.props.requestUpdatedIssuingInstitution;
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
    newProps: CredentialVerificationCaseV1RequestedChangesProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1RequestedChanges {
      return new CredentialVerificationCaseV1RequestedChanges(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set RequestUpdatedCredentialDetails(value: boolean) {
    this.props.requestUpdatedCredentialDetails = value;
  }
  set RequestUploadCredential(value: boolean) {
    this.props.requestUploadCredential = value;
  }
  set RequestUploadTranslation(value: boolean) {
    this.props.requestUploadTranslation = value;
  }
  set RequestUpdatedIssuingInstitution(value: boolean) {
    this.props.requestUpdatedIssuingInstitution = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
