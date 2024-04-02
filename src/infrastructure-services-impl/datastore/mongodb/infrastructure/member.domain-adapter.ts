import { Member, Account, Profile, CustomView } from '../models/member';

import { Member as MemberDO, MemberProps } from '../../../../app/domain/contexts/community/member';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { AccountProps } from '../../../../app/domain/contexts/community/account';
import { UserDomainAdapter } from './user.domain-adapter';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community';
import { CommunityDomainAdapter } from './community.domain-adapter';
import { RoleDomainAdapter } from './role.domain-adapter';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { RoleEntityReference } from '../../../../app/domain/contexts/community/role';
import { ProfileProps } from '../../../../app/domain/contexts/community/profile';
import { UserEntityReference } from '../../../../app/domain/contexts/user/user';
import { CustomViewProps } from '../../../../app/domain/contexts/community/custom-view';

export class MemberConverter extends MongoTypeConverter<DomainExecutionContext, Member, MemberDomainAdapter, MemberDO<MemberDomainAdapter>> {
  constructor() {
    super(MemberDomainAdapter, MemberDO);
  }
}

export class MemberDomainAdapter extends MongooseDomainAdapter<Member> implements MemberProps {
  get memberName() {
    return this.doc.memberName;
  }
  set memberName(memberName) {
    this.doc.memberName = memberName;
  }

  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community);
    }
  }
  setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community.id);
  }

  get accounts() {
    return new MongoosePropArray(this.doc.accounts, AccountDomainAdapter);
  }

  get role() {
    if (this.doc.role) {
      return new RoleDomainAdapter(this.doc.role);
    }
  }
  setRoleRef(role: RoleEntityReference) {
    this.doc.set('role', role.id);
  }

  get profile() {
    if (!this.doc.profile) {
      this.doc.set('profile', {});
    } //embedded - ensure it exists
    return new ProfileDomainAdapter(this.doc.profile);
  }

  get customViews() {
    return new MongoosePropArray(this.doc.customViews, CustomViewDomainAdapter);
  }
}

export class AccountDomainAdapter implements AccountProps {
  constructor(public readonly doc: Account) {}
  public get id(): string {
    return this.doc.id.valueOf() as string;
  }

  get firstName() {
    return this.doc.firstName;
  }
  set firstName(firstName) {
    this.doc.firstName = firstName;
  }

  get lastName() {
    return this.doc.lastName;
  }
  set lastName(lastName) {
    this.doc.lastName = lastName;
  }

  get user() {
    if (this.doc.user) {
      return new UserDomainAdapter(this.doc.user);
    }
  }
  setUserRef(user: UserEntityReference) {
    this.doc.set('user', user['props']['doc']);
  }

  get statusCode() {
    return this.doc.statusCode;
  }
  set statusCode(statusCode) {
    this.doc.statusCode = statusCode;
  }

  get createdBy() {
    if (this.doc.createdBy) {
      return new UserDomainAdapter(this.doc.createdBy);
    }
  }
  setCreatedByRef(createdBy: UserEntityReference) {
    this.doc.set('createdBy', createdBy.id);
  }
}

export class CustomViewDomainAdapter implements CustomViewProps {
  constructor(public readonly doc: CustomView) {}
  public get id(): string {
    return this.doc.id.valueOf() as string;
  }

  get name() {
    return this.doc.name;
  }
  set name(name) {
    this.doc.name = name;
  }

  get type() {
    return this.doc.type;
  }
  set type(type) {
    this.doc.type = type;
  }

  get filters() {
    return this.doc.filters;
  }
  set filters(filters) {
    this.doc.filters = filters;
  }

  get sortOrder() {
    return this.doc.sortOrder;
  }
  set sortOrder(sortOrder) {
    this.doc.sortOrder = sortOrder;
  }

  get columnsToDisplay() {
    return this.doc.columnsToDisplay;
  }
  set columnsToDisplay(columnsToDisplay) {
    this.doc.columnsToDisplay = columnsToDisplay;
  }
}

export class ProfileDomainAdapter implements ProfileProps {
  constructor(public readonly props: Profile) {}

  get name() {
    return this.props.name;
  }
  set name(name) {
    this.props.name = name;
  }

  get email() {
    return this.props.email;
  }
  set email(email) {
    this.props.email = email;
  }

  get bio() {
    return this.props.bio;
  }
  set bio(bio) {
    this.props.bio = bio;
  }

  get avatarDocumentId() {
    return this.props.avatarDocumentId;
  }
  set avatarDocumentId(avatarDocumentId) {
    this.props.avatarDocumentId = avatarDocumentId;
  }

  get interests() {
    return this.props.interests;
  }
  set interests(interests) {
    this.props.interests = interests;
  }

  get showInterests() {
    return this.props.showInterests;
  }
  set showInterests(showInterests) {
    this.props.showInterests = showInterests;
  }

  get showEmail() {
    return this.props.showEmail;
  }
  set showEmail(showEmail) {
    this.props.showEmail = showEmail;
  }

  get showProfile() {
    return this.props.showProfile;
  }
  set showProfile(showProfile) {
    this.props.showProfile = showProfile;
  }

  get showLocation() {
    return this.props.showLocation;
  }
  set showLocation(showLocation) {
    this.props.showLocation = showLocation;
  }

  get showProperties() {
    return this.props.showProperties;
  }
  set showProperties(showProperties) {
    this.props.showProperties = showProperties;
  }
}
