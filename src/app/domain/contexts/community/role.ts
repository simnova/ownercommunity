import { EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { Permissions, PermissionsEntityReference, PermissionsProps } from './permissions';
import { Community, CommunityProps, CommunityEntityReference } from './community';
import { CommunityVisa } from '../iam/community-visa';
import { AggregateRoot } from '../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainExecutionContext } from '../domain-execution-context';
import { RoleDeletedReassignEvent } from '../../events/types/role-deleted-reassign';

export interface RoleProps extends EntityProps {
  roleName: string;
  readonly community: CommunityProps;
  setCommunityRef: (community: CommunityEntityReference) => void;
  isDefault: boolean;
  permissions: PermissionsProps;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface RoleEntityReference extends Readonly<Omit<RoleProps, 'community' | 'setCommunityRef' | 'permissions'>> {
  readonly community: CommunityEntityReference;
  readonly permissions: PermissionsEntityReference;
}

export class Role<props extends RoleProps> extends AggregateRoot<props> implements RoleEntityReference {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.passport.forRole(this);
  }

  get roleName() {
    return this.props.roleName;
  }
  get community(): CommunityEntityReference {
    return new Community(this.props.community, this.context);
  }
  get isDefault() {
    return this.props.isDefault;
  }
  get permissions() {
    return new Permissions(this.props.permissions, this.visa);
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get schemaVersion() {
    return this.props.schemaVersion;
  }

  public static getNewInstance<props extends RoleProps>(
    newProps: props,
    roleName: string,
    isDefault: boolean,
    community: CommunityEntityReference,
    context: DomainExecutionContext
  ): Role<props> {
    const role = new Role(newProps, context);
    role.isNew = true;
    role.roleName = roleName;
    role.setCommunity = community;
    role.isDefault = isDefault;
    role.isNew = false;
    return role;
  }

  // using setter from TS 5.1

  private set setCommunity(community: CommunityEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('You do not have permission to update this role');
    }
    this.props.setCommunityRef(community);
  }

  set deleteAndReassignTo(roleRef: RoleEntityReference) {
    if (!this.isDeleted && !this.isDefault && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('You do not have permission to delete this role');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(RoleDeletedReassignEvent, { deletedRoleId: this.props.id, newRoleId: roleRef.id });
  }

  set isDefault(isDefault: boolean) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('You do not have permission to update this role');
    }
    this.props.isDefault = isDefault;
  }

  set roleName(roleName: string) {
    console.log('vis..', this.visa);
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set role name');
    }
    this.props.roleName = roleName;
  }
}
