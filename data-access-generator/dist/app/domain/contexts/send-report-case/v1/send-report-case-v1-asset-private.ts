export interface SendReportCaseV1AssetPrivateProps extends ValueObjectProps {
  // Primitive Fields
  statusReportCoverLetter?: string;
  verificationStatusReport?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly statusReportCoverLetterHistory: PropArray<SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps>;
  readonly verificationStatusReportHistory: PropArray<SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps>;

}

export interface SendReportCaseV1AssetPrivateEntityReference extends Readonly<Omit<SendReportCaseV1AssetPrivateProps, 'statusReportCoverLetterHistory' | 'verificationStatusReportHistory'>> {


  readonly statusReportCoverLetterHistory: ReadonlyArray<SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryEntityReference>;
  readonly verificationStatusReportHistory: ReadonlyArray<SendReportCaseV1AssetPrivateVerificationStatusReportHistoryEntityReference>;

}

export class SendReportCaseV1AssetPrivate extends ValueObject<SendReportCaseV1AssetPrivateProps> implements SendReportCaseV1AssetPrivateEntityReference {
  constructor(props: SendReportCaseV1AssetPrivateProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get statusReportCoverLetter() {
    return this.props.statusReportCoverLetter;
    }
  get verificationStatusReport() {
    return this.props.verificationStatusReport;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get statusReportCoverLetterHistory(): ReadonlyArray<SendReportCaseV1AssetPrivateStatusReportCoverLetterHistory> {
    return this.props.statusReportCoverLetterHistory.items.map((item) => new SendReportCaseV1AssetPrivateStatusReportCoverLetterHistory(item, this.context
    //, this.visa
    ));
  }
  get verificationStatusReportHistory(): ReadonlyArray<SendReportCaseV1AssetPrivateVerificationStatusReportHistory> {
    return this.props.verificationStatusReportHistory.items.map((item) => new SendReportCaseV1AssetPrivateVerificationStatusReportHistory(item, this.context
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
    newProps: SendReportCaseV1AssetPrivateProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1AssetPrivate {
      return new SendReportCaseV1AssetPrivate(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set StatusReportCoverLetter(value: string) {
    this.props.statusReportCoverLetter = value;
  }
  set VerificationStatusReport(value: string) {
    this.props.verificationStatusReport = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
