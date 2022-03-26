import { Entity, EntityProps } from "../../shared/entity";
import { Permissions, PermissionsEntityReference, PermissionsProps } from "./permissions";
import { Community, CommunityProps, CommunityEntityReference } from "./community";
import { CommunityVisa } from "../iam/community-visa";
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from "../context";

export interface RoleProps extends EntityProps {
  roleName: string;
  readonly community: CommunityProps;
  setCommunityRef: (community: CommunityEntityReference) => void;
  isDefault: boolean;
  permissions: PermissionsProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface RoleEntityReference extends Readonly<Omit<RoleProps,
  'community' | 'setCommunityRef' | 
  'permissions'>>{
  readonly community: CommunityEntityReference;
  readonly permissions: PermissionsEntityReference;
}

export class Role<props extends RoleProps> extends AggregateRoot<props> implements RoleEntityReference{
  private visa : CommunityVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forRole(this);
  }

  get roleName() { return this.props.roleName; }
  get community(): CommunityEntityReference { return new Community(this.props.community, this.context); }
  get isDefault() { return this.props.isDefault; }
  get permissions() { return new Permissions(this.props.permissions,this.visa); }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }  
  get schemaVersion() {return this.props.schemaVersion;}

  public static getNewInstance<props extends RoleProps>(newProps: props, roleName:string,isDefault:boolean,community:CommunityEntityReference, context:DomainExecutionContext): Role<props> {
    var role = new Role(newProps,context);
    role.requestSetRoleName(roleName);
    role.requestSetCommunity(community);
    role.requestSetIsDefault(isDefault);
    return role
  }

  private requestSetCommunity(community:CommunityEntityReference): void {
    if(!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) { throw new Error('You do not have permission to update this account'); }
    this.props.setCommunityRef(community);
  }
  
  private requestSetIsDefault(isDefault:boolean): void {
    if(!this.visa.determineIf((permissions) => permissions.isSystemAccount)) { throw new Error('You do not have permission to update this account'); }
    this.props.isDefault = isDefault;
  }

  public requestSetRoleName(roleName:string): void {
    if(!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {throw new Error('Cannot set role name');}
    this.props.roleName = roleName;
  }

}