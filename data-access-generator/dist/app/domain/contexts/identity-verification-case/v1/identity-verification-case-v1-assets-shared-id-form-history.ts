export interface IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps extends DomainEntityProps {
  // Primitive Fields
  assetVersion: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly assetUploadedBy: UserProps;
  setAssetUploadedByRef(assetUploadedBy: UserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1AssetsSharedIdFormHistoryEntityReference extends Readonly<Omit<IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps, 'assetUploadedBy' | 'setAssetUploadedByRef'>> {

  readonly assetUploadedBy: UserEntityReference;


}

export class IdentityVerificationCaseV1AssetsSharedIdFormHistory extends DomainEntity<IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps> implements IdentityVerificationCaseV1AssetsSharedIdFormHistoryEntityReference {
  constructor(props: IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get assetVersion() {
    return this.props.assetVersion;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get assetUploadedBy(): UserEntityReference {
          return new User(this.props.assetUploadedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnIdentityVerificationCaseV1AssetsSharedIdFormHistorys && permissions.isEditingOwnIdentityVerificationCaseV1AssetsSharedIdFormHistory)
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
  set AssetUploadedBy(assetUploadedBy: UserEntityReference) {
    this.props.setAssetUploadedByRef(assetUploadedBy);
  }

//DocumentArrayFieldSetters: added as needed
}