export interface EntityAddressInfoProps extends ValueObjectProps {
  // Primitive Fields
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface EntityAddressInfoEntityReference extends Readonly<EntityAddressInfoProps>{



}

export class EntityAddressInfo extends ValueObject<EntityAddressInfoProps> implements EntityAddressInfoEntityReference {
  constructor(props: EntityAddressInfoProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get addressLine1() {
    return this.props.addressLine1;
    }
  get addressLine2() {
    return this.props.addressLine2;
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
    newProps: EntityAddressInfoProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): EntityAddressInfo {
      return new EntityAddressInfo(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set AddressLine1(value: string) {
    this.props.addressLine1 = value;
  }
  set AddressLine2(value: string) {
    this.props.addressLine2 = value;
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
