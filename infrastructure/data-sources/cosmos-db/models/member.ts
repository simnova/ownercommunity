import { Schema, model, Model,ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase, Patterns } from './interfaces/base';
import * as User from './user';
import * as Community from './community';

export interface Account extends EmbeddedBase {
  firstName:string;
  lastName?:string;
  role?:ObjectId;
  user:PopulatedDoc<User.User> | ObjectId;
}

export interface Profile extends EmbeddedBase {
  name:string;
  email:string;
  bio:string;
  avatar:string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showProfile: boolean;
  showProperties: boolean;
}

export interface Member extends Base {
  community: ObjectId;
  accounts: Types.DocumentArray<Account>
  memberName: string;
  profile: Profile;
}

export const MemberModel = model<Member>('Member', new Schema<Member, Model<Member>, Member>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: false, index: true, unique: true },    
    memberName: { type: String, required: true },
    accounts: [{
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
      user: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false, index: true, unique: true },
      role: { type: Schema.Types.ObjectId, required: false, index: true, unique: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }    
    }],
    profile: {
      name: { type: String, required: false },
      email: { type: String, required: false, match: Patterns.EMAIL_PATTERN, maxlength: 254},
      bio: { type: String, required: false },
      avatar: { type: String, required: false },
      interests: { type: [String], required: false},
      showInterests: { type: Boolean, required: false , default: false},
      showEmail: { type: Boolean, required: false , default: false},
      showPhone: { type: Boolean, required: false , default: false},
      showLocation: { type: Boolean, required: false, default: false },
      showProperties: { type: Boolean, required: false, default: false },
    },
  },
  {
    ...BaseOptions 
  }
));