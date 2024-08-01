import { StaffRole, StaffRolePermissions, StaffRoleCommunityPermissions, StaffRolePropertyPermissions, StaffRoleServicePermissions, StaffRoleServiceTicketPermissions, StaffRoleViolationTicketPermissions } from '../../../models/roles/staff-role';
import { StaffRole as StaffRoleDO, StaffRoleProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/staff-role';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { StaffRoleCommunityPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/community-permissions';
import { StaffRolePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/staff-role-permissions';
import { StaffRolePropertyPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/property-permissions';
import { StaffRoleServicePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/service-permissions';
import { StaffRoleServiceTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/service-ticket-permissions';
import { StaffRoleViolationTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/staff-role/violation-ticket-permissions';

export class StaffRoleConverter extends MongoTypeConverter<DomainExecutionContext, StaffRole, StaffRoleDomainAdapter, StaffRoleDO<StaffRoleDomainAdapter>> {
  constructor() {
    super(StaffRoleDomainAdapter, StaffRoleDO);
  }
}

export class StaffRoleDomainAdapter extends MongooseDomainAdapter<StaffRole> implements StaffRoleProps {
  get roleName() {
    return this.doc.roleName;
  }
  set roleName(roleName) {
    this.doc.roleName = roleName;
  }

  get isDefault() {
    return this.doc.isDefault;
  }
  set isDefault(isDefault) {
    this.doc.isDefault = isDefault;
  }

  public get permissions(): StaffRolePermissionsProps {
    if (!this.doc.permissions) {
      this.doc.set('permissions', {});
    }
    return new StaffRolePermissionsAdapter(this.doc.permissions);
  }
}

class StaffRolePermissionsAdapter implements StaffRolePermissionsProps {
  constructor(public readonly props: StaffRolePermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

  public get communityPermissions() {
    return new StaffRoleCommunityPermissionsAdapter(this.props.communityPermissions);
  }

  public get propertyPermissions() {
    return new StaffRolePropertyPermissionsAdapter(this.props.propertyPermissions);
  }

  public get servicePermissions() {
    return new StaffRoleServicePermissionsAdapter(this.props.servicePermissions);
  }

  public get serviceTicketPermissions() {
    return new StaffRoleServiceTicketPermissionsAdapter(this.props.serviceTicketPermissions);
  }

  public get violationTicketPermissions() {
    return new StaffRoleAdminTicketPermissionsAdapter(this.props.violationTicketPermissions);
  }
}

class StaffRoleCommunityPermissionsAdapter implements StaffRoleCommunityPermissionsProps {
  constructor(public readonly props: StaffRoleCommunityPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

  public get canManageStaffRolesAndPermissions() {
    return this.props.canManageStaffRolesAndPermissions;
  }
  public set canManageStaffRolesAndPermissions(value) {
    this.props.canManageStaffRolesAndPermissions = value;
  }

  public get canManageAllCommunities() {
    return this.props.canManageAllCommunities;
  }
  public set canManageAllCommunities(value) {
    this.props.canManageAllCommunities = value;
  }

  public get canDeleteCommunities() {
    return this.props.canDeleteCommunities;
  }
  public set canDeleteCommunities(value) {
    this.props.canDeleteCommunities = value;
  }

  public get canChangeCommunityOwner() {
    return this.props.canChangeCommunityOwner;
  }
  public set canChangeCommunityOwner(value) {
    this.props.canChangeCommunityOwner = value;
  }

  public get canReIndexSearchCollections() {
    return this.props.canReIndexSearchCollections;
  }
  public set canReIndexSearchCollections(value) {
    this.props.canReIndexSearchCollections = value;
  }
}

class StaffRolePropertyPermissionsAdapter implements StaffRolePropertyPermissionsProps {
  constructor(public readonly props: StaffRolePropertyPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }
}

class StaffRoleServicePermissionsAdapter implements StaffRoleServicePermissionsProps {
  constructor(public readonly props: StaffRoleServicePermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }
}

class StaffRoleServiceTicketPermissionsAdapter implements StaffRoleServiceTicketPermissionsProps {
  constructor(public readonly props: StaffRoleServiceTicketPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }
}

class StaffRoleAdminTicketPermissionsAdapter implements StaffRoleViolationTicketPermissionsProps {
  constructor(public readonly props: StaffRoleViolationTicketPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }
}
