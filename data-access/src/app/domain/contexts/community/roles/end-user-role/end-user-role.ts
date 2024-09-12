import { DomainEntityProps } from '../../../../../../../seedwork/domain-seedwork/domain-entity';
import { EndUserRolePermissions, EndUserRolePermissionsEntityReference, EndUserRolePermissionsProps } from './end-user-role-permissions';
import * as ValueObjects from './end-user-role.value-objects';
import { Community, CommunityProps, CommunityEntityReference } from '../../community/community';
import { CommunityVisa } from "../../community.visa";
import { AggregateRoot } from '../../../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainExecutionContext, SystemExecutionContext } from '../../../../domain-execution-context';
import { RoleDeletedReassignEvent } from '../../../../events/types/role-deleted-reassign';

export interface EndUserRoleProps extends DomainEntityProps {
  roleName: string;
  readonly community: CommunityProps;
  setCommunityRef: (community: CommunityEntityReference) => void;
  isDefault: boolean;
  permissions: EndUserRolePermissionsProps;
  readonly roleType?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface EndUserRoleEntityReference extends Readonly<Omit<EndUserRoleProps, 'community' | 'setCommunityRef' | 'permissions'>> {
  readonly community: CommunityEntityReference;
  readonly permissions: EndUserRolePermissionsEntityReference;
}

export class EndUserRole<props extends EndUserRoleProps> extends AggregateRoot<props, DomainExecutionContext, CommunityVisa> implements EndUserRoleEntityReference {
  private isNew: boolean = false;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props, context, SystemExecutionContext(), (context) => context.domainVisa.forEndUserRole(this), {}, {});
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
    return new EndUserRolePermissions(this.props.permissions, this.visa);
  }
  get roleType() {
    return this.props.roleType;
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

  public static getNewInstance<props extends EndUserRoleProps>(
    newProps: props,
    roleName: string,
    isDefault: boolean,
    community: CommunityEntityReference,
    context: DomainExecutionContext
  ): EndUserRole<props> {
    const role = new EndUserRole(newProps, context);
    role.isNew = true;
    role.RoleName = roleName;
    role.Community = community;
    role.IsDefault = isDefault;
    role.isNew = false;
    return role;
  }

  // using setter from TS 5.1

  private set Community(community: CommunityEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('You do not have permission to update this role');
    }
    this.props.setCommunityRef(community);
  }

  set DeleteAndReassignTo(roleRef: EndUserRoleEntityReference) {
    if (!this.isDeleted && !this.isDefault && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('You do not have permission to delete this role');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(RoleDeletedReassignEvent, { deletedRoleId: this.props.id, newRoleId: roleRef.id });
  }

  set IsDefault(isDefault: boolean) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('You do not have permission to update this role');
    }
    this.props.isDefault = isDefault;
  }

  set RoleName(roleName: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set role name');
    }
    this.props.roleName = new ValueObjects.RoleName(roleName).valueOf();
  }
}
