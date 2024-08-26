export interface ApplicantUserContactInformationProps extends ValueObjectProps {
  // Primitive Fields
  emailAddress?: string;
  primaryPhone?: string;

  // NestedPath Fields
  readonly address: ApplicantUserAddressProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly phone: PropArray<ApplicantUserPhoneProps>;

}

export interface ApplicantUserContactInformationEntityReference extends Readonly<Omit<ApplicantUserContactInformationProps, 'phone' | 'address'>> {
  readonly address: ApplicantUserAddressEntityReference;


  readonly phone: ReadonlyArray<ApplicantUserPhoneEntityReference>;

}

export class ApplicantUserContactInformation extends ValueObject<ApplicantUserContactInformationProps> implements ApplicantUserContactInformationEntityReference {
  constructor(props: ApplicantUserContactInformationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get emailAddress() {
    return this.props.emailAddress;
    }
  get primaryPhone() {
    return this.props.primaryPhone;
    }

  // NestedPath Field Getters
  get address() {
      return this.props.address ? new ApplicantUserAddress(this.props.address, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get phone(): ReadonlyArray<ApplicantUserPhone> {
    return this.props.phone.items.map((item) => new ApplicantUserPhone(item, this.context
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
    newProps: ApplicantUserContactInformationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserContactInformation {
      return new ApplicantUserContactInformation(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set EmailAddress(value: string) {
    this.props.emailAddress = value;
  }
  set PrimaryPhone(value: string) {
    this.props.primaryPhone = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
