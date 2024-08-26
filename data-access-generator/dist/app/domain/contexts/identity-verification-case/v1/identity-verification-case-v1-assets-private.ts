export interface IdentityVerificationCaseV1AssetsPrivateProps extends ValueObjectProps {
  // Primitive Fields
  redactedNotarizedIdForm?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly redactedNotarizedIdFormHistory: PropArray<IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistoryProps>;

}

export interface IdentityVerificationCaseV1AssetsPrivateEntityReference extends Readonly<Omit<IdentityVerificationCaseV1AssetsPrivateProps, 'redactedNotarizedIdFormHistory'>> {


  readonly redactedNotarizedIdFormHistory: ReadonlyArray<IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistoryEntityReference>;

}

export class IdentityVerificationCaseV1AssetsPrivate extends ValueObject<IdentityVerificationCaseV1AssetsPrivateProps> implements IdentityVerificationCaseV1AssetsPrivateEntityReference {
  constructor(props: IdentityVerificationCaseV1AssetsPrivateProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get redactedNotarizedIdForm() {
    return this.props.redactedNotarizedIdForm;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get redactedNotarizedIdFormHistory(): ReadonlyArray<IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistory> {
    return this.props.redactedNotarizedIdFormHistory.items.map((item) => new IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistory(item, this.context
    //, this.visa
    ));
  }


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: IdentityVerificationCaseV1AssetsPrivateProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1AssetsPrivate {
      return new IdentityVerificationCaseV1AssetsPrivate(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set RedactedNotarizedIdForm(value: string) {
    this.props.redactedNotarizedIdForm = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
