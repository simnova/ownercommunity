import { AggregateRoot } from '../../../../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import * as ValueObjects from './member.value-objects';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { PropArray } from '../../../../../../seedwork/domain-seedwork/prop-array';
import { Account, AccountEntityReference, AccountProps } from './account';
import { EndUserRole, EndUserRoleEntityReference, EndUserRoleProps } from '../roles/end-user-role/end-user-role';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { Profile, ProfileEntityReference, ProfileProps } from './profile';
import { CommunityVisa } from "../community.visa";
import { CustomView, CustomViewEntityReference, CustomViewProps } from './custom-view';
import { TransactionProps } from '../../cases/violation-ticket/v1/transaction';
import { ValueObjectProps } from '../../../../../../seedwork/domain-seedwork/value-object';
export interface WalletProps extends ValueObjectProps {
  customerId: string;
  transactions: PropArray<TransactionProps>;
}
export interface MemberProps extends EntityProps {
  memberName: string;
  cybersourceCustomerId: string;
  readonly community: CommunityProps;
  setCommunityRef: (community: CommunityEntityReference) => void;
  readonly accounts: PropArray<AccountProps>;
  readonly role: EndUserRoleProps;
  setRoleRef: (role: EndUserRoleEntityReference) => void;
  readonly profile: ProfileProps;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;
  readonly customViews: PropArray<CustomViewProps>;
}

export interface MemberEntityReference extends Readonly<Omit<MemberProps, 'community' | 'setCommunityRef' | 'accounts' | 'role' | 'setRoleRef' | 'profile' | 'customViews'>> {
  readonly community: CommunityEntityReference;
  readonly accounts: ReadonlyArray<AccountEntityReference>;
  readonly role: EndUserRoleEntityReference;
  readonly profile: ProfileEntityReference;
  readonly customViews: ReadonlyArray<CustomViewEntityReference>;
}

export class Member<props extends MemberProps> extends AggregateRoot<props> implements MemberEntityReference {
  private isNew: boolean = false;
  private readonly visa: CommunityVisa;
  constructor(props: props, private readonly context: DomainExecutionContext) {
    super(props);
    this.visa = context.domainVisa.forMember(this);
  }

  get id() {
    return this.props.id;
  }
  get memberName() {
    return this.props.memberName;
  }

  get cybersourceCustomerId() {
    return this.props.cybersourceCustomerId;
  }

  get community(): CommunityEntityReference {
    return new Community(this.props.community, this.context);
  }
  get accounts(): ReadonlyArray<Account> {
    return this.props.accounts.items.map((account) => new Account(account, this.context, this.visa));
  } // return account as it's an embedded document not a reference (allows editing)
  get role(): EndUserRoleEntityReference {
    return new EndUserRole(this.props.role, this.context);
  }
  get profile() {
    return new Profile(this.props.profile, this.visa);
  } // return profile as it's an embedded document not a reference (allows editing)
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get schemaVersion() {
    return this.props.schemaVersion;
  }

  get customViews(): ReadonlyArray<CustomView> {
    return this.props.customViews.items.map((customView) => new CustomView(customView, this.context, this.visa));
  } // return customView as it's an embedded document not a reference (allows editing)

  public static getNewInstance<props extends MemberProps>(newProps: props, name: string, community: CommunityEntityReference, context: DomainExecutionContext): Member<props> {
    let member = new Member(newProps, context);
    member.isNew = true;
    member.MemberName = name;
    member.Community = community;
    member.isNew = false;
    return member;
  }
  // using SET from TS 5.1

  set MemberName(memberName: ValueObjects.MemberName) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set member name');
    }
    this.props.memberName = memberName.valueOf();
  }

  set CyberSourceCustomerId(cybersourceCustomerId: ValueObjects.CyberSourceCustomerId) {
    this.props.cybersourceCustomerId = cybersourceCustomerId.valueOf();
  }
  
  set Community(community: CommunityEntityReference) {
    this.props.setCommunityRef(community);
  }

  set Role(role: EndUserRoleEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set role');
    }
    this.props.setRoleRef(role);
  }

  public requestNewAccount(): Account {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set role');
    }
    return new Account(this.props.accounts.getNewItem(), this.context, this.visa);
  }
  public requestAddAccount(accountRef: AccountProps): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set role');
    }
    this.props.accounts.addItem(accountRef);
  }
  public requestRemoveAccount(accountRef: AccountProps): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set role');
    }
    this.props.accounts.removeItem(accountRef);
  }
  // CustomViews
  public requestNewCustomView(): CustomView {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set custom view');
    }
    return new CustomView(this.props.customViews.getNewItem(), this.context, this.visa);
  }

  public requestRemoveCustomView(customView: CustomView): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.canManageMembers || permissions.isSystemAccount)) {
      throw new Error('Cannot set custom view');
    }
    console.log(customView.name);
    this.props.customViews.removeItem(customView.props);
  }
}
