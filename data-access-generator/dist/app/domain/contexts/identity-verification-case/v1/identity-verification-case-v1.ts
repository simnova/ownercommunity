export interface IdentityVerificationCaseV1Props extends DomainEntityProps {
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
  readonly caseDetails: IdentityVerificationCaseV1CaseDetailsProps;
  readonly revisionRequest: IdentityVerificationCaseV1RevisionRequestProps;
  readonly assets: IdentityVerificationCaseV1AssetsProps;
  readonly financeDetails: IdentityVerificationCaseV1FinanceDetailsProps;
  readonly search: IdentityVerificationCaseV1SearchProps;

  //Populated Doc Fields
  readonly applicant: ApplicantUserProps;
  setApplicantRef(applicant: ApplicantUserEntityReference): void;

  //Document Array Fields
  readonly caseHistory: PropArray<IdentityVerificationCaseV1CaseHistoryProps>;
  readonly messages: PropArray<IdentityVerificationCaseV1MessageProps>;
  readonly activityLog: PropArray<IdentityVerificationCaseV1ActivityLogProps>;
  readonly caseFlagged: PropArray<IdentityVerificationCaseV1CaseFlaggedProps>;


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IdentityVerificationCaseV1EntityReference extends Readonly<Omit<IdentityVerificationCaseV1Props, 'caseDetails' | 'revisionRequest' | 'caseHistory' | 'assets' | 'messages' | 'financeDetails' | 'activityLog' | 'applicant' | 'setApplicantRef' | 'caseFlagged' | 'search'>> {
  readonly caseDetails: IdentityVerificationCaseV1CaseDetailsEntityReference;
  readonly revisionRequest: IdentityVerificationCaseV1RevisionRequestEntityReference;
  readonly assets: IdentityVerificationCaseV1AssetsEntityReference;
  readonly financeDetails: IdentityVerificationCaseV1FinanceDetailsEntityReference;
  readonly search: IdentityVerificationCaseV1SearchEntityReference;

  readonly applicant: ApplicantUserEntityReference;

  readonly caseHistory: ReadonlyArray<IdentityVerificationCaseV1CaseHistoryEntityReference>;
  readonly messages: ReadonlyArray<IdentityVerificationCaseV1MessageEntityReference>;
  readonly activityLog: ReadonlyArray<IdentityVerificationCaseV1ActivityLogEntityReference>;
  readonly caseFlagged: ReadonlyArray<IdentityVerificationCaseV1CaseFlaggedEntityReference>;

}

export class IdentityVerificationCaseV1<props extends IdentityVerificationCaseV1Props> 
  extends AggregateRoot<props> implements IdentityVerificationCaseV1EntityReference {
  private isNew: boolean = false;
  //private readonly visa: IdentityVerificationCaseV1Visa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forIdentityVerificationCaseV1(this);

  }
  public static getNewInstance<props extends IdentityVerificationCaseV1Props>(newProps: props,
    //inputs
    context: DomainExecutionContext): IdentityVerificationCaseV1<props> {
    let newInstance = new IdentityVerificationCaseV1(newProps, context);
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
  get caseDetails(): IdentityVerificationCaseV1CaseDetails {
      return this.props.caseDetails ? new IdentityVerificationCaseV1CaseDetails(this.props.caseDetails, this.context
      //, this.visa
      ) : undefined;
    }
  get revisionRequest(): IdentityVerificationCaseV1RevisionRequest {
      return this.props.revisionRequest ? new IdentityVerificationCaseV1RevisionRequest(this.props.revisionRequest, this.context
      //, this.visa
      ) : undefined;
    }
  get assets(): IdentityVerificationCaseV1Assets {
      return this.props.assets ? new IdentityVerificationCaseV1Assets(this.props.assets, this.context
      //, this.visa
      ) : undefined;
    }
  get financeDetails(): IdentityVerificationCaseV1FinanceDetails {
      return this.props.financeDetails ? new IdentityVerificationCaseV1FinanceDetails(this.props.financeDetails, this.context
      //, this.visa
      ) : undefined;
    }
  get search(): IdentityVerificationCaseV1Search {
      return this.props.search ? new IdentityVerificationCaseV1Search(this.props.search, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters
  get applicant(): ApplicantUserEntityReference {
          return new ApplicantUser(this.props.applicant, this.context);
        }

  //Document Array Field Getters
  get caseHistory(): ReadonlyArray<IdentityVerificationCaseV1CaseHistory> {
    return this.props.caseHistory.items.map((item) => new IdentityVerificationCaseV1CaseHistory(item, this.context
    //, this.visa
    ));
  }
  get messages(): ReadonlyArray<IdentityVerificationCaseV1Message> {
    return this.props.messages.items.map((item) => new IdentityVerificationCaseV1Message(item, this.context
    //, this.visa
    ));
  }
  get activityLog(): ReadonlyArray<IdentityVerificationCaseV1ActivityLog> {
    return this.props.activityLog.items.map((item) => new IdentityVerificationCaseV1ActivityLog(item, this.context
    //, this.visa
    ));
  }
  get caseFlagged(): ReadonlyArray<IdentityVerificationCaseV1CaseFlagged> {
    return this.props.caseFlagged.items.map((item) => new IdentityVerificationCaseV1CaseFlagged(item, this.context
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