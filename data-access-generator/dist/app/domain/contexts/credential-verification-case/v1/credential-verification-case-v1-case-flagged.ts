export interface CredentialVerificationCaseV1CaseFlaggedProps extends DomainEntityProps {
  // Primitive Fields
  flagType?: string;
  reason?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1CaseFlaggedEntityReference extends Readonly<CredentialVerificationCaseV1CaseFlaggedProps>{



}

export class CredentialVerificationCaseV1CaseFlagged extends DomainEntity<CredentialVerificationCaseV1CaseFlaggedProps> implements CredentialVerificationCaseV1CaseFlaggedEntityReference {
  constructor(props: CredentialVerificationCaseV1CaseFlaggedProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
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
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnCredentialVerificationCaseV1CaseFlaggeds && permissions.isEditingOwnCredentialVerificationCaseV1CaseFlagged)
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
