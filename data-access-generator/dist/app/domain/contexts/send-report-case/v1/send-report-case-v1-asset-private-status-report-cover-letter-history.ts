export interface SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps extends DomainEntityProps {
  // Primitive Fields
  assetVersion?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly assetUploadedBy: StaffUserProps;
  setAssetUploadedByRef(assetUploadedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryEntityReference extends Readonly<Omit<SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps, 'assetUploadedBy' | 'setAssetUploadedByRef'>> {

  readonly assetUploadedBy: StaffUserEntityReference;


}

export class SendReportCaseV1AssetPrivateStatusReportCoverLetterHistory extends DomainEntity<SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps> implements SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryEntityReference {
  constructor(props: SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
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
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnSendReportCaseV1AssetPrivateStatusReportCoverLetterHistorys && permissions.isEditingOwnSendReportCaseV1AssetPrivateStatusReportCoverLetterHistory)
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
