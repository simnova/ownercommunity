export interface IdentityVerificationCaseV1AssetsSharedProps extends ValueObjectProps {
  // Primitive Fields
  idForm?: string;
  notarizedIdForm?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly idFormHistory: PropArray<IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps>;
  readonly notarizedIdFormHistory: PropArray<IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistoryProps>;

}

export interface IdentityVerificationCaseV1AssetsSharedEntityReference extends Readonly<Omit<IdentityVerificationCaseV1AssetsSharedProps, 'idFormHistory' | 'notarizedIdFormHistory'>> {


  readonly idFormHistory: ReadonlyArray<IdentityVerificationCaseV1AssetsSharedIdFormHistoryEntityReference>;
  readonly notarizedIdFormHistory: ReadonlyArray<IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistoryEntityReference>;

}

export class IdentityVerificationCaseV1AssetsShared extends ValueObject<IdentityVerificationCaseV1AssetsSharedProps> implements IdentityVerificationCaseV1AssetsSharedEntityReference {
  constructor(props: IdentityVerificationCaseV1AssetsSharedProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get idForm() {
    return this.props.idForm;
    }
  get notarizedIdForm() {
    return this.props.notarizedIdForm;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get idFormHistory(): ReadonlyArray<IdentityVerificationCaseV1AssetsSharedIdFormHistory> {
    return this.props.idFormHistory.items.map((item) => new IdentityVerificationCaseV1AssetsSharedIdFormHistory(item, this.context
    //, this.visa
    ));
  }
  get notarizedIdFormHistory(): ReadonlyArray<IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistory> {
    return this.props.notarizedIdFormHistory.items.map((item) => new IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistory(item, this.context
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
    newProps: IdentityVerificationCaseV1AssetsSharedProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1AssetsShared {
      return new IdentityVerificationCaseV1AssetsShared(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IdForm(value: string) {
    this.props.idForm = value;
  }
  set NotarizedIdForm(value: string) {
    this.props.notarizedIdForm = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
