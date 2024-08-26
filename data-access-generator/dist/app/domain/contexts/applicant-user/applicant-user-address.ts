export interface ApplicantUserAddressProps extends ValueObjectProps {
  // Primitive Fields
  streetAddressLine1?: string;
  streetAddressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserAddressEntityReference extends Readonly<ApplicantUserAddressProps>{



}

export class ApplicantUserAddress extends ValueObject<ApplicantUserAddressProps> implements ApplicantUserAddressEntityReference {
  constructor(props: ApplicantUserAddressProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get streetAddressLine1() {
    return this.props.streetAddressLine1;
    }
  get streetAddressLine2() {
    return this.props.streetAddressLine2;
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
    newProps: ApplicantUserAddressProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserAddress {
      return new ApplicantUserAddress(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set StreetAddressLine1(value: string) {
    this.props.streetAddressLine1 = value;
  }
  set StreetAddressLine2(value: string) {
    this.props.streetAddressLine2 = value;
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
