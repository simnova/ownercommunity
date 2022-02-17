import { Schema, model, Model, PopulatedDoc, ObjectId } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase } from './interfaces/base';
import * as Community from './community';
import * as Property from './property';
import * as Member from './member';

export interface ActivityDetail extends EmbeddedBase {
  activityType: string;
  activityDate: Date;
  activityDescription: string;
  activityBy: PopulatedDoc<Member.Member>;
}

export interface ServiceTicket extends Base {
  community: ObjectId;
  property?: PopulatedDoc<Property.Property>;
  requestor: PopulatedDoc<Property.Property>;
  assignedTo?: PopulatedDoc<Member.Member>;
  title: string;
  description: string;
  status: string;
  priority: number;
  activityLog: [ActivityDetail];
  photos:[{
    description: string;
    photo: string;
  }]
}

export const ServiceTicketModel = model<ServiceTicket>('ServiceTicket', new Schema<ServiceTicket, Model<ServiceTicket>, ServiceTicket>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true, unique: true },    
    property: { type: Schema.Types.ObjectId, ref:Property.PropertyModel.modelName, required: false, index: true, unique: true },
    requestor: { type: Schema.Types.ObjectId, ref:Property.PropertyModel.modelName, required: true, index: true, unique: true },
    assignedTo: { type: Schema.Types.ObjectId, ref:Member.MemberModel.modelName, required: false, index: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: Number, required: true },
    activityLog: [{
      activityType: { type: String, required: true },
      activityDate: { type: Date, default: Date.now },
      activityDescription: { type: String, required: true },
      activityBy: { type: Schema.Types.ObjectId, ref:Member.MemberModel.modelName, required: true, index: true, unique: true }
    }],
    photos: [{
      description: { type: String, required: false },
      photo: { type: String, required: false },
    }]

  },
  {
    ...BaseOptions 
  }
));