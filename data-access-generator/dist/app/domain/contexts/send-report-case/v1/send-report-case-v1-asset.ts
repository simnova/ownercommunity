export interface SendReportCaseV1AssetProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly private: SendReportCaseV1AssetPrivateProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1AssetEntityReference extends Readonly<Omit<SendReportCaseV1AssetProps, 'private'>> {
  readonly private: SendReportCaseV1AssetPrivateEntityReference;



}

export class SendReportCaseV1Asset extends ValueObject<SendReportCaseV1AssetProps> implements SendReportCaseV1AssetEntityReference {
  constructor(props: SendReportCaseV1AssetProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get private() {
      return new SendReportCaseV1AssetPrivate(this.props.private, this.context
      //, this.visa
      );
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
    newProps: SendReportCaseV1AssetProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1Asset {
      return new SendReportCaseV1Asset(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
