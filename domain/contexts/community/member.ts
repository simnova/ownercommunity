import { AggregateRoot } from '../../shared/aggregate-root';
import { EntityProps } from '../../shared/entity';
import * as ValueObjects from './member-value-objects';
import { Community, CommunityProps,CommunityEntityReference } from './community';
import { PropArray } from '../../shared/prop-array';
import { Account, AccountEntityReference, AccountProps } from './account';
import { Role, RoleEntityReference, RoleProps } from './role';
import { DomainExecutionContext } from '../context';
import { Profile, ProfileEntityReference, ProfileProps } from './profile';

export interface MemberProps extends EntityProps {
  memberName:string;
  community: CommunityProps;
  accounts: PropArray<AccountProps>;
  role: RoleProps;
  profile: ProfileProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface MemberEntityReference extends Readonly<Omit<MemberProps, 'setCommunity' | 'accounts' | 'role' | 'profile'>> {
  readonly community: CommunityEntityReference;
  readonly accounts: AccountEntityReference[];
  readonly role: RoleEntityReference;
  readonly profile: ProfileEntityReference;
}

export class Member<props extends MemberProps> extends AggregateRoot<props> implements MemberEntityReference  {
  constructor(props: props,private readonly context:DomainExecutionContext) {super(props);}
  
  get id(): string {return this.props.id;}
  get memberName(): string {return this.props.memberName;}
  get community(): CommunityEntityReference {return new Community(this.props.community,this.context);}
  get accounts(): AccountEntityReference[] { return this.props.accounts.items.map(account => new Account(account,this.context)); }
  get role(): RoleEntityReference { return new Role(this.props.role,this.context); }
  get profile(): ProfileEntityReference { return new Profile(this.props.profile,this.context); }
  get createdAt(): Date {return this.props.createdAt;}
  get updatedAt(): Date {return this.props.updatedAt;}
  get schemaVersion(): string {return this.props.schemaVersion;}


  public static async getNewMember<props extends MemberProps> (newprops:props,name:string,context:DomainExecutionContext): Promise<Member<props>> {
    let member = new Member(newprops,context);
    await member.requestSetMemberName(name);
    return member;
  }

  public async requestSetMemberName(memberName:ValueObjects.MemberName): Promise<void> {
    this.props.memberName = memberName.valueOf();
  }

}