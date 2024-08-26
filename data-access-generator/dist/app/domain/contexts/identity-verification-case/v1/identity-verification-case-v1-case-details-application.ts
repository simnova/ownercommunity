export interface IdentityVerificationCaseV1CaseDetailsApplicationProps extends ValueObjectProps {
  // Primitive Fields
  attestedAt?: Date;
  caseWorkerModifiedPassportDetails?: boolean;

  // NestedPath Fields
  readonly photoAssets: IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps;
  readonly passportDetails: IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps;
  readonly passportAssets: IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps;
  readonly notarizationDetails: IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationProps, 'photoAssets' | 'passportDetails' | 'passportAssets' | 'notarizationDetails'>> {
  readonly photoAssets: IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsEntityReference;
  readonly passportDetails: IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsEntityReference;
  readonly passportAssets: IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsEntityReference;
  readonly notarizationDetails: IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsEntityReference;



}

export class IdentityVerificationCaseV1CaseDetailsApplication extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationProps> implements IdentityVerificationCaseV1CaseDetailsApplicationEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get attestedAt() {
    return this.props.attestedAt;
    }
  get caseWorkerModifiedPassportDetails() {
    return this.props.caseWorkerModifiedPassportDetails;
    }

  // NestedPath Field Getters
  get photoAssets() {
      return this.props.photoAssets ? new IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssets(this.props.photoAssets, this.context) : undefined;
    }
  get passportDetails() {
      return this.props.passportDetails ? new IdentityVerificationCaseV1CaseDetailsApplicationPassportDetails(this.props.passportDetails, this.context) : undefined;
    }
  get passportAssets() {
      return this.props.passportAssets ? new IdentityVerificationCaseV1CaseDetailsApplicationPassportAssets(this.props.passportAssets, this.context) : undefined;
    }
  get notarizationDetails() {
      return this.props.notarizationDetails ? new IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetails(this.props.notarizationDetails, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplication {
      return new IdentityVerificationCaseV1CaseDetailsApplication(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set AttestedAt(value: Date) {
    this.props.attestedAt = value;
  }
  set CaseWorkerModifiedPassportDetails(value: boolean) {
    this.props.caseWorkerModifiedPassportDetails = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
