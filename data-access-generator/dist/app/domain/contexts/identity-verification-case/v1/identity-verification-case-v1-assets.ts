export interface IdentityVerificationCaseV1AssetsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly shared: IdentityVerificationCaseV1AssetsSharedProps;
  readonly private: IdentityVerificationCaseV1AssetsPrivateProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1AssetsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1AssetsProps, 'shared' | 'private'>> {
  readonly shared: IdentityVerificationCaseV1AssetsSharedEntityReference;
  readonly private: IdentityVerificationCaseV1AssetsPrivateEntityReference;



}

export class IdentityVerificationCaseV1Assets extends ValueObject<IdentityVerificationCaseV1AssetsProps> implements IdentityVerificationCaseV1AssetsEntityReference {
  constructor(props: IdentityVerificationCaseV1AssetsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get shared() {
      return this.props.shared ? new IdentityVerificationCaseV1AssetsShared(this.props.shared, this.context) : undefined;
    }
  get private() {
      return this.props.private ? new IdentityVerificationCaseV1AssetsPrivate(this.props.private, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1AssetsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1Assets {
      return new IdentityVerificationCaseV1Assets(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
