export interface ApplicantUserSearchProps extends ValueObjectProps {
  // Primitive Fields
  hash?: string;
  indexedAt?: Date;
  indexingFailedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserSearchEntityReference extends Readonly<ApplicantUserSearchProps>{



}

export class ApplicantUserSearch extends ValueObject<ApplicantUserSearchProps> implements ApplicantUserSearchEntityReference {
  constructor(props: ApplicantUserSearchProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: ApplicantUserSearchProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): ApplicantUserSearch {
      return new ApplicantUserSearch(newProps, context
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
