export interface IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps extends ValueObjectProps {
  // Primitive Fields
  isNotarizationComplete?: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsEntityReference extends Readonly<IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps>{



}

export class IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetails extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isNotarizationComplete() {
    return this.props.isNotarizationComplete;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetails {
      return new IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsNotarizationComplete(value: boolean) {
    this.props.isNotarizationComplete = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
