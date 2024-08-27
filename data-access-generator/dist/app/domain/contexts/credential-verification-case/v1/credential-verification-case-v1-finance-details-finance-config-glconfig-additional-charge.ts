export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps extends DomainEntityProps {
  // Primitive Fields
  type: string;
  debitGlAccount: string;
  creditGlAccount: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeEntityReference extends Readonly<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps>{



}

export class CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge extends DomainEntity<CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps> implements CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalChargeProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get type() {
    return this.props.type;
    }
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnCredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharges && permissions.isEditingOwnCredentialVerificationCaseV1FinanceDetailsFinanceConfigGLConfigAdditionalCharge)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set Type(value: string) {
    this.props.type = value;
  }
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
