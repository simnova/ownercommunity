import { Member, Account, Profile } from '../../../../infrastructure/data-sources/cosmos-db/models/member';

import { Member as MemberDO, MemberProps } from '../../../../domain/contexts/community/member';
import { MongooseDomainAdapater, MongoosePropArray } from '../mongo-domain-adapter';
import { MongoTypeConverter } from '../mongo-type-converter';
import { AccountProps } from '../../../contexts/community/account';
import { UserDomainAdapter } from './user-domain-adapter';
import { CommunityProps } from '../../../contexts/community/community';
import { CommunityDomainAdapter } from './community-domain-adapter';
import { RoleDomainAdapter } from './role-domain-adapter';
import { DomainExecutionContext } from '../../../contexts/context';
import { RoleProps } from '../../../contexts/community/role';
import { ProfileProps } from '../../../contexts/community/profile';

export class MemberConverter extends MongoTypeConverter<DomainExecutionContext,Member,MemberDomainAdapter,MemberDO<MemberDomainAdapter>> {
  constructor() {
    super(MemberDomainAdapter, MemberDO);
  }
}

export class MemberDomainAdapter extends MongooseDomainAdapater<Member> implements MemberProps {
  constructor(props: Member) { super(props); }

  get memberName() {return this.props.memberName;}
  set memberName(memberName: string) {this.props.memberName = memberName;}

  get community() {return new CommunityDomainAdapter(this.props.community);}
  set Community(community: CommunityProps) {
    this.props.set('community',community.id);
  }

  public accounts = new MongoosePropArray(this.props.accounts, AccountDomainAdapter);

  get role() {return new RoleDomainAdapter(this.props.role);}
  set role(role: RoleProps) {
    this.props.set('role',role.id);
  }

  get profile() { return new ProfileDomainAdapter(this.props.profile); }
  set profile(profile: ProfileProps) {
    this.props.set('profile',profile.id);
  }
}

export class AccountDomainAdapter implements AccountProps {
  constructor(public readonly props: Account) {}
  public get id(): string { return this.props.id.valueOf() as string; }

  get firstName() {return this.props.firstName;}
  set firstName(firstName: string) {this.props.firstName = firstName;}

  get lastName() {return this.props.lastName;}
  set lastName(lastName: string) {this.props.lastName = lastName;}

  get user(){
    if(this.props.user) { return new UserDomainAdapter(this.props.user);}
  }
  set user(user) {
    this.props.set('user', user.props.id);
  }

  get statusCode() {return this.props.statusCode;}
  set statusCode(statusCode: string) {this.props.statusCode = statusCode;}

  get createdBy(){
    if(this.props.createdBy) { return new UserDomainAdapter(this.props.createdBy);}
  }
  set createdBy(createdBy) {
    this.props.set('createdBy', createdBy.props.id);
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

  get showPhone() {return this.props.showPhone;}
  set showPhone(showPhone) {this.props.showPhone = showPhone;}

  get showLocation() {return this.props.showLocation;}
  set showLocation(showLocation) {this.props.showLocation = showLocation;}

  get showProfile() {return this.props.showProfile;}
  set showProfile(showProfile) {this.props.showProfile = showProfile;}

  get showProperties() {return this.props.showProperties;}
  set showProperties(showProperties) {this.props.showProperties = showProperties;}

}