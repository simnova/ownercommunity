import { Entity, EntityProps } from "../../shared/entity";
import { Permissions, PermissionsEntityReference, PermissionsProps } from "./permissions";
import { Community, CommunityProps, CommunityEntityReference } from "./community";
import { CommunityVisa } from "../iam/community-visa";
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from "../context";

export interface RoleProps extends EntityProps {
  roleName: string;
  community: CommunityProps;
  setCommunity: (community: CommunityProps) => void;
  isDefault: boolean;
  permissions: PermissionsProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface RoleEntityReference extends Readonly<Omit<RoleProps,'community' | 'setCommunity' | 'permissions'>>{
  readonly community: CommunityEntityReference;
  readonly permissions: PermissionsEntityReference;
}

export class Role<props extends RoleProps> extends AggregateRoot<props> implements RoleEntityReference{
  //constructor(props: props,private visa:CommunityVisa) { super(props); }
  private visa : CommunityVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forRole(this);
  }

  get roleName(): string { return this.props.roleName; }
  get community(): CommunityEntityReference { return new Community(this.props.community, this.context); }
  get isDefault(): boolean { return this.props.isDefault; }
  get permissions(): Permissions { return new Permissions(this.props.permissions,this.visa); }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion;}

  public static create(props: RoleProps, roleName:string,isDefault:boolean, context:DomainExecutionContext): Role<RoleProps> {
    var role = new Role(props,context);
    role.props.roleName = roleName;
    role.props.isDefault = isDefault;
  
    return role
  }

  public async setRoleName(roleName:string): Promise<void> {
    if(! await this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set role name');
    }
    this.props.roleName = roleName;
  }
}