import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainEntityProps } from '../../../../../../seedwork/domain-seedwork/domain-entity';
import { DomainExecutionContext, SystemExecutionContext } from '../../../domain-execution-context';
import * as ValueObjects from './staff-user.value-objects';
import { StaffRole, StaffRoleEntityReference, StaffRoleProps } from '../../community/roles/staff-role/staff-role';
import { StaffUserVisa } from './staff-user.visa';
import { StaffUserCreatedEvent } from '../../../events/types/staff-user-created';

export interface StaffUserProps extends DomainEntityProps {
  readonly role?: StaffRoleProps;
  setRoleRef: (role: StaffRoleEntityReference) => void;
  firstName?: string;
  lastName?: string;
  email?: string;

  displayName: string;
  externalId:string;
  accessBlocked: boolean;
  tags?: string[];
  readonly userType?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface StaffUserEntityReference extends Readonly<Omit<StaffUserProps, 'role' | 'setRoleRef' >> {
  readonly role: StaffRoleEntityReference;
}

export class StaffUser<props extends StaffUserProps> extends AggregateRoot<props, DomainExecutionContext, StaffUserVisa> implements StaffUserEntityReference  {
  private isNew: boolean = false;
  constructor(props: props, _context:DomainExecutionContext) { 
    super(props, _context, SystemExecutionContext(), (context) => context.domainVisa.forStaffUser(this), {});
   }

  get id(): string {return this.props.id;}
  get role(): StaffRoleEntityReference {return this.props.role ? new StaffRole(this.props.role, this.context) : undefined;}
  get firstName(): string {return this.props.firstName;}
  get lastName(): string {return this.props.lastName;}
  get email(): string {return this.props.email;}

  get displayName(): string {return this.props.displayName;}
  get externalId(): string {return this.props.externalId;}
  get accessBlocked(): boolean {return this.props.accessBlocked;}
  get tags(): string[] {return this.props.tags;}
  get userType(): string {return this.props.userType;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static getNewUser<props extends StaffUserProps> (newProps:props,externalId:string,firstName:string,lastName:string, email:string, context: DomainExecutionContext): StaffUser<props> {
    newProps.externalId = externalId;
    let user = new StaffUser(newProps, context);
    user.MarkAsNew();
    user.ExternalId=(externalId);
    user.FirstName=(firstName);
    user.LastName=(lastName);
    user.DisplayName=(`${firstName} ${lastName}`);
    user.Email=(email);
    user.isNew = false;
    return user;
  }

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(StaffUserCreatedEvent, { 
      externalId: this.props.externalId 
    });
  }

  private validateVisa(): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isEditingOwnAccount)) {
      throw new Error('Unauthorized');
    }
  }

  set Role(role: StaffRoleEntityReference) {
    if (!this.visa.determineIf((permissions) => permissions.isEditingOwnAccount || permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
    this.props.setRoleRef(role);
  }

  set FirstName(firstName:string) {
    this.validateVisa();
    this.props.firstName = (new ValueObjects.FirstName(firstName)).valueOf();
  }

  set LastName(lastName:string) {
    this.validateVisa();
    this.props.lastName = (new ValueObjects.LastName(lastName)).valueOf();
  }

  set Email(email:string) {
    this.validateVisa();
    this.props.email = (new ValueObjects.Email(email)).valueOf();
  }

  set DisplayName(displayName:string) {
    this.validateVisa();
    this.props.displayName = (new ValueObjects.DisplayName(displayName)).valueOf();
  }

  set ExternalId(externalId:string) {
    this.validateVisa();
    this.props.externalId = (new ValueObjects.ExternalId(externalId)).valueOf();
  }

  set AccessBlocked(accessBlocked:boolean) {
    this.validateVisa();
    this.props.accessBlocked = accessBlocked;
  }

  set Tags(tags:string[]) {
    this.validateVisa();
    this.props.tags = tags;
  }
}

