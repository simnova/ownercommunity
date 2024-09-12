import { EndUserRole, EndUserRolePermissions, EndUserRoleCommunityPermissions, EndUserRolePropertyPermissions, EndUserRoleServicePermissions, EndUserRoleServiceTicketPermissions, EndUserRoleViolationTicketPermissions } from '../../../models/roles/end-user-role';
import { EndUserRole as EndUserRoleDO, EndUserRoleProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role';
import { MongooseDomainAdapter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';

import { CommunityProps } from '../../../../../../app/domain/contexts/community/community/community';

import { CommunityDomainAdapter } from '../../community/community.domain-adapter';
import { DomainExecutionContext } from '../../../../../../app/domain/domain-execution-context';
import { EndUserRolePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-permissions';
import { EndUserRoleCommunityPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-community-permissions';
import { EndUserRolePropertyPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-property-permissions';
import { EndUserRoleServicePermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-service-permissions';
import { EndUserRoleServiceTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-service-ticket-permissions';
import { EndUserRoleViolationTicketPermissionsProps } from '../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-violation-ticket-permissions';
import { CommunityVisa } from '../../../../../../app/domain/contexts/community/community.visa';


export class EndUserRoleConverter extends MongoTypeConverter<
  DomainExecutionContext, 
  EndUserRole, 
  EndUserRoleDomainAdapter, 
  CommunityVisa,
  EndUserRoleDO<EndUserRoleDomainAdapter>
> {
  constructor() {
    super(EndUserRoleDomainAdapter, EndUserRoleDO);
  }
}

export class EndUserRoleDomainAdapter extends MongooseDomainAdapter<EndUserRole> implements EndUserRoleProps {
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
      return new CommunityDomainAdapter(this.doc.community);
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

  public get permissions(): EndUserRolePermissionsProps {
    if (!this.doc.permissions) {
      this.doc.set('permissions', {});
    }
    return new EndUserRolePermissionsAdapter(this.doc.permissions);
  }
}

class EndUserRolePermissionsAdapter implements EndUserRolePermissionsProps {
  constructor(public readonly props: EndUserRolePermissions) {}

  public get communityPermissions() {
    return new EndUserRoleCommunityPermissionsAdapter(this.props.communityPermissions);
  }

  public get propertyPermissions() {
    return new EndUserRolePropertyPermissionsAdapter(this.props.propertyPermissions);
  }

  public get servicePermissions() {
    return new EndUserRoleServicePermissionsAdapter(this.props.servicePermissions);
  }

  public get serviceTicketPermissions() {
    return new EndUserRoleServiceTicketPermissionsAdapter(this.props.serviceTicketPermissions);
  }

  public get violationTicketPermissions() {
    return new EndUserRoleAdminTicketPermissionsAdapter(this.props.violationTicketPermissions);
  }
}

class EndUserRoleCommunityPermissionsAdapter implements EndUserRoleCommunityPermissionsProps {
  constructor(public readonly props: EndUserRoleCommunityPermissions) {}

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

class EndUserRolePropertyPermissionsAdapter implements EndUserRolePropertyPermissionsProps {
  constructor(public readonly props: EndUserRolePropertyPermissions) {}

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

class EndUserRoleServicePermissionsAdapter implements EndUserRoleServicePermissionsProps {
  constructor(public readonly props: EndUserRoleServicePermissions) {}

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

class EndUserRoleServiceTicketPermissionsAdapter implements EndUserRoleServiceTicketPermissionsProps {
  constructor(public readonly props: EndUserRoleServiceTicketPermissions) {}

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

class EndUserRoleAdminTicketPermissionsAdapter implements EndUserRoleViolationTicketPermissionsProps {
  constructor(public readonly props: EndUserRoleViolationTicketPermissions) {}

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
