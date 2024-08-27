export interface IdentityVerificationCaseV1CaseFlaggedProps extends DomainEntityProps {
  // Primitive Fields
  flagType: string;
  reason: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseFlaggedEntityReference extends Readonly<IdentityVerificationCaseV1CaseFlaggedProps>{



}

export class IdentityVerificationCaseV1CaseFlagged extends DomainEntity<IdentityVerificationCaseV1CaseFlaggedProps> implements IdentityVerificationCaseV1CaseFlaggedEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseFlaggedProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get flagType() {
    return this.props.flagType;
    }
  get reason() {
    return this.props.reason;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnIdentityVerificationCaseV1CaseFlaggeds && permissions.isEditingOwnIdentityVerificationCaseV1CaseFlagged)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set FlagType(value: string) {
    this.props.flagType = value;
  }
  set Reason(value: string) {
    this.props.reason = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
