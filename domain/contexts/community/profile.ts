import { Entity, EntityProps } from "../../shared/entity";
import { DomainExecutionContext } from "../context";

export interface ProfileProps extends EntityProps {
  name: string;
  email: string;
  bio: string;
  avatarDocumentId: string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showProfile: boolean;
  showProperties: boolean;
}

export interface ProfileEntityReference extends Readonly<ProfileProps> {}

export class Profile extends Entity<ProfileProps> implements ProfileEntityReference {
  constructor(props: ProfileProps, private readonly context: DomainExecutionContext) { super(props); }

  get name() {return this.props.name;}
  get email() {return this.props.email;}
  get bio() {return this.props.bio;}
  get avatarDocumentId() {return this.props.avatarDocumentId;}
  get interests() {return this.props.interests;}
  get showInterests() {return this.props.showInterests;}
  get showEmail() {return this.props.showEmail;}
  get showPhone() {return this.props.showPhone;}
  get showLocation() {return this.props.showLocation;}
  get showProfile() {return this.props.showProfile;}
  get showProperties() {return this.props.showProperties;}

}