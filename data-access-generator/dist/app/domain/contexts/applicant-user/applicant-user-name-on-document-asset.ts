export interface ApplicantUserNameOnDocumentAssetProps extends DomainEntityProps {
  // Primitive Fields
  documentName?: string;
  uploadedAt?: Date;
  isDeleteRequested?: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface ApplicantUserNameOnDocumentAssetEntityReference extends Readonly<ApplicantUserNameOnDocumentAssetProps>{



}

export class ApplicantUserNameOnDocumentAsset extends DomainEntity<ApplicantUserNameOnDocumentAssetProps> implements ApplicantUserNameOnDocumentAssetEntityReference {
  constructor(props: ApplicantUserNameOnDocumentAssetProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get documentName() {
    return this.props.documentName;
    }
  get uploadedAt() {
    return this.props.uploadedAt;
    }
  get isDeleteRequested() {
    return this.props.isDeleteRequested;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnApplicantUserNameOnDocumentAssets && permissions.isEditingOwnApplicantUserNameOnDocumentAsset)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set DocumentName(value: string) {
    this.props.documentName = value;
  }
  set UploadedAt(value: Date) {
    this.props.uploadedAt = value;
  }
  set IsDeleteRequested(value: boolean) {
    this.props.isDeleteRequested = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
