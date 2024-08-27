export interface EntityProps extends DomainEntityProps {
  //Primitive Fields
  entityName: string;
  entityLanguage?: string;
  isIssuingInstitution?: boolean;
  isClient?: boolean;
  disabledAt?: Date;

  //Nested Path Fields
  readonly issuingInstitution: EntityIssuingInstitutionProps;
  readonly client: EntityClientProps;
  readonly address: EntityAddressInfoProps;

  //Populated Doc Fields
  readonly createdBy: StaffUserProps;
  setCreatedByRef(createdBy: StaffUserEntityReference): void;

  //Document Array Fields


  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface EntityEntityReference extends Readonly<Omit<EntityProps, 'issuingInstitution' | 'client' | 'address' | 'createdBy' | 'setCreatedByRef'>> {
  readonly issuingInstitution: EntityIssuingInstitutionEntityReference;
  readonly client: EntityClientEntityReference;
  readonly address: EntityAddressInfoEntityReference;

  readonly createdBy: StaffUserEntityReference;


}

export class Entity<props extends EntityProps> 
  extends AggregateRoot<props> implements EntityEntityReference {
  private isNew: boolean = false;
  //private readonly visa: EntityVisa;
  constructor(props: props, private readonly context: DomainExecutionContext) { 
    super(props);
    //this.visa = context.domainVisa.forEntity(this);

  }
  public static getNewInstance<props extends EntityProps>(newProps: props,
    //inputs
    context: DomainExecutionContext): Entity<props> {
    let newInstance = new Entity(newProps, context);
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
  get entityName(): string {
    return this.props.entityName;
    }
  get entityLanguage(): string {
    return this.props.entityLanguage;
    }
  get isIssuingInstitution(): boolean {
    return this.props.isIssuingInstitution;
    }
  get isClient(): boolean {
    return this.props.isClient;
    }
  get disabledAt(): Date {
    return this.props.disabledAt;
    }

  //Nested Path Field Getters
  get issuingInstitution(): EntityIssuingInstitution {
      return this.props.issuingInstitution ? new EntityIssuingInstitution(this.props.issuingInstitution, this.context
      //, this.visa
      ) : undefined;
    }
  get client(): EntityClient {
      return this.props.client ? new EntityClient(this.props.client, this.context
      //, this.visa
      ) : undefined;
    }
  get address(): EntityAddressInfo {
      return this.props.address ? new EntityAddressInfo(this.props.address, this.context
      //, this.visa
      ) : undefined;
    }

  //Populate Doc Field Getters
  get createdBy(): StaffUserEntityReference {
          return this.props.createdBy ? new StaffUser(this.props.createdBy, this.context) : undefined;
        }

  //Document Array Field Getters


  //Primitive Field Setters
  set EntityName(value: string) {
    this.props.entityName = value;
  }
  set EntityLanguage(value: string) {
    this.props.entityLanguage = value;
  }
  set IsIssuingInstitution(value: boolean) {
    this.props.isIssuingInstitution = value;
  }
  set IsClient(value: boolean) {
    this.props.isClient = value;
  }
  set DisabledAt(value: Date) {
    this.props.disabledAt = value;
  }

  //Populate Doc Field Setters
  set CreatedBy(createdBy: StaffUserEntityReference) {
    this.props.setCreatedByRef(createdBy);
  }

//DocumentArrayFieldSetters: added as needed
}