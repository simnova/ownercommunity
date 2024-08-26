export interface StaffUserProps extends DomainEntityProps {
  //Primitive Fields
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  accessBlocked: boolean;
  tags?: string[];
  displayName: string;
  userType: string;
  externalId: string;

  //Nested Path Fields
  readonly search: StaffUserSearchProps;

  //Populated Doc Fields
  readonly role: StaffRoleProps;
  setRoleRef(role: StaffRoleEntityReference): void;

  //Document Array Fields


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface StaffUserEntityReference extends Readonly<Omit<StaffUserProps, 'role' | 'setRoleRef' | 'search'>> {
  readonly search: StaffUserSearchEntityReference;

  readonly role: StaffRoleEntityReference;


}

export class StaffUser<props extends StaffUserProps> 
  extends AggregateRoot<props> implements StaffUserEntityReference {
  private isNew: boolean = false;
  //private readonly visa: StaffUserVisa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forStaffUser(this);

  }
  public static getNewInstance<props extends StaffUserProps>(newProps: props,
    //inputs
    context: DomainExecutionContext): StaffUser<props> {
    let newInstance = new StaffUser(newProps, context);
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
  get firstName(): string {
    return this.props.firstName;
    }
  get lastName(): string {
    return this.props.lastName;
    }
  get emailAddress(): string {
    return this.props.emailAddress;
    }
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

  //Nested Path Field Getters
  get search(): StaffUserSearch {
      return this.props.search ? new StaffUserSearch(this.props.search, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters
  get role(): StaffRoleEntityReference {
          return new StaffRole(this.props.role, this.context);
        }

  //Document Array Field Getters


  //Primitive Field Setters
  set FirstName(value: string) {
    this.props.firstName = value;
  }
  set LastName(value: string) {
    this.props.lastName = value;
  }
  set EmailAddress(value: string) {
    this.props.emailAddress = value;
  }
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

  //Populate Doc Field Setters
  set Role(role: StaffRoleEntityReference) {
    this.props.setRoleRef(role);
  }

//DocumentArrayFieldSetters: added as needed
}