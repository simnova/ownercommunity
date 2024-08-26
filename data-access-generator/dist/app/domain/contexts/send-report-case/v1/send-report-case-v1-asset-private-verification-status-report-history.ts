export interface SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps extends DomainEntityProps {
  // Primitive Fields
  assetVersion?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly assetUploadedBy: StaffUserProps;
  setAssetUploadedByRef(assetUploadedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1AssetPrivateVerificationStatusReportHistoryEntityReference extends Readonly<Omit<SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps, 'assetUploadedBy' | 'setAssetUploadedByRef'>> {

  readonly assetUploadedBy: StaffUserEntityReference;


}

export class SendReportCaseV1AssetPrivateVerificationStatusReportHistory extends DomainEntity<SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps> implements SendReportCaseV1AssetPrivateVerificationStatusReportHistoryEntityReference {
  constructor(props: SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get assetVersion() {
    return this.props.assetVersion;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get assetUploadedBy(): StaffUserEntityReference {
          return this.props.assetUploadedBy ? new StaffUser(this.props.assetUploadedBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnSendReportCaseV1AssetPrivateVerificationStatusReportHistorys && permissions.isEditingOwnSendReportCaseV1AssetPrivateVerificationStatusReportHistory)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set AssetVersion(value: string) {
    this.props.assetVersion = value;
  }

  // PopulatedDoc Field Setters
  set AssetUploadedBy(assetUploadedBy: StaffUserEntityReference) {
    this.props.setAssetUploadedByRef(assetUploadedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
