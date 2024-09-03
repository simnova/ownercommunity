import { Member, Account, Profile, CustomView } from '../../models/member';
import { Member as MemberDO, MemberProps } from '../../../../../components/domain/contexts/community/member/member';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { MemberAccountProps } from '../../../../../components/domain/contexts/community/member/member-account';
import { CommunityEntityReference } from '../../../../../components/domain/contexts/community/community/community';
import { CommunityDomainAdapter } from '../../../../../components/community/data-impl-mongodb/community.mongo-domain-adapter';
import { EndUserRoleDomainAdapter } from '../roles/end-user-role/end-user-role.domain-adapter';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { EndUserRoleEntityReference } from '../../../../../components/domain/contexts/community/roles/end-user-role/end-user-role';
import { MemberProfileProps } from '../../../../../components/domain/contexts/community/member/member-profile';
import { MemberCustomViewProps } from '../../../../../components/domain/contexts/community/member/member-custom-view';
import { EndUserEntityReference } from '../../../../../components/domain/contexts/users/end-user/end-user';
import { EndUserDomainAdapter } from '../users/end-user/end-user.domain-adapter';

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

  get cybersourceCustomerId() {
    return this.doc.cybersourceCustomerId;
  }

  set cybersourceCustomerId(cybersourceCustomerId) {
    this.doc.cybersourceCustomerId = cybersourceCustomerId;
  }

  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community);
    }
    return undefined;
  }
  setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community.id);
  }

  get accounts() {
    return new MongoosePropArray(this.doc.accounts, AccountDomainAdapter);
  }

  get role() {
    if (this.doc.role) {
      return new EndUserRoleDomainAdapter(this.doc.role);
    }
    return undefined;
  }
  setRoleRef(role: EndUserRoleEntityReference) {
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

export class AccountDomainAdapter implements MemberAccountProps {
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
      return new EndUserDomainAdapter(this.doc.user);
    }
    return undefined;
  }
  setUserRef(user: EndUserEntityReference) {
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
      return new EndUserDomainAdapter(this.doc.createdBy);
    }
    return undefined;
  }
  setCreatedByRef(createdBy: EndUserEntityReference) {
    this.doc.set('createdBy', createdBy.id);
  }
}

export class CustomViewDomainAdapter implements MemberCustomViewProps {
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

export class ProfileDomainAdapter implements MemberProfileProps {
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
