export interface ApplicantUserPhoneProps extends DomainEntityProps {
  // Primitive Fields
  phoneNumber?: string;
  phoneType?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserPhoneEntityReference extends Readonly<ApplicantUserPhoneProps>{



}

export class ApplicantUserPhone extends DomainEntity<ApplicantUserPhoneProps> implements ApplicantUserPhoneEntityReference {
  constructor(props: ApplicantUserPhoneProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get phoneNumber() {
    return this.props.phoneNumber;
    }
  get phoneType() {
    return this.props.phoneType;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnApplicantUserPhones && permissions.isEditingOwnApplicantUserPhone)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set PhoneNumber(value: string) {
    this.props.phoneNumber = value;
  }
  set PhoneType(value: string) {
    this.props.phoneType = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
