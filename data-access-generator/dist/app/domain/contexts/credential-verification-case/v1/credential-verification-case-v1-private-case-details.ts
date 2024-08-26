export interface CredentialVerificationCaseV1PrivateCaseDetailsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly institutionContactDetails: CredentialVerificationCaseV1InstitutionContactDetailsProps;
  readonly alternateVerifyingEntity: CredentialVerificationCaseV1AlternateVerifyingEntityProps;
  readonly verificationStatus: CredentialVerificationCaseV1VerificationStatusProps;
  readonly entitySuppliedCredential: CredentialVerificationCaseV1EntitySuppliedCredentialProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1PrivateCaseDetailsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1PrivateCaseDetailsProps, 'institutionContactDetails' | 'alternateVerifyingEntity' | 'verificationStatus' | 'entitySuppliedCredential'>> {
  readonly institutionContactDetails: CredentialVerificationCaseV1InstitutionContactDetailsEntityReference;
  readonly alternateVerifyingEntity: CredentialVerificationCaseV1AlternateVerifyingEntityEntityReference;
  readonly verificationStatus: CredentialVerificationCaseV1VerificationStatusEntityReference;
  readonly entitySuppliedCredential: CredentialVerificationCaseV1EntitySuppliedCredentialEntityReference;



}

export class CredentialVerificationCaseV1PrivateCaseDetails extends ValueObject<CredentialVerificationCaseV1PrivateCaseDetailsProps> implements CredentialVerificationCaseV1PrivateCaseDetailsEntityReference {
  constructor(props: CredentialVerificationCaseV1PrivateCaseDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get institutionContactDetails() {
      return this.props.institutionContactDetails ? new CredentialVerificationCaseV1InstitutionContactDetails(this.props.institutionContactDetails, this.context) : undefined;
    }
  get alternateVerifyingEntity() {
      return this.props.alternateVerifyingEntity ? new CredentialVerificationCaseV1AlternateVerifyingEntity(this.props.alternateVerifyingEntity, this.context) : undefined;
    }
  get verificationStatus() {
      return this.props.verificationStatus ? new CredentialVerificationCaseV1VerificationStatus(this.props.verificationStatus, this.context) : undefined;
    }
  get entitySuppliedCredential() {
      return this.props.entitySuppliedCredential ? new CredentialVerificationCaseV1EntitySuppliedCredential(this.props.entitySuppliedCredential, this.context) : undefined;
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
    newProps: CredentialVerificationCaseV1PrivateCaseDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1PrivateCaseDetails {
      return new CredentialVerificationCaseV1PrivateCaseDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
