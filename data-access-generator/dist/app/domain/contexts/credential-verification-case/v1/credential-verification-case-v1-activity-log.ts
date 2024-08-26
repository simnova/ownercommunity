export interface CredentialVerificationCaseV1ActivityLogProps extends DomainEntityProps {
  // Primitive Fields
  activityType?: string;
  description?: string;
  metaData?: string;
  tags?: string[];

  // NestedPath Fields

  // PopulateDoc Fields
  readonly activityBy: UserProps;
  setActivityByRef(activityBy: UserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1ActivityLogEntityReference extends Readonly<Omit<CredentialVerificationCaseV1ActivityLogProps, 'activityBy' | 'setActivityByRef'>> {

  readonly activityBy: UserEntityReference;


}

export class CredentialVerificationCaseV1ActivityLog extends DomainEntity<CredentialVerificationCaseV1ActivityLogProps> implements CredentialVerificationCaseV1ActivityLogEntityReference {
  constructor(props: CredentialVerificationCaseV1ActivityLogProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get activityType() {
    return this.props.activityType;
    }
  get description() {
    return this.props.description;
    }
  get metaData() {
    return this.props.metaData;
    }
  get tags() {
    return this.props.tags;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get activityBy(): UserEntityReference {
          return this.props.activityBy ? new User(this.props.activityBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnCredentialVerificationCaseV1ActivityLogs && permissions.isEditingOwnCredentialVerificationCaseV1ActivityLog)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set ActivityType(value: string) {
    this.props.activityType = value;
  }
  set Description(value: string) {
    this.props.description = value;
  }
  set MetaData(value: string) {
    this.props.metaData = value;
  }
  set Tags(value: string[]) {
    this.props.tags = value;
  }

  // PopulatedDoc Field Setters
  set ActivityBy(activityBy: UserEntityReference) {
    this.props.setActivityByRef(activityBy);
  }

//DocumentArrayFieldSetters: added as needed
}
