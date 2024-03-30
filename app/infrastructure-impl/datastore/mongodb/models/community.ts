import { Schema, model, Model, ObjectId, PopulatedDoc } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
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
    domain: { type: String, required: false, maxlength: 500 },
    whiteLabelDomain: { type: String, required: false, maxlength: 500 },
    handle: { 
      type: String, 
      required: false, 
      maxlength: 50,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: true},
  },

  {
    timestamps: true, 
    versionKey: 'version',
  }
  ).index(
    { domain:1},
    { unique: true, 
      partialFilterExpression: 
      { 
        domain: { $exists: true }
      }
    }
  )
  .index(
    { whiteLabelDomain:1 },
    { unique: true, 
      partialFilterExpression: 
      { 
        whiteLabelDomain: { $exists: true }
      }
    }
  )
  .index(
    { handle:1 },
    { unique: true, 
      partialFilterExpression: 
      { 
        handle: { $exists: true } 
      }
    }
  )
);