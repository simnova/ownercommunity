export interface ApplicantUserPersonalInformationProps extends ValueObjectProps {
  // Primitive Fields
  applyingTo?: string[];

  // NestedPath Fields
  readonly identityDetails: ApplicantUserIdentityDetailsProps;
  readonly contactInformation: ApplicantUserContactInformationProps;
  readonly citizenship: ApplicantUserCitizenshipProps;
  readonly professional: ApplicantUserProfessionalProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly nameOnDocumentAssets: PropArray<ApplicantUserNameOnDocumentAssetProps>;

}

export interface ApplicantUserPersonalInformationEntityReference extends Readonly<Omit<ApplicantUserPersonalInformationProps, 'identityDetails' | 'nameOnDocumentAssets' | 'contactInformation' | 'citizenship' | 'professional'>> {
  readonly identityDetails: ApplicantUserIdentityDetailsEntityReference;
  readonly contactInformation: ApplicantUserContactInformationEntityReference;
  readonly citizenship: ApplicantUserCitizenshipEntityReference;
  readonly professional: ApplicantUserProfessionalEntityReference;


  readonly nameOnDocumentAssets: ReadonlyArray<ApplicantUserNameOnDocumentAssetEntityReference>;

}

export class ApplicantUserPersonalInformation extends ValueObject<ApplicantUserPersonalInformationProps> implements ApplicantUserPersonalInformationEntityReference {
  constructor(props: ApplicantUserPersonalInformationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get applyingTo() {
    return this.props.applyingTo;
    }

  // NestedPath Field Getters
  get identityDetails() {
      return this.props.identityDetails ? new ApplicantUserIdentityDetails(this.props.identityDetails, this.context) : undefined;
    }
  get contactInformation() {
      return this.props.contactInformation ? new ApplicantUserContactInformation(this.props.contactInformation, this.context) : undefined;
    }
  get citizenship() {
      return this.props.citizenship ? new ApplicantUserCitizenship(this.props.citizenship, this.context) : undefined;
    }
  get professional() {
      return this.props.professional ? new ApplicantUserProfessional(this.props.professional, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get nameOnDocumentAssets(): ReadonlyArray<ApplicantUserNameOnDocumentAsset> {
    return this.props.nameOnDocumentAssets.items.map((item) => new ApplicantUserNameOnDocumentAsset(item, this.context
    //, this.visa
    ));
  }


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: ApplicantUserPersonalInformationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserPersonalInformation {
      return new ApplicantUserPersonalInformation(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set ApplyingTo(value: string[]) {
    this.props.applyingTo = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
