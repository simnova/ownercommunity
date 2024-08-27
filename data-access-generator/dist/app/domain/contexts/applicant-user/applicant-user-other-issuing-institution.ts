export interface ApplicantUserOtherIssuingInstitutionProps extends ValueObjectProps {
  // Primitive Fields
  name?: string;
  addressLine1?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserOtherIssuingInstitutionEntityReference extends Readonly<ApplicantUserOtherIssuingInstitutionProps>{



}

export class ApplicantUserOtherIssuingInstitution extends ValueObject<ApplicantUserOtherIssuingInstitutionProps> implements ApplicantUserOtherIssuingInstitutionEntityReference {
  constructor(props: ApplicantUserOtherIssuingInstitutionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get name() {
    return this.props.name;
    }
  get addressLine1() {
    return this.props.addressLine1;
    }
  get city() {
    return this.props.city;
    }
  get stateOrProvince() {
    return this.props.stateOrProvince;
    }
  get zipOrPostalCode() {
    return this.props.zipOrPostalCode;
    }
  get country() {
    return this.props.country;
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
    newProps: ApplicantUserOtherIssuingInstitutionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserOtherIssuingInstitution {
      return new ApplicantUserOtherIssuingInstitution(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Name(value: string) {
    this.props.name = value;
  }
  set AddressLine1(value: string) {
    this.props.addressLine1 = value;
  }
  set City(value: string) {
    this.props.city = value;
  }
  set StateOrProvince(value: string) {
    this.props.stateOrProvince = value;
  }
  set ZipOrPostalCode(value: string) {
    this.props.zipOrPostalCode = value;
  }
  set Country(value: string) {
    this.props.country = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
