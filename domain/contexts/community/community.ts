import { AggregateRoot } from '../../shared/aggregate-root';
import { EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import { CommunityVisa } from '../iam/community-visa';
import * as ValueObjects from './community-value-objects';

export interface CommunityProps extends EntityProps {
  name:string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface CommunityEntityReference extends Readonly<CommunityProps> {}

export class Community<props extends CommunityProps> extends AggregateRoot<props> implements CommunityEntityReference  {
  readonly visa : CommunityVisa;
  private isNew:boolean = false;
  constructor(props: props,private readonly context: DomainExecutionContext) { 
    super(props); 
    this.visa =  context.passport.forCommunity(this);
  }

  get id() {return this.props.id;}
  get name() {return this.props.name;}
  get domain() {return this.props.domain;}
  get whiteLabelDomain() {return this.props.whiteLabelDomain;}
  get handle() {return this.props.handle;}
  get updatedAt() {return this.props.updatedAt;}
  get createdAt() {return this.props.createdAt;}
  get schemaVersion() {return this.props.schemaVersion;}

  public static getNewInstance<props extends CommunityProps> (newProps:props,name:string,domain:string,whiteLabelDomain:string, handle:string, context: DomainExecutionContext): Community<props> {
    let community = new Community(newProps, context);
    community.isNew = true;
    community.requestSetName(name);
    community.requestSetDomain(domain);
    community.requestSetWhiteLabelDomain(whiteLabelDomain);
    community.requestSetHandle(handle);
    community.isNew = false
    return community;
  }

  public requestSetName(name:ValueObjects.Name): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the name of this community');}
    this.props.name = name.valueOf();
  }
  public requestSetDomain(domain:ValueObjects.Domain): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the domain of this community');}
    this.props.domain = domain.valueOf();
  }
  public requestSetWhiteLabelDomain(whiteLabelDomain:ValueObjects.WhiteLabelDomain): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the white label domain of this community');}
    this.props.whiteLabelDomain = whiteLabelDomain.valueOf();
  }
  public requestSetHandle(handle:ValueObjects.Handle): void {
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.canManageCommunitySettings)) {throw new Error('You do not have permission to change the handle of this community');}
    this.props.handle = handle.valueOf();
  }

}

export interface CommunityPermissions {
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: boolean;
  isSystemAccount: boolean;
} 