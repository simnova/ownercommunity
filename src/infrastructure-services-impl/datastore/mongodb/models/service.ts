import { Schema, model, Model, ObjectId, PopulatedDoc } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as  Community from './community';

export interface Service extends Base {
  serviceName: string;
  description: string;
  community: PopulatedDoc<Community.Community> | ObjectId;
  isActive: boolean;
}

export const ServiceModel = model<Service>('Service',new Schema<Service, Model<Service>, Service>(
  {
    schemaVersion: { type: String, default: '1.0.0' },
    serviceName: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: false, maxlength: 500 },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true },    
    isActive: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true, 
    versionKey: 'version',
    shardKey: {community:1} 
  }
  ).index(
    { serviceName: 1, community: 1 }, { unique: true }
  )
);