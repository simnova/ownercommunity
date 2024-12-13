import { Schema, model, Model, ObjectId, PopulatedDoc } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as EndUser from './users/end-user';


export interface ApprovedVendor {
  vendorId: string; //ref of vendor user record form mongoDB
  displayName: string; //name of vendor user
  email: string; //email of vendor user
  approvedBy: string; //ref of staff user record from mongoDB
  approvedAt: Date;
}
export interface Community extends Base {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  approvedVendors?: ApprovedVendor[];
  createdBy:PopulatedDoc<EndUser.EndUser> | ObjectId;
}

export const approvedVendorSchema = new Schema<ApprovedVendor, Model<ApprovedVendor>, ApprovedVendor>({
  vendorId: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  approvedBy: { type: String, required: true },
  approvedAt: { type: Date, required: true },
})

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
    approvedVendors: { type: [approvedVendorSchema], required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: EndUser.EndUserModel.modelName, required: true},
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