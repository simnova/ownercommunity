export interface CredentialVerificationCaseV1AssetsProps extends ValueObjectProps {
  // Primitive Fields
  arbitrary?: string;

  // NestedPath Fields
  readonly private: CredentialVerificationCaseV1AssetsPrivateProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1AssetsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1AssetsProps, 'private'>> {
  readonly private: CredentialVerificationCaseV1AssetsPrivateEntityReference;



}

export class CredentialVerificationCaseV1Assets extends ValueObject<CredentialVerificationCaseV1AssetsProps> implements CredentialVerificationCaseV1AssetsEntityReference {
  constructor(props: CredentialVerificationCaseV1AssetsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get arbitrary() {
    return this.props.arbitrary;
    }

  // NestedPath Field Getters
  get private() {
      return this.props.private ? new CredentialVerificationCaseV1AssetsPrivate(this.props.private, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1AssetsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1Assets {
      return new CredentialVerificationCaseV1Assets(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Arbitrary(value: string) {
    this.props.arbitrary = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
