import { VendorUserRole, VendorUserRolePermissions, VendorUserRoleCommunityPermissions, VendorUserRolePropertyPermissions, VendorUserRoleServicePermissions, VendorUserRoleServiceTicketPermissions, VendorUserRoleViolationTicketPermissions } from '../../../models/roles/vendor-user-role';
import { VendorUserRole as VendorUserRoleDO, VendorUserRoleProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';

import { CommunityProps } from '../../../../../../app/domain/contexts/community/community/community';

import { CommunityDomainAdapter } from '../../community/community.domain-adapter';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { VendorUserRolePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-permissions';
import { VendorUserRoleCommunityPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-community-permissions';
import { VendorUserRolePropertyPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-property-permissions';
import { VendorUserRoleServicePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-service-permissions';
import { VendorUserRoleServiceTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-service-ticket-permissions';
import { VendorUserRoleViolationTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/vendor-user-role/vendor-user-role-violation-ticket-permissions';
import { CommunityVisa } from '../../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../../app/init/infrastructure-context';


export class VendorUserRoleConverter extends MongoTypeConverter<
  DomainExecutionContext, 
  VendorUserRole, 
  VendorUserRoleDomainAdapter, 
  CommunityVisa,
  VendorUserRoleDO<VendorUserRoleDomainAdapter>,
  InfrastructureContext
> {
  constructor() {
    super(VendorUserRoleDomainAdapter, VendorUserRoleDO);
  }
}

export class VendorUserRoleDomainAdapter extends MongooseDomainAdapter<VendorUserRole, InfrastructureContext> implements VendorUserRoleProps {
  get roleName() {
    return this.doc.roleName;
  }
  set roleName(roleName) {
    this.doc.roleName = roleName;
  }

  get community() {
    if (this.doc.community && !this.doc.populated('community')) {
      console.warn('Community not populated - may want to look at repository populate', this.doc.community);
    }
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community, this.infrastructureContext);
    }
  }
  setCommunityRef(community: CommunityProps) {
    this.doc.set('community', community['props']['doc']);
  }

  get isDefault() {
    return this.doc.isDefault;
  }
  set isDefault(isDefault) {
    this.doc.isDefault = isDefault;
  }

  public get permissions(): VendorUserRolePermissionsProps {
    if (!this.doc.permissions) {
      this.doc.set('permissions', {});
    }
    return new VendorUserRolePermissionsAdapter(this.doc.permissions, this.infrastructureContext);
  }
}

class VendorUserRolePermissionsAdapter implements VendorUserRolePermissionsProps {
  constructor(public readonly props: VendorUserRolePermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get communityPermissions() {
    return new VendorUserRoleCommunityPermissionsAdapter(this.props.communityPermissions, this.infrastructureContext);
  }

  public get propertyPermissions() {
    return new VendorUserRolePropertyPermissionsAdapter(this.props.propertyPermissions, this.infrastructureContext);
  }

  public get servicePermissions() {
    return new VendorUserRoleServicePermissionsAdapter(this.props.servicePermissions, this.infrastructureContext);
  }

  public get serviceTicketPermissions() {
    return new VendorUserRoleServiceTicketPermissionsAdapter(this.props.serviceTicketPermissions, this.infrastructureContext);
  }

  public get violationTicketPermissions() {
    return new VendorUserRoleAdminTicketPermissionsAdapter(this.props.violationTicketPermissions, this.infrastructureContext);
  }
}

class VendorUserRoleCommunityPermissionsAdapter implements VendorUserRoleCommunityPermissionsProps {
  constructor(public readonly props: VendorUserRoleCommunityPermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get canManageRolesAndPermissions() {
    return this.props.canManageRolesAndPermissions;
  }
  public set canManageRolesAndPermissions(value) {
    this.props.canManageRolesAndPermissions = value;
  }

  public get canManageCommunitySettings() {
    return this.props.canManageCommunitySettings;
  }
  public set canManageCommunitySettings(value) {
    this.props.canManageCommunitySettings = value;
  }

  public get canManageSiteContent() {
    return this.props.canManageSiteContent;
  }
  public set canManageSiteContent(value) {
    this.props.canManageSiteContent = value;
  }

  public get canManageMembers() {
    return this.props.canManageMembers;
  }
  public set canManageMembers(value) {
    this.props.canManageMembers = value;
  }

  public get canEditOwnMemberProfile() {
    return this.props.canEditOwnMemberProfile;
  }
  public set canEditOwnMemberProfile(value) {
    this.props.canEditOwnMemberProfile = value;
  }

  public get canEditOwnMemberAccounts() {
    return this.props.canEditOwnMemberAccounts;
  }
  public set canEditOwnMemberAccounts(value) {
    this.props.canEditOwnMemberAccounts = value;
  }

  public get isSystemAccount() {
    return false;
  }
  public get isEditingOwnMemberAccount() {
    return false;
  }
}

class VendorUserRolePropertyPermissionsAdapter implements VendorUserRolePropertyPermissionsProps {
  constructor(public readonly props: VendorUserRolePropertyPermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get canManageProperties() {
    return this.props.canManageProperties;
  }
  public set canManageProperties(value) {
    this.props.canManageProperties = value;
  }

  public get canEditOwnProperty() {
    return this.props.canEditOwnProperty;
  }
  public set canEditOwnProperty(value) {
    this.props.canEditOwnProperty = value;
  }

  public get isEditingOwnProperty() {
    return false;
  }
  public get isSystemAccount() {
    return false;
  }
}

class VendorUserRoleServicePermissionsAdapter implements VendorUserRoleServicePermissionsProps {
  constructor(public readonly props: VendorUserRoleServicePermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get canManageServices() {
    return this.props.canManageServices;
  }
  public set canManageServices(value) {
    this.props.canManageServices = value;
  }

  public get isSystemAccount() {
    return false;
  }
}

class VendorUserRoleServiceTicketPermissionsAdapter implements VendorUserRoleServiceTicketPermissionsProps {
  constructor(public readonly props: VendorUserRoleServiceTicketPermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get canCreateTickets() {
    return this.props.canCreateTickets;
  }
  public set canCreateTickets(value) {
    this.props.canCreateTickets = value;
  }

  public get canManageTickets() {
    return this.props.canManageTickets;
  }
  public set canManageTickets(value) {
    this.props.canManageTickets = value;
  }

  public get canAssignTickets() {
    return this.props.canAssignTickets;
  }
  public set canAssignTickets(value) {
    this.props.canAssignTickets = value;
  }

  public get canWorkOnTickets() {
    return this.props.canWorkOnTickets;
  }
  public set canWorkOnTickets(value) {
    this.props.canWorkOnTickets = value;
  }

  public get isEditingOwnTicket() {
    return false;
  }
  public get isEditingAssignedTicket() {
    return false;
  }
  public get isSystemAccount() {
    return false;
  }
}

class VendorUserRoleAdminTicketPermissionsAdapter implements VendorUserRoleViolationTicketPermissionsProps {
  constructor(public readonly props: VendorUserRoleViolationTicketPermissions, private readonly infrastructureContext: InfrastructureContext) {}

  public get canCreateTickets() {
    return this.props.canCreateTickets;
  }
  public set canCreateTickets(value) {
    this.props.canCreateTickets = value;
  }

  public get canManageTickets() {
    return this.props.canManageTickets;
  }
  public set canManageTickets(value) {
    this.props.canManageTickets = value;
  }

  public get canAssignTickets() {
    return this.props.canAssignTickets;
  }
  public set canAssignTickets(value) {
    this.props.canAssignTickets = value;
  }

  public get canWorkOnTickets() {
    return this.props.canWorkOnTickets;
  }
  public set canWorkOnTickets(value) {
    this.props.canWorkOnTickets = value;
  }

  public get isEditingOwnTicket() {
    return false;
  }
  public get isEditingAssignedTicket() {
    return false;
  }
  public get isSystemAccount() {
    return false;
  }
}
