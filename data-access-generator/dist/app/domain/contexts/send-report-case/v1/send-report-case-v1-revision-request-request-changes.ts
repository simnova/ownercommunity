export interface SendReportCaseV1RevisionRequestRequestChangesProps extends ValueObjectProps {
  // Primitive Fields
  requestUpdatedDestination: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1RevisionRequestRequestChangesEntityReference extends Readonly<SendReportCaseV1RevisionRequestRequestChangesProps>{



}

export class SendReportCaseV1RevisionRequestRequestChanges extends ValueObject<SendReportCaseV1RevisionRequestRequestChangesProps> implements SendReportCaseV1RevisionRequestRequestChangesEntityReference {
  constructor(props: SendReportCaseV1RevisionRequestRequestChangesProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get requestUpdatedDestination() {
    return this.props.requestUpdatedDestination;
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
    newProps: SendReportCaseV1RevisionRequestRequestChangesProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1RevisionRequestRequestChanges {
      return new SendReportCaseV1RevisionRequestRequestChanges(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set RequestUpdatedDestination(value: boolean) {
    this.props.requestUpdatedDestination = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
