export interface CredentialVerificationCaseV1Props extends DomainEntityProps {
  //Primitive Fields
  submittedAt?: Date;
  purgeEligibleAt?: Date;
  expirationEligibleAt?: Date;
  caseType?: string;
  state: string;
  caseName: string;
  systemTags?: string[];
  tags?: string[];

  //Nested Path Fields
  readonly caseDetails: CredentialVerificationCaseV1CaseDetailsProps;
  readonly assets: CredentialVerificationCaseV1AssetsProps;
  readonly revisionRequest: CredentialVerificationCaseV1RevisionRequestProps;
  readonly financeDetails: CredentialVerificationCaseV1FinanceDetailsProps;
  readonly search: CredentialVerificationCaseV1SearchProps;

  //Populated Doc Fields
  readonly applicant: ApplicantUserProps;
  setApplicantRef(applicant: ApplicantUserEntityReference): void;

  //Document Array Fields
  readonly caseHistory: PropArray<CredentialVerificationCaseV1CaseHistoryProps>;
  readonly messages: PropArray<CredentialVerificationCaseV1MessageProps>;
  readonly activityLog: PropArray<CredentialVerificationCaseV1ActivityLogProps>;
  readonly caseFlagged: PropArray<CredentialVerificationCaseV1CaseFlaggedProps>;


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CredentialVerificationCaseV1EntityReference extends Readonly<Omit<CredentialVerificationCaseV1Props, 'caseDetails' | 'assets' | 'revisionRequest' | 'caseHistory' | 'messages' | 'financeDetails' | 'activityLog' | 'applicant' | 'setApplicantRef' | 'caseFlagged' | 'search'>> {
  readonly caseDetails: CredentialVerificationCaseV1CaseDetailsEntityReference;
  readonly assets: CredentialVerificationCaseV1AssetsEntityReference;
  readonly revisionRequest: CredentialVerificationCaseV1RevisionRequestEntityReference;
  readonly financeDetails: CredentialVerificationCaseV1FinanceDetailsEntityReference;
  readonly search: CredentialVerificationCaseV1SearchEntityReference;

  readonly applicant: ApplicantUserEntityReference;

  readonly caseHistory: ReadonlyArray<CredentialVerificationCaseV1CaseHistoryEntityReference>;
  readonly messages: ReadonlyArray<CredentialVerificationCaseV1MessageEntityReference>;
  readonly activityLog: ReadonlyArray<CredentialVerificationCaseV1ActivityLogEntityReference>;
  readonly caseFlagged: ReadonlyArray<CredentialVerificationCaseV1CaseFlaggedEntityReference>;

}

export class CredentialVerificationCaseV1<props extends CredentialVerificationCaseV1Props> 
  extends AggregateRoot<props> implements CredentialVerificationCaseV1EntityReference {
  private isNew: boolean = false;
  //private readonly visa: CredentialVerificationCaseV1Visa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forCredentialVerificationCaseV1(this);

  }
  public static getNewInstance<props extends CredentialVerificationCaseV1Props>(newProps: props,
    //inputs
    context: DomainExecutionContext): CredentialVerificationCaseV1<props> {
    let newInstance = new CredentialVerificationCaseV1(newProps, context);
    newInstance.isNew = true;
    //field assignments
    newInstance.isNew = false;
    return newInstance;
  }

  get id(): string {
    return this.props.id;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  //Primitive Field Getters
  get submittedAt(): Date {
    return this.props.submittedAt;
    }
  get purgeEligibleAt(): Date {
    return this.props.purgeEligibleAt;
    }
  get expirationEligibleAt(): Date {
    return this.props.expirationEligibleAt;
    }
  get caseType(): string {
    return this.props.caseType;
    }
  get state(): string {
    return this.props.state;
    }
  get caseName(): string {
    return this.props.caseName;
    }
  get systemTags(): string[] {
    return this.props.systemTags;
    }
  get tags(): string[] {
    return this.props.tags;
    }

  //Nested Path Field Getters
  get caseDetails(): CredentialVerificationCaseV1CaseDetails {
      return this.props.caseDetails ? new CredentialVerificationCaseV1CaseDetails(this.props.caseDetails, this.context
      //, this.visa
      ) : undefined;
    }
  get assets(): CredentialVerificationCaseV1Assets {
      return new CredentialVerificationCaseV1Assets(this.props.assets, this.context
      //, this.visa
      );
    }
  get revisionRequest(): CredentialVerificationCaseV1RevisionRequest {
      return new CredentialVerificationCaseV1RevisionRequest(this.props.revisionRequest, this.context
      //, this.visa
      );
    }
  get financeDetails(): CredentialVerificationCaseV1FinanceDetails {
      return new CredentialVerificationCaseV1FinanceDetails(this.props.financeDetails, this.context
      //, this.visa
      );
    }
  get search(): CredentialVerificationCaseV1Search {
      return this.props.search ? new CredentialVerificationCaseV1Search(this.props.search, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters
  get applicant(): ApplicantUserEntityReference {
          return new ApplicantUser(this.props.applicant, this.context);
        }

  //Document Array Field Getters
  get caseHistory(): ReadonlyArray<CredentialVerificationCaseV1CaseHistory> {
    return this.props.caseHistory.items.map((item) => new CredentialVerificationCaseV1CaseHistory(item, this.context
    //, this.visa
    ));
  }
  get messages(): ReadonlyArray<CredentialVerificationCaseV1Message> {
    return this.props.messages.items.map((item) => new CredentialVerificationCaseV1Message(item, this.context
    //, this.visa
    ));
  }
  get activityLog(): ReadonlyArray<CredentialVerificationCaseV1ActivityLog> {
    return this.props.activityLog.items.map((item) => new CredentialVerificationCaseV1ActivityLog(item, this.context
    //, this.visa
    ));
  }
  get caseFlagged(): ReadonlyArray<CredentialVerificationCaseV1CaseFlagged> {
    return this.props.caseFlagged.items.map((item) => new CredentialVerificationCaseV1CaseFlagged(item, this.context
    //, this.visa
    ));
  }


  //Primitive Field Setters
  set SubmittedAt(value: Date) {
    this.props.submittedAt = value;
  }
  set PurgeEligibleAt(value: Date) {
    this.props.purgeEligibleAt = value;
  }
  set ExpirationEligibleAt(value: Date) {
    this.props.expirationEligibleAt = value;
  }
  set CaseType(value: string) {
    this.props.caseType = value;
  }
  set State(value: string) {
    this.props.state = value;
  }
  set CaseName(value: string) {
    this.props.caseName = value;
  }
  set SystemTags(value: string[]) {
    this.props.systemTags = value;
  }
  set Tags(value: string[]) {
    this.props.tags = value;
  }

  //Populate Doc Field Setters
  set Applicant(applicant: ApplicantUserEntityReference) {
    this.props.setApplicantRef(applicant);
  }

//DocumentArrayFieldSetters: added as needed
}