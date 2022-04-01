import { Schema, model, Model, ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase, Patterns } from './interfaces/base';
import * as User from './user';
import * as Community from './community';
import * as Role from './role';

export interface Account extends EmbeddedBase {
  firstName:string;
  lastName?:string;
  user:PopulatedDoc<User.User> | ObjectId;
  statusCode:string;
  createdBy:PopulatedDoc<User.User> | ObjectId;
}

export interface Profile extends EmbeddedBase {
  name:string;
  email:string;
  bio:string;
  avatarDocumentId:string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showProfile: boolean;
  showProperties: boolean;
}

export interface Member extends Base {
  memberName: string;
  community: PopulatedDoc<Community.Community> | ObjectId;
  accounts: Types.DocumentArray<Account>
  role?:PopulatedDoc<Role.Role> | ObjectId;
  profile: Profile;
}

const schema = new Schema<Member, Model<Member>, Member>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    memberName: { type: String, required: true, maxlength: 200 },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true },    
    role: { type: Schema.Types.ObjectId, ref:Role.RoleModel.modelName, required: false, index: true },
    accounts: [{
      firstName: { type: String, required: true, maxlength: 500 },
      lastName: { type: String, required: false, maxlength: 500 },
      user: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false, index: true},
      statusCode: { 
        type: String, 
        enum: ['CREATED', 'ACCEPTED', 'REJECTED'],
        required: false,
        default: 'CREATED'
      },
      createdBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false, index: true},
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }    
    }],
    profile: {
      name: { type: String, required: false, maxlength: 500 },
      email: { type: String, required: false, match: Patterns.EMAIL_PATTERN, maxlength: 254},
      bio: { type: String, required: false, maxlength: 2000 },
      avatarDocumentId: { type: String, required: false },
      interests: { type: [{type: String, maxlength:40}], required: false, default: [] },
      showInterests: { type: Boolean, required: false , default: false},
      showEmail: { type: Boolean, required: false , default: false},
      showPhone: { type: Boolean, required: false , default: false},
      showLocation: { type: Boolean, required: false, default: false },
      showProperties: { type: Boolean, required: false, default: false },
    },
  },
  {
    ...BaseOptions
  });

schema.path('accounts').validate(function(accounts) {
  return accounts.length <= 5;
}, 'At most 5 accounts can exist per member');


export const MemberModel = model<Member>('Member',schema);