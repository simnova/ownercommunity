export interface CredentialVerificationCaseV1AlternateVerifyingEntityProps extends ValueObjectProps {
  // Primitive Fields
  isVerifiedWithOther?: boolean;
  otherDetails?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1AlternateVerifyingEntityEntityReference extends Readonly<CredentialVerificationCaseV1AlternateVerifyingEntityProps>{



}

export class CredentialVerificationCaseV1AlternateVerifyingEntity extends ValueObject<CredentialVerificationCaseV1AlternateVerifyingEntityProps> implements CredentialVerificationCaseV1AlternateVerifyingEntityEntityReference {
  constructor(props: CredentialVerificationCaseV1AlternateVerifyingEntityProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isVerifiedWithOther() {
    return this.props.isVerifiedWithOther;
    }
  get otherDetails() {
    return this.props.otherDetails;
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
    newProps: CredentialVerificationCaseV1AlternateVerifyingEntityProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1AlternateVerifyingEntity {
      return new CredentialVerificationCaseV1AlternateVerifyingEntity(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsVerifiedWithOther(value: boolean) {
    this.props.isVerifiedWithOther = value;
  }
  set OtherDetails(value: string) {
    this.props.otherDetails = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
