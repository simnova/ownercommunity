export interface EntityClientProps extends ValueObjectProps {
  // Primitive Fields
  email?: string;
  phoneNumber?: string;

  // NestedPath Fields
  readonly address: EntityAddressInfoProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface EntityClientEntityReference extends Readonly<Omit<EntityClientProps, 'address'>> {
  readonly address: EntityAddressInfoEntityReference;



}

export class EntityClient extends ValueObject<EntityClientProps> implements EntityClientEntityReference {
  constructor(props: EntityClientProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
      return this.props.address ? new EntityAddressInfo(this.props.address, this.context) : undefined;
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
    newProps: EntityClientProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): EntityClient {
      return new EntityClient(newProps, context
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
