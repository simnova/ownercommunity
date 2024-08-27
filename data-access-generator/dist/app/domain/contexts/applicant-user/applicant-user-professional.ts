export interface ApplicantUserProfessionalProps extends ValueObjectProps {
  // Primitive Fields
  healthProfession?: string;
  citizenshipAtTimeEnteredMedicalInstitution?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly primaryEducationalInformation: PropArray<ApplicantUserPrimaryEducationalInformationProps>;

}

export interface ApplicantUserProfessionalEntityReference extends Readonly<Omit<ApplicantUserProfessionalProps, 'primaryEducationalInformation'>> {


  readonly primaryEducationalInformation: ReadonlyArray<ApplicantUserPrimaryEducationalInformationEntityReference>;

}

export class ApplicantUserProfessional extends ValueObject<ApplicantUserProfessionalProps> implements ApplicantUserProfessionalEntityReference {
  constructor(props: ApplicantUserProfessionalProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get healthProfession() {
    return this.props.healthProfession;
    }
  get citizenshipAtTimeEnteredMedicalInstitution() {
    return this.props.citizenshipAtTimeEnteredMedicalInstitution;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get primaryEducationalInformation(): ReadonlyArray<ApplicantUserPrimaryEducationalInformation> {
    return this.props.primaryEducationalInformation.items.map((item) => new ApplicantUserPrimaryEducationalInformation(item, this.context
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
    newProps: ApplicantUserProfessionalProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserProfessional {
      return new ApplicantUserProfessional(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set HealthProfession(value: string) {
    this.props.healthProfession = value;
  }
  set CitizenshipAtTimeEnteredMedicalInstitution(value: string) {
    this.props.citizenshipAtTimeEnteredMedicalInstitution = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
