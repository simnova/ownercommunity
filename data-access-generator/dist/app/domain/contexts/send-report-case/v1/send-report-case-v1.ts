export interface SendReportCaseV1Props extends DomainEntityProps {
  //Primitive Fields
  submittedAt?: Date;
  purgeEligibleAt?: Date;
  expirationEligibleAt?: Date;
  caseType?: string;
  state?: string;
  caseName?: string;
  systemTags?: string[];
  tags?: string[];

  //Nested Path Fields
  readonly caseDetails: SendReportCaseV1CaseDetailsProps;
  readonly revisionRequest: SendReportCaseV1RevisionRequestProps;
  readonly assets: SendReportCaseV1AssetProps;
  readonly financeDetails: SendReportCaseV1FinanceDetailsProps;
  readonly search: SendReportCaseV1SearchProps;

  //Populated Doc Fields
  readonly applicant: ApplicantUserProps;
  setApplicantRef(applicant: ApplicantUserEntityReference): void;

  //Document Array Fields
  readonly caseHistory: PropArray<SendReportCaseV1CaseHistoryProps>;
  readonly messages: PropArray<SendReportCaseV1MessageProps>;
  readonly activityLog: PropArray<SendReportCaseV1ActivityLogProps>;
  readonly caseFlagged: PropArray<SendReportCaseV1CaseFlaggedProps>;


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface SendReportCaseV1EntityReference extends Readonly<Omit<SendReportCaseV1Props, 'caseDetails' | 'revisionRequest' | 'caseHistory' | 'assets' | 'messages' | 'financeDetails' | 'activityLog' | 'applicant' | 'setApplicantRef' | 'caseFlagged' | 'search'>> {
  readonly caseDetails: SendReportCaseV1CaseDetailsEntityReference;
  readonly revisionRequest: SendReportCaseV1RevisionRequestEntityReference;
  readonly assets: SendReportCaseV1AssetEntityReference;
  readonly financeDetails: SendReportCaseV1FinanceDetailsEntityReference;
  readonly search: SendReportCaseV1SearchEntityReference;

  readonly applicant: ApplicantUserEntityReference;

  readonly caseHistory: ReadonlyArray<SendReportCaseV1CaseHistoryEntityReference>;
  readonly messages: ReadonlyArray<SendReportCaseV1MessageEntityReference>;
  readonly activityLog: ReadonlyArray<SendReportCaseV1ActivityLogEntityReference>;
  readonly caseFlagged: ReadonlyArray<SendReportCaseV1CaseFlaggedEntityReference>;

}

export class SendReportCaseV1<props extends SendReportCaseV1Props> 
  extends AggregateRoot<props> implements SendReportCaseV1EntityReference {
  private isNew: boolean = false;
  //private readonly visa: SendReportCaseV1Visa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forSendReportCaseV1(this);

  }
  public static getNewInstance<props extends SendReportCaseV1Props>(newProps: props,
    //inputs
    context: DomainExecutionContext): SendReportCaseV1<props> {
    let newInstance = new SendReportCaseV1(newProps, context);
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
  get caseDetails(): SendReportCaseV1CaseDetails {
      return this.props.caseDetails ? new SendReportCaseV1CaseDetails(this.props.caseDetails, this.context
      //, this.visa
      ) : undefined;
    }
  get revisionRequest(): SendReportCaseV1RevisionRequest {
      return this.props.revisionRequest ? new SendReportCaseV1RevisionRequest(this.props.revisionRequest, this.context
      //, this.visa
      ) : undefined;
    }
  get assets(): SendReportCaseV1Asset {
      return this.props.assets ? new SendReportCaseV1Asset(this.props.assets, this.context
      //, this.visa
      ) : undefined;
    }
  get financeDetails(): SendReportCaseV1FinanceDetails {
      return this.props.financeDetails ? new SendReportCaseV1FinanceDetails(this.props.financeDetails, this.context
      //, this.visa
      ) : undefined;
    }
  get search(): SendReportCaseV1Search {
      return this.props.search ? new SendReportCaseV1Search(this.props.search, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters
  get applicant(): ApplicantUserEntityReference {
          return this.props.applicant ? new ApplicantUser(this.props.applicant, this.context) : undefined;
        }

  //Document Array Field Getters
  get caseHistory(): ReadonlyArray<SendReportCaseV1CaseHistory> {
    return this.props.caseHistory.items.map((item) => new SendReportCaseV1CaseHistory(item, this.context
    //, this.visa
    ));
  }
  get messages(): ReadonlyArray<SendReportCaseV1Message> {
    return this.props.messages.items.map((item) => new SendReportCaseV1Message(item, this.context
    //, this.visa
    ));
  }
  get activityLog(): ReadonlyArray<SendReportCaseV1ActivityLog> {
    return this.props.activityLog.items.map((item) => new SendReportCaseV1ActivityLog(item, this.context
    //, this.visa
    ));
  }
  get caseFlagged(): ReadonlyArray<SendReportCaseV1CaseFlagged> {
    return this.props.caseFlagged.items.map((item) => new SendReportCaseV1CaseFlagged(item, this.context
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