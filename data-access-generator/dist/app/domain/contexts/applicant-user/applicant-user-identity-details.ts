export interface ApplicantUserIdentityDetailsProps extends ValueObjectProps {
  // Primitive Fields
  lastName?: string;
  legalNameConsistsOfOneName?: boolean;
  restOfName?: string;
  generationalSuffix?: string;
  gender?: string;
  dateOfBirth?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserIdentityDetailsEntityReference extends Readonly<ApplicantUserIdentityDetailsProps>{



}

export class ApplicantUserIdentityDetails extends ValueObject<ApplicantUserIdentityDetailsProps> implements ApplicantUserIdentityDetailsEntityReference {
  constructor(props: ApplicantUserIdentityDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get lastName() {
    return this.props.lastName;
    }
  get legalNameConsistsOfOneName() {
    return this.props.legalNameConsistsOfOneName;
    }
  get restOfName() {
    return this.props.restOfName;
    }
  get generationalSuffix() {
    return this.props.generationalSuffix;
    }
  get gender() {
    return this.props.gender;
    }
  get dateOfBirth() {
    return this.props.dateOfBirth;
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
    newProps: ApplicantUserIdentityDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserIdentityDetails {
      return new ApplicantUserIdentityDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set LastName(value: string) {
    this.props.lastName = value;
  }
  set LegalNameConsistsOfOneName(value: boolean) {
    this.props.legalNameConsistsOfOneName = value;
  }
  set RestOfName(value: string) {
    this.props.restOfName = value;
  }
  set GenerationalSuffix(value: string) {
    this.props.generationalSuffix = value;
  }
  set Gender(value: string) {
    this.props.gender = value;
  }
  set DateOfBirth(value: Date) {
    this.props.dateOfBirth = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
