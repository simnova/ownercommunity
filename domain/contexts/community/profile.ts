import { ValueObject, ValueObjectProps } from '../../shared/value-object';
import { DomainExecutionContext } from '../context';
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
  constructor(props: ProfileProps, private readonly visa: CommunityVisa) { super(props); }

  get name() {return this.props.name;}
  get email() {return this.props.email;}
  get bio() {return this.props.bio;}
  get avatarDocumentId() {return this.props.avatarDocumentId;}
  get interests() {return this.props.interests;}
  get showInterests() {return this.props.showInterests;}
  get showEmail() {return this.props.showEmail;}
  get showProfile() {return this.props.showProfile;}
  get showLocation() {return this.props.showLocation;}
  get showProperties() {return this.props.showProperties;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageMembers ||
      (permissions.canEditOwnMemberProfile && permissions.isEditingOwnMemberAccount))) {
      throw new Error('You do not have permission to update this profile');
    }
  }

  requestSetName(name: ValueObjects.Name) {
    this.validateVisa();
    this.props.name = name.valueOf();
  }
  requestSetEmail(email: ValueObjects.Email) {
    this.validateVisa();
    this.props.email = email.valueOf();
  }
  requestSetBio(bio: ValueObjects.Bio) {
    this.validateVisa();
    this.props.bio = bio.valueOf();
  }
  requestSetAvatarDocumentId(avatarDocumentId: string) {
    this.validateVisa();
    this.props.avatarDocumentId = avatarDocumentId;
  }
  requestSetInterests(interests: ValueObjects.Interests) {
    this.validateVisa();
    this.props.interests = interests.valueOf();
  }
  requestSetShowInterests(showInterests: boolean) {
    this.validateVisa();
    this.props.showInterests = showInterests;
  }
  requestSetShowEmail(showEmail: boolean) {
    this.validateVisa();
    this.props.showEmail = showEmail;
  }
  requestSetShowProfile(showProfile: boolean) {
    this.validateVisa();
    this.props.showProfile = showProfile;
  }
  requestSetShowLocation(showLocation: boolean) {
    this.validateVisa();
    this.props.showLocation = showLocation;
  }
  requestSetShowProperties(showProperties: boolean) {
    this.validateVisa();
    this.props.showProperties = showProperties;
  }
  
}