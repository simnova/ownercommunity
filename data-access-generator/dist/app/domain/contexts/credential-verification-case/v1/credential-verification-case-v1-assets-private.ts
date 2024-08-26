export interface CredentialVerificationCaseV1AssetsPrivateProps extends ValueObjectProps {
  // Primitive Fields
  verificationForm?: string;
  verificationPacket?: string;
  verificationPacketResponse?: string;
  verificationComponentPacket?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly verificationFormHistory: PropArray<CredentialVerificationCaseV1AssetHistoryProps>;
  readonly verificationPacketHistory: PropArray<CredentialVerificationCaseV1AssetHistoryProps>;
  readonly verificationPacketResponseHistory: PropArray<CredentialVerificationCaseV1AssetHistoryProps>;
  readonly verificationComponentPacketHistory: PropArray<CredentialVerificationCaseV1AssetHistoryProps>;

}

export interface CredentialVerificationCaseV1AssetsPrivateEntityReference extends Readonly<Omit<CredentialVerificationCaseV1AssetsPrivateProps, 'verificationFormHistory' | 'verificationPacketHistory' | 'verificationPacketResponseHistory' | 'verificationComponentPacketHistory'>> {


  readonly verificationFormHistory: ReadonlyArray<CredentialVerificationCaseV1AssetHistoryEntityReference>;
  readonly verificationPacketHistory: ReadonlyArray<CredentialVerificationCaseV1AssetHistoryEntityReference>;
  readonly verificationPacketResponseHistory: ReadonlyArray<CredentialVerificationCaseV1AssetHistoryEntityReference>;
  readonly verificationComponentPacketHistory: ReadonlyArray<CredentialVerificationCaseV1AssetHistoryEntityReference>;

}

export class CredentialVerificationCaseV1AssetsPrivate extends ValueObject<CredentialVerificationCaseV1AssetsPrivateProps> implements CredentialVerificationCaseV1AssetsPrivateEntityReference {
  constructor(props: CredentialVerificationCaseV1AssetsPrivateProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get verificationForm() {
    return this.props.verificationForm;
    }
  get verificationPacket() {
    return this.props.verificationPacket;
    }
  get verificationPacketResponse() {
    return this.props.verificationPacketResponse;
    }
  get verificationComponentPacket() {
    return this.props.verificationComponentPacket;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get verificationFormHistory(): ReadonlyArray<CredentialVerificationCaseV1AssetHistory> {
    return this.props.verificationFormHistory.items.map((item) => new CredentialVerificationCaseV1AssetHistory(item, this.context
    //, this.visa
    ));
  }
  get verificationPacketHistory(): ReadonlyArray<CredentialVerificationCaseV1AssetHistory> {
    return this.props.verificationPacketHistory.items.map((item) => new CredentialVerificationCaseV1AssetHistory(item, this.context
    //, this.visa
    ));
  }
  get verificationPacketResponseHistory(): ReadonlyArray<CredentialVerificationCaseV1AssetHistory> {
    return this.props.verificationPacketResponseHistory.items.map((item) => new CredentialVerificationCaseV1AssetHistory(item, this.context
    //, this.visa
    ));
  }
  get verificationComponentPacketHistory(): ReadonlyArray<CredentialVerificationCaseV1AssetHistory> {
    return this.props.verificationComponentPacketHistory.items.map((item) => new CredentialVerificationCaseV1AssetHistory(item, this.context
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
    newProps: CredentialVerificationCaseV1AssetsPrivateProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1AssetsPrivate {
      return new CredentialVerificationCaseV1AssetsPrivate(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set VerificationForm(value: string) {
    this.props.verificationForm = value;
  }
  set VerificationPacket(value: string) {
    this.props.verificationPacket = value;
  }
  set VerificationPacketResponse(value: string) {
    this.props.verificationPacketResponse = value;
  }
  set VerificationComponentPacket(value: string) {
    this.props.verificationComponentPacket = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
