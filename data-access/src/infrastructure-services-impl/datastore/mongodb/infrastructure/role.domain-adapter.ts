import {
  Role,
  Permissions,
  CommunityPermissions,
  PropertyPermissions,
  ServicePermissions,
  ServiceTicketPermissions,
} from '../models/role';
import { Role as RoleDO, RoleProps } from '../../../../app/domain/contexts/community/role';
import { MongooseDomainAdapter } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';

import { CommunityProps } from '../../../../app/domain/contexts/community/community';
import { CommunityPermissionsProps } from '../../../../app/domain/contexts/community/community-permissions';
import { PermissionsProps } from '../../../../app/domain/contexts/community/permissions';
import { CommunityDomainAdapter } from './community.domain-adapter';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { PropertyPermissionsProps } from '../../../../app/domain/contexts/community/property-permissions';
import { ServicePermissionsProps } from '../../../../app/domain/contexts/community/service-permissions';
import { ServiceTicketPermissionsProps } from '../../../../app/domain/contexts/community/service-ticket-permissions';

export class RoleConverter extends MongoTypeConverter<DomainExecutionContext, Role, RoleDomainAdapter, RoleDO<RoleDomainAdapter>> {
  constructor() {
    super(RoleDomainAdapter, RoleDO);
  }
}

export class RoleDomainAdapter extends MongooseDomainAdapter<Role> implements RoleProps {
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

  public get permissions(): PermissionsProps {
    if (!this.doc.permissions) {
      this.doc.set('permissions', {});
    }
    return new PermissionsAdapter(this.doc.permissions);
  }
}

class PermissionsAdapter implements PermissionsProps {
  constructor(public readonly props: Permissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

  public get communityPermissions() {
    return new CommunityPermissionsAdapter(this.props.communityPermissions);
  }

  public get propertyPermissions() {
    return new PropertyPermissionsAdapter(this.props.propertyPermissions);
  }

  public get servicePermissions() {
    return new ServicePermissionsAdapter(this.props.servicePermissions);
  }

  public get serviceTicketPermissions() {
    return new ServiceTicketPermissionsAdapter(this.props.serviceTicketPermissions);
  }
}

class CommunityPermissionsAdapter implements CommunityPermissionsProps {
  constructor(public readonly props: CommunityPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

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

class PropertyPermissionsAdapter implements PropertyPermissionsProps {
  constructor(public readonly props: PropertyPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

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

class ServicePermissionsAdapter implements ServicePermissionsProps {
  constructor(public readonly props: ServicePermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

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

class ServiceTicketPermissionsAdapter implements ServiceTicketPermissionsProps {
  constructor(public readonly props: ServiceTicketPermissions) {}
  public get id() {
    return this.props.id.valueOf().toString();
  }

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
