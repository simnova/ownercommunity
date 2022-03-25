import { Role, Permissions,CommunityPermissions } from '../../../../infrastructure/data-sources/cosmos-db/models/role';
import { Role as RoleDO, RoleProps } from '../../../contexts/community/role';
import { MongooseDomainAdapter } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';

import { CommunityProps } from '../../../contexts/community/community';
import { CommunityPermissionsProps } from '../../../contexts/community/community-permissions';
import { PermissionsProps } from '../../../contexts/community/permissions';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { DomainExecutionContext } from '../../../contexts/context';

export class RoleConverter extends MongoTypeConverter<DomainExecutionContext,Role,RoleDomainAdapter,RoleDO<RoleDomainAdapter>> {
  constructor() {
    super(RoleDomainAdapter, RoleDO);
  }
}

export class RoleDomainAdapter extends MongooseDomainAdapter<Role> implements RoleProps {
  constructor(props: Role) { super(props); }

  get roleName() {return this.props.roleName;}
  set roleName(roleName) {this.props.roleName = roleName;}

  get community() {
    if(this.props.community){return new CommunityDomainAdapter(this.props.community);}
  }
  setCommunityRef(community: CommunityProps) {
    this.props.set('community',community.id);
  }

  get isDefault() {return this.props.isDefault;}
  set isDefault(isDefault) {this.props.isDefault = isDefault;}

  public get permissions(): PermissionsProps { 
    if(!this.props.permissions){this.props.set('permissions',{});  }
    return new PermissionsAdapter(this.props.permissions); 
  }
}

class PermissionsAdapter implements PermissionsProps{
  constructor(public readonly props: Permissions) { }
  public get id() { return this.props.id.valueOf().toString(); }

  public get communityPermissions() { 
    return new CommunityPermissionsAdapter(this.props.communityPermissions); 
  }
}

class CommunityPermissionsAdapter implements CommunityPermissionsProps  {
  constructor(public readonly props: CommunityPermissions) { }
  public get id() { return this.props.id.valueOf().toString(); }

  public get canManageRolesAndPermissions() { return this.props.canManageRolesAndPermissions; }
  public set canManageRolesAndPermissions(value) { this.props.canManageRolesAndPermissions = value; }

  public get canManageCommunitySettings() { return this.props.canManageCommunitySettings; }
  public set canManageCommunitySettings(value) { this.props.canManageCommunitySettings = value; }

  public get canManageSiteContent() { return this.props.canManageSiteContent; }
  public set canManageSiteContent(value) { this.props.canManageSiteContent = value; }
}