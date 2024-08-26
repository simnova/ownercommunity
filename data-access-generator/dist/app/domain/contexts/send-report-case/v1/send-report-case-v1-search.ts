export interface SendReportCaseV1SearchProps extends ValueObjectProps {
  // Primitive Fields
  hash?: string;
  indexedAt?: Date;
  indexingFailedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1SearchEntityReference extends Readonly<SendReportCaseV1SearchProps>{



}

export class SendReportCaseV1Search extends ValueObject<SendReportCaseV1SearchProps> implements SendReportCaseV1SearchEntityReference {
  constructor(props: SendReportCaseV1SearchProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1SearchProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1Search {
      return new SendReportCaseV1Search(newProps, context
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
