export interface SendReportCaseV1CaseDetailsApplicationProps extends ValueObjectProps {
  // Primitive Fields
  attestedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly credential: CredentialVerificationCaseProps;
  setCredentialRef(credential: CredentialVerificationCaseEntityReference): void;
  readonly destination: EntityProps;
  setDestinationRef(destination: EntityEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsApplicationProps, 'credential' | 'setCredentialRef' | 'destination' | 'setDestinationRef'>> {

  readonly credential: CredentialVerificationCaseEntityReference;
  readonly destination: EntityEntityReference;


}

export class SendReportCaseV1CaseDetailsApplication extends ValueObject<SendReportCaseV1CaseDetailsApplicationProps> implements SendReportCaseV1CaseDetailsApplicationEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get attestedAt() {
    return this.props.attestedAt;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get credential(): CredentialVerificationCaseEntityReference {
          return this.props.credential ? new CredentialVerificationCase(this.props.credential, this.context) : undefined;
        }
  get destination(): EntityEntityReference {
          return new Entity(this.props.destination, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1CaseDetailsApplicationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplication {
      return new SendReportCaseV1CaseDetailsApplication(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set AttestedAt(value: Date) {
    this.props.attestedAt = value;
  }

  // PopulatedDoc Field Setters
  set Credential(credential: CredentialVerificationCaseEntityReference) {
    this.props.setCredentialRef(credential);
  }
  set Destination(destination: EntityEntityReference) {
    this.props.setDestinationRef(destination);
  }

//DocumentArrayFieldSetters: added as needed
}
