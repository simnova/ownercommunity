export interface IdentityVerificationCaseV1MessageProps extends DomainEntityProps {
  // Primitive Fields
  sentBy: string;
  message: string;
  embedding?: string;
  isHiddenFromApplicant: boolean;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly initiatedBy: StaffUserProps;
  setInitiatedByRef(initiatedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1MessageEntityReference extends Readonly<Omit<IdentityVerificationCaseV1MessageProps, 'initiatedBy' | 'setInitiatedByRef'>> {

  readonly initiatedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1Message extends DomainEntity<IdentityVerificationCaseV1MessageProps> implements IdentityVerificationCaseV1MessageEntityReference {
  constructor(props: IdentityVerificationCaseV1MessageProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get sentBy() {
    return this.props.sentBy;
    }
  get message() {
    return this.props.message;
    }
  get embedding() {
    return this.props.embedding;
    }
  get isHiddenFromApplicant() {
    return this.props.isHiddenFromApplicant;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get initiatedBy(): StaffUserEntityReference {
          return this.props.initiatedBy ? new StaffUser(this.props.initiatedBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnIdentityVerificationCaseV1Messages && permissions.isEditingOwnIdentityVerificationCaseV1Message)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set SentBy(value: string) {
    this.props.sentBy = value;
  }
  set Message(value: string) {
    this.props.message = value;
  }
  set Embedding(value: string) {
    this.props.embedding = value;
  }
  set IsHiddenFromApplicant(value: boolean) {
    this.props.isHiddenFromApplicant = value;
  }

  // PopulatedDoc Field Setters
  set InitiatedBy(initiatedBy: StaffUserEntityReference) {
    this.props.setInitiatedByRef(initiatedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
