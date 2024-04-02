import { ValueObject, ValueObjectProps } from '../../../../../seedwork/domain-seedwork/value-object';
import { CommunityVisa } from '../iam/community-visa';
import * as ValueObjects from './profile.value-objects';

export interface ProfileProps extends ValueObjectProps {
  name: string;
  email: string;
  bio: string;
  avatarDocumentId: string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showProfile: boolean;
  showLocation: boolean;
  showProperties: boolean;
}

export interface ProfileEntityReference extends Readonly<ProfileProps> {}

export class Profile extends ValueObject<ProfileProps> implements ProfileEntityReference {
  constructor(props: ProfileProps, private readonly visa: CommunityVisa) {
    super(props);
  }

  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get bio() {
    return this.props.bio;
  }
  get avatarDocumentId() {
    return this.props.avatarDocumentId;
  }
  get interests() {
    return this.props.interests;
  }
  get showInterests() {
    return this.props.showInterests;
  }
  get showEmail() {
    return this.props.showEmail;
  }
  get showProfile() {
    return this.props.showProfile;
  }
  get showLocation() {
    return this.props.showLocation;
  }
  get showProperties() {
    return this.props.showProperties;
  }

  private validateVisa() {
    if (!this.visa.determineIf((permissions) => permissions.canManageMembers || (permissions.canEditOwnMemberProfile && permissions.isEditingOwnMemberAccount))) {
      throw new Error('You do not have permission to update this profile');
    }
  }

  // setters using TS 5.1

  // it can't be called "name" as there is already name
  // property of this class so am calling is Name instead
  set Name(name: ValueObjects.Name) {
    this.validateVisa();
    this.props.name = name.valueOf();
  }

  set Email(email: ValueObjects.Email) {
    this.validateVisa();
    this.props.email = email.valueOf();
  }

  set Bio(bio: ValueObjects.Bio) {
    this.validateVisa();
    this.props.bio = bio.valueOf();
  }

  set AvatarDocumentId(avatarDocumentId: string) {
    this.validateVisa();
    this.props.avatarDocumentId = avatarDocumentId;
  }

  set Interests(interests: ValueObjects.Interests) {
    this.validateVisa();
    this.props.interests = interests.valueOf();
  }

  set ShowInterests(showInterests: boolean) {
    this.validateVisa();
    this.props.showInterests = showInterests;
  }

  set ShowEmail(showEmail: boolean) {
    this.validateVisa();
    this.props.showEmail = showEmail;
  }

  set ShowProfile(showProfile: boolean) {
    this.validateVisa();
    this.props.showProfile = showProfile;
  }

  set ShowLocation(showLocation: boolean) {
    this.validateVisa();
    this.props.showLocation = showLocation;
  }

  set ShowProperties(showProperties: boolean) {
    this.validateVisa();
    this.props.showProperties = showProperties;
  }
}
