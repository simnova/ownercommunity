export interface EntityIssuingInstitutionProps extends ValueObjectProps {
  // Primitive Fields
  email: string;
  phoneNumber: string;

  // NestedPath Fields
  readonly address: EntityAddressInfoProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface EntityIssuingInstitutionEntityReference extends Readonly<Omit<EntityIssuingInstitutionProps, 'address'>> {
  readonly address: EntityAddressInfoEntityReference;



}

export class EntityIssuingInstitution extends ValueObject<EntityIssuingInstitutionProps> implements EntityIssuingInstitutionEntityReference {
  constructor(props: EntityIssuingInstitutionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get email() {
    return this.props.email;
    }
  get phoneNumber() {
    return this.props.phoneNumber;
    }

  // NestedPath Field Getters
  get address() {
      return new EntityAddressInfo(this.props.address, this.context
      //, this.visa
      );
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
    newProps: EntityIssuingInstitutionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): EntityIssuingInstitution {
      return new EntityIssuingInstitution(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Email(value: string) {
    this.props.email = value;
  }
  set PhoneNumber(value: string) {
    this.props.phoneNumber = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
