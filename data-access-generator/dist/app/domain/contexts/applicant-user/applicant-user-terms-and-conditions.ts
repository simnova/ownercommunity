export interface ApplicantUserTermsAndConditionsProps extends DomainEntityProps {
  // Primitive Fields
  acceptanceOf?: string;
  version: number;
  attestedOn?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserTermsAndConditionsEntityReference extends Readonly<ApplicantUserTermsAndConditionsProps>{



}

export class ApplicantUserTermsAndConditions extends DomainEntity<ApplicantUserTermsAndConditionsProps> implements ApplicantUserTermsAndConditionsEntityReference {
  constructor(props: ApplicantUserTermsAndConditionsProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get acceptanceOf() {
    return this.props.acceptanceOf;
    }
  get version() {
    return this.props.version;
    }
  get attestedOn() {
    return this.props.attestedOn;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnApplicantUserTermsAndConditionss && permissions.isEditingOwnApplicantUserTermsAndConditions)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set AcceptanceOf(value: string) {
    this.props.acceptanceOf = value;
  }
  set Version(value: number) {
    this.props.version = value;
  }
  set AttestedOn(value: Date) {
    this.props.attestedOn = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
