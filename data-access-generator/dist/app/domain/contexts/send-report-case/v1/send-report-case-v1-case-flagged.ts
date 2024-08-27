export interface SendReportCaseV1CaseFlaggedProps extends DomainEntityProps {
  // Primitive Fields
  flagType?: string;
  reason: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseFlaggedEntityReference extends Readonly<SendReportCaseV1CaseFlaggedProps>{



}

export class SendReportCaseV1CaseFlagged extends DomainEntity<SendReportCaseV1CaseFlaggedProps> implements SendReportCaseV1CaseFlaggedEntityReference {
  constructor(props: SendReportCaseV1CaseFlaggedProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
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
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnSendReportCaseV1CaseFlaggeds && permissions.isEditingOwnSendReportCaseV1CaseFlagged)
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
