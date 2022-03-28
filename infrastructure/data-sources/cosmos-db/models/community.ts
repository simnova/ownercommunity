import { Schema, model, Model, ObjectId, PopulatedDoc } from 'mongoose';
import { Base, BaseOptions } from './interfaces/base';
import * as User from './user';

export interface Community extends Base {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdBy:PopulatedDoc<User.User> | ObjectId;
}

export const CommunityModel = model<Community>('Community',new Schema<Community, Model<Community>, Community>(
  {
    schemaVersion: { type: String, default: '1.0.0' },
    name: { 
      type: String, 
      required: true,
      maxlength: 200,
    },
    domain: { type: String, required: false, unique: true, maxlength: 500 },
    whiteLabelDomain: { type: String, required: false, unique: true, maxlength: 500 },
    handle: { 
      type: String, 
      required: false, 
      unique: true,
      maxlength: 50,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false, index: true},
  },
  {
    ...BaseOptions,
  }
  ).index(
    { domain:1, whiteLabelDomain:1, handle:1 },
    { partialFilterExpression: 
      { 
        domain: { $exists: true }, 
        whiteLabelDomain: { $exists: true }, 
        handle: { $exists: true } 
      }
    }
  )
);