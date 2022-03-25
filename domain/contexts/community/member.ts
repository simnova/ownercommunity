import { AggregateRoot } from '../../shared/aggregate-root';
import { EntityProps } from '../../shared/entity';
import * as ValueObjects from './member-value-objects';
import { Community, CommunityProps,CommunityEntityReference } from './community';
import { PropArray } from '../../shared/prop-array';
import { Account, AccountEntityReference, AccountProps } from './account';
import { Role, RoleEntityReference, RoleProps } from './role';
import { DomainExecutionContext } from '../context';
import { Profile, ProfileEntityReference, ProfileProps } from './profile';
import { CommunityVisa } from '../iam/community-visa';

export interface MemberProps extends EntityProps {
  memberName:string;
  readonly community: CommunityProps;
  setCommunityRef:(community: CommunityEntityReference) => void;
  readonly accounts: PropArray<AccountProps>;
  readonly role: RoleProps;
  setRoleRef: (role: RoleEntityReference) => void;
  readonly profile: ProfileProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface MemberEntityReference extends Readonly<Omit<MemberProps, 
  'community' | 'setCommunityRef' |
  'accounts' |
  'role' | 'setRoleRef' |
  'profile'
  >> {
  readonly community: CommunityEntityReference;
  readonly accounts: ReadonlyArray<AccountEntityReference>;
  readonly role: RoleEntityReference;
  readonly profile: ProfileEntityReference;
}

export class Member<props extends MemberProps> extends AggregateRoot<props> implements MemberEntityReference  {
  readonly visa: CommunityVisa;
  constructor(props: props,private readonly context:DomainExecutionContext) {
    super(props);
    this.visa = context.passport.forMember(this);
  }
  
  get id() {return this.props.id;}
  get memberName() {return this.props.memberName;}
  get community(): CommunityEntityReference {return new Community(this.props.community,this.context);}
  get accounts(): ReadonlyArray<Account> { return this.props.accounts.items.map(account => new Account(account,this.context, this.visa)); } // return account as it's an embedded document not a reference (allows editing)
  get role(): RoleEntityReference { return new Role(this.props.role,this.context); }
  get profile() { return new Profile(this.props.profile,this.visa); } // return profile as it's an embedded document not a reference (allows editing)
  get createdAt() {return this.props.createdAt;}
  get updatedAt() {return this.props.updatedAt;}
  get schemaVersion() {return this.props.schemaVersion;}

  public static async getNewMember<props extends MemberProps> (newProps:props,name:string,community:CommunityEntityReference, context:DomainExecutionContext): Promise<Member<props>> {
    let member = new Member(newProps,context);
    member.requestSetMemberName(name);
    member.requestSetCommunity(community);
    return member;
  }


  public requestSetMemberName(memberName:ValueObjects.MemberName): void {
    if(!this.visa.determineIf((permissions) => permissions.canManageMembers)) { throw new Error('Cannot set member name'); }
    this.props.memberName = memberName.valueOf();
  }
  private requestSetCommunity(community:CommunityEntityReference): void {
    this.props.setCommunityRef(community);
  }
  public requestSetRole(role:RoleEntityReference): void {
    if(!this.visa.determineIf((permissions) => permissions.canManageMembers)) { throw new Error('Cannot set role'); }
    this.props.setRoleRef(role);
  }

}