import { EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { EndUserRolePermissions, EndUserRolePermissionsEntityReference, EndUserRolePermissionsProps } from './end-user-role-permissions';
import { Community, CommunityProps, CommunityEntityReference } from '../../community/community';
import { CommunityVisa } from "../../community.visa";
import { AggregateRoot } from '../../../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { RoleDeletedReassignEvent } from '../../../../events/types/role-deleted-reassign';

export interface EndUserRoleProps extends EntityProps {
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

export class EndUserRole<props extends EndUserRoleProps> extends AggregateRoot<props> implements EndUserRoleEntityReference {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.domainVisa.forEndUserRole(this);
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

  set deleteAndReassignTo(roleRef: EndUserRoleEntityReference) {
    if (!this.isDeleted && !this.isDefault && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('You do not have permission to delete this role');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(RoleDeletedReassignEvent, { deletedRoleId: this.props.id, newRoleId: roleRef.id });
  }

  set isDefault(isDefault: boolean) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
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
