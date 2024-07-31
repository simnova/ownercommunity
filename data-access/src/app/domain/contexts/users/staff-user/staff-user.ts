import { UserCreatedEvent } from '../../../events/types/user-created';
import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../domain-execution-context';
import * as ValueObjects from './staff-user.value-objects';
import { StaffRoleEntityReference, StaffRoleProps } from '../../community/roles/staff-role/staff-role';
import { CommunityVisa } from '../../community/community.visa';

export interface StaffUserProps extends EntityProps {
  readonly role: StaffRoleProps;
  setRoleRef: (role: StaffRoleEntityReference) => void;
  firstName?: string;
  lastName?: string;
  email?: string;

  displayName: string;
  externalId:string;
  accessBlocked: boolean;
  tags?: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface StaffUserEntityReference extends Readonly<Omit<StaffUserProps, 'role' | 'setRoleRef' >> {
  readonly role: StaffRoleEntityReference;
}

export class StaffUser<props extends StaffUserProps> extends AggregateRoot<props> implements StaffUserEntityReference  {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, context?:DomainExecutionContext) { super(props); }

  get id(): string {return this.props.id;}
  get role(): StaffRoleEntityReference {return this.props.role;}
  get firstName(): string {return this.props.firstName;}
  get lastName(): string {return this.props.lastName;}
  get email(): string {return this.props.email;}

  get displayName(): string {return this.props.displayName;}
  get externalId(): string {return this.props.externalId;}
  get accessBlocked(): boolean {return this.props.accessBlocked;}
  get tags(): string[] {return this.props.tags;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get createdAt(): Date {return this.props.createdAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static getReadOnlyUser<readonlyProps extends StaffUserProps> (props:readonlyProps): StaffUserEntityReference{
    return new StaffUser(props);
  }

  public static getNewUser<props extends StaffUserProps> (newProps:props,externalId:string,firstName:string,lastName:string): StaffUser<props> {
    newProps.externalId = externalId;
    let user = new StaffUser(newProps);
    user.ExternalId=(externalId);
    user.FirstName=(firstName);
    user.LastName=(lastName);
    user.DisplayName=(`${firstName} ${lastName}`);
    user.MarkAsNew();
    return user;
  }

  private MarkAsNew(): void {
    this.addIntegrationEvent(UserCreatedEvent,{userId: this.props.id});
  }

  set Role(role: StaffRoleEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
    this.props.setRoleRef(role);
  }

  set FirstName(firstName:string) {
    this.props.firstName = (new ValueObjects.FirstName(firstName)).valueOf();
  }

  set LastName(lastName:string) {
    this.props.lastName = (new ValueObjects.LastName(lastName)).valueOf();
  }

  set Email(email:string) {
    this.props.email = (new ValueObjects.Email(email)).valueOf();
  }

  set DisplayName(displayName:string) {
    this.props.displayName = (new ValueObjects.DisplayName(displayName)).valueOf();
  }

  set ExternalId(externalId:string) {
    this.props.externalId = (new ValueObjects.ExternalId(externalId)).valueOf();
  }

  set AccessBlocked(accessBlocked:boolean) {
    if (!this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('Unauthorized');
    }
    this.props.accessBlocked = accessBlocked;
  }

  set Tags(tags:string[]) {
    if (!this.visa.determineIf((permissions) => permissions.isEditingOwnMemberAccount))
    this.props.tags = tags;
  }
}

