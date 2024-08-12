import { AggregateRoot } from "../../../../../../../seedwork/domain-seedwork/aggregate-root";
import { EntityProps } from "../../../../../../../seedwork/domain-seedwork/entity";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { RoleDeletedReassignEvent } from "../../../../events/types/role-deleted-reassign";
import { CommunityVisa } from "../../community.visa";
import { StaffRolePermissionsProps, StaffRolePermissionsEntityReference, StaffRolePermissions } from "./staff-role-permissions";

export interface StaffRoleProps extends EntityProps {
  roleName: string;
  isDefault: boolean;
  permissions: StaffRolePermissionsProps;
  readonly roleType?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
}

export interface StaffRoleEntityReference extends Readonly<Omit<StaffRoleProps, 'permissions'>> {
  readonly permissions: StaffRolePermissionsEntityReference;
}

export class StaffRole<props extends StaffRoleProps> extends AggregateRoot<props> implements StaffRoleEntityReference {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.domainVisa.forStaffRole(this);
  }

  get roleName() {
    return this.props.roleName;
  }
  get isDefault() {
    return this.props.isDefault;
  }
  get permissions() {
    return new StaffRolePermissions(this.props.permissions, this.visa);
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

  public static getNewInstance<props extends StaffRoleProps>(
    newProps: props,
    roleName: string,
    isDefault: boolean,
    context: DomainExecutionContext
  ): StaffRole<props> {
    const role = new StaffRole(newProps, context);
    role.isNew = true;
    role.roleName = roleName;
    role.isDefault = isDefault;
    role.isNew = false;
    return role;
  }

  // using setter from TS 5.1

  set deleteAndReassignTo(roleRef: StaffRoleEntityReference) {
    if (!this.isDeleted && !this.isDefault && !this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions)) {
      throw new Error('You do not have permission to delete this role');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(RoleDeletedReassignEvent, { deletedRoleId: this.props.id, newRoleId: roleRef.id });
  }

  set isDefault(isDefault: boolean) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('You do not have permission to update this role');
    }
    this.props.isDefault = isDefault;
  }

  set roleName(roleName: string) {
    console.log('vis..', this.visa);
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set role name');
    }
    this.props.roleName = roleName;
  }
}
