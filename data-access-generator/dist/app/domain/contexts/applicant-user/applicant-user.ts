export interface ApplicantUserProps extends DomainEntityProps {
  //Primitive Fields
  accessBlocked?: boolean;
  tags?: string[];
  displayName?: string;
  userType?: string;
  externalId: string;
  isProfileSubmitted?: boolean;

  //Nested Path Fields
  readonly personalInformation: ApplicantUserPersonalInformationProps;
  readonly search: ApplicantUserSearchProps;
  readonly payment: ApplicantUserPaymentProps;

  //Populated Doc Fields

  //Document Array Fields
  readonly termsAndConditions: PropArray<ApplicantUserTermsAndConditionProps>;


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ApplicantUserEntityReference extends Readonly<Omit<ApplicantUserProps, 'termsAndConditions' | 'personalInformation' | 'search' | 'payment'>> {
  readonly personalInformation: ApplicantUserPersonalInformationEntityReference;
  readonly search: ApplicantUserSearchEntityReference;
  readonly payment: ApplicantUserPaymentEntityReference;


  readonly termsAndConditions: ReadonlyArray<ApplicantUserTermsAndConditionEntityReference>;

}

export class ApplicantUser<props extends ApplicantUserProps> 
  extends AggregateRoot<props> implements ApplicantUserEntityReference {
  private isNew: boolean = false;
  //private readonly visa: ApplicantUserVisa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forApplicantUser(this);

  }
  public static getNewInstance<props extends ApplicantUserProps>(newProps: props,
    //inputs
    context: DomainExecutionContext): ApplicantUser<props> {
    let newInstance = new ApplicantUser(newProps, context);
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
  get accessBlocked(): boolean {
    return this.props.accessBlocked;
    }
  get tags(): string[] {
    return this.props.tags;
    }
  get displayName(): string {
    return this.props.displayName;
    }
  get userType(): string {
    return this.props.userType;
    }
  get externalId(): string {
    return this.props.externalId;
    }
  get isProfileSubmitted(): boolean {
    return this.props.isProfileSubmitted;
    }

  //Nested Path Field Getters
  get personalInformation(): ApplicantUserPersonalInformation {
      return this.props.personalInformation ? new ApplicantUserPersonalInformation(this.props.personalInformation, this.context
      //, this.visa
      ) : undefined;
    }
  get search(): ApplicantUserSearch {
      return this.props.search ? new ApplicantUserSearch(this.props.search, this.context
      //, this.visa
      ) : undefined;
    }
  get payment(): ApplicantUserPayment {
      return this.props.payment ? new ApplicantUserPayment(this.props.payment, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters

  //Document Array Field Getters
  get termsAndConditions(): ReadonlyArray<ApplicantUserTermsAndCondition> {
    return this.props.termsAndConditions.items.map((item) => new ApplicantUserTermsAndCondition(item, this.context
    //, this.visa
    ));
  }


  //Primitive Field Setters
  set AccessBlocked(value: boolean) {
    this.props.accessBlocked = value;
  }
  set Tags(value: string[]) {
    this.props.tags = value;
  }
  set DisplayName(value: string) {
    this.props.displayName = value;
  }
  set UserType(value: string) {
    this.props.userType = value;
  }
  set ExternalId(value: string) {
    this.props.externalId = value;
  }
  set IsProfileSubmitted(value: boolean) {
    this.props.isProfileSubmitted = value;
  }

  //Populate Doc Field Setters

//DocumentArrayFieldSetters: added as needed
}