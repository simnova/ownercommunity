export interface ApplicantUserCitizenshipProps extends ValueObjectProps {
  // Primitive Fields
  currentCitizenOf?: string[];

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserCitizenshipEntityReference extends Readonly<ApplicantUserCitizenshipProps>{



}

export class ApplicantUserCitizenship extends ValueObject<ApplicantUserCitizenshipProps> implements ApplicantUserCitizenshipEntityReference {
  constructor(props: ApplicantUserCitizenshipProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get currentCitizenOf() {
    return this.props.currentCitizenOf;
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
    newProps: ApplicantUserCitizenshipProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserCitizenship {
      return new ApplicantUserCitizenship(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CurrentCitizenOf(value: string[]) {
    this.props.currentCitizenOf = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
