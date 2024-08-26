export interface CredentialVerificationCaseV1SearchProps extends ValueObjectProps {
  // Primitive Fields
  hash: string;
  indexedAt: Date;
  indexingFailedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1SearchEntityReference extends Readonly<CredentialVerificationCaseV1SearchProps>{



}

export class CredentialVerificationCaseV1Search extends ValueObject<CredentialVerificationCaseV1SearchProps> implements CredentialVerificationCaseV1SearchEntityReference {
  constructor(props: CredentialVerificationCaseV1SearchProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get hash() {
    return this.props.hash;
    }
  get indexedAt() {
    return this.props.indexedAt;
    }
  get indexingFailedAt() {
    return this.props.indexingFailedAt;
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
    newProps: CredentialVerificationCaseV1SearchProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1Search {
      return new CredentialVerificationCaseV1Search(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Hash(value: string) {
    this.props.hash = value;
  }
  set IndexedAt(value: Date) {
    this.props.indexedAt = value;
  }
  set IndexingFailedAt(value: Date) {
    this.props.indexingFailedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
