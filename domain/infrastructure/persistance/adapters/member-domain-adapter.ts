import { Member, Account, Profile } from '../../../../infrastructure/data-sources/cosmos-db/models/member';

import { Member as MemberDO, MemberProps } from '../../../../domain/contexts/community/member';
import { MongooseDomainAdapter, MongoosePropArray } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { AccountProps } from '../../../contexts/community/account';
import { UserDomainAdapter } from './user-domain-adapter';
import { CommunityEntityReference, CommunityProps } from '../../../contexts/community/community';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { RoleDomainAdapter } from './role-domain-adapter';
import { DomainExecutionContext } from '../../../contexts/context';
import { RoleEntityReference, RoleProps } from '../../../contexts/community/role';
import { ProfileProps } from '../../../contexts/community/profile';
import { UserEntityReference } from '../../../contexts/user/user';
import { AccountsListBySubscriptionNextResponse } from '@azure/arm-maps';

export class MemberConverter extends MongoTypeConverter<DomainExecutionContext,Member,MemberDomainAdapter,MemberDO<MemberDomainAdapter>> {
  constructor() {
    super(MemberDomainAdapter, MemberDO);
  }
}

export class MemberDomainAdapter extends MongooseDomainAdapter<Member> implements MemberProps {
  constructor(props: Member) { super(props); }

  get memberName() {return this.props.memberName;}
  set memberName(memberName) {this.props.memberName = memberName;}

  get community() {
    if(this.props.community) {return new CommunityDomainAdapter(this.props.community);}
  }
  setCommunityRef(community: CommunityEntityReference) {
    this.props.set('community',community.id);
  }

  get accounts() {
    return new MongoosePropArray(this.props.accounts, AccountDomainAdapter);
  } 

  get role() {
    if(this.props.role) {return new RoleDomainAdapter(this.props.role);}
  }
  setRoleRef(role: RoleEntityReference) {
    this.props.set('role',role.id);
  }

  get profile() { 
    if(!this.props.profile){this.props.set('profile',{});} //embedded - ensure it exists
    return new ProfileDomainAdapter(this.props.profile);
  }
}

export class AccountDomainAdapter implements AccountProps {
  constructor(public readonly props: Account) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get firstName() {return this.props.firstName;}
  set firstName(firstName) {this.props.firstName = firstName;}

  get lastName() {return this.props.lastName;}
  set lastName(lastName) {this.props.lastName = lastName;}

  get user(){
    if(this.props.user) { return new UserDomainAdapter(this.props.user);}
  }
  setUserRef(user: UserEntityReference) {
    this.props.set('user', user['props']['props']);
  }

  get statusCode() {return this.props.statusCode;}
  set statusCode(statusCode) {this.props.statusCode = statusCode;}

  get createdBy(){
    if(this.props.createdBy) { return new UserDomainAdapter(this.props.createdBy);}
  }
  setCreatedByRef(createdBy: UserEntityReference) {
    this.props.set('createdBy', createdBy.id);
  }
}

export class ProfileDomainAdapter implements ProfileProps {
  constructor(public readonly props: Profile) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get name() {return this.props.name;}
  set name(name) {this.props.name = name;}

  get email() {return this.props.email;}
  set email(email) {this.props.email = email;}

  get bio() {return this.props.bio;}
  set bio(bio) {this.props.bio = bio;}

  get avatarDocumentId() {return this.props.avatarDocumentId;}
  set avatarDocumentId(avatarDocumentId) {this.props.avatarDocumentId = avatarDocumentId;}

  get interests() {return this.props.interests;}
  set interests(interests) {this.props.interests = interests;}

  get showInterests() {return this.props.showInterests;}
  set showInterests(showInterests) {this.props.showInterests = showInterests;}

  get showEmail() {return this.props.showEmail;}
  set showEmail(showEmail) {this.props.showEmail = showEmail;}

  get showProfile() {return this.props.showProfile;}
  set showProfile(showProfile) {this.props.showProfile = showProfile;}

  get showLocation() {return this.props.showLocation;}
  set showLocation(showLocation) {this.props.showLocation = showLocation;}

  get showProperties() {return this.props.showProperties;}
  set showProperties(showProperties) {this.props.showProperties = showProperties;}

}