import { Schema, model, Model, PopulatedDoc, ObjectId, Types } from 'mongoose';
import { Base, SubdocumentBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as Community from './community';
import * as Property from './property';
import * as Member from './member';
import * as Service from './service';

export interface ActivityDetail extends SubdocumentBase {
  id: ObjectId;
  activityType: string;
  activityDescription: string;
  activityBy: PopulatedDoc<Member.Member>;
}
const ActivityDetailSchema = new Schema<ActivityDetail, Model<ActivityDetail>, ActivityDetail>(
  {
    activityType: {
      type: String,
      required: true,
      enum: ['CREATED', 'SUBMITTED', 'ASSIGNED', 'INPROGRESS', 'UPDATED', 'COMPLETED', 'CLOSED'],
    },
    activityDescription: {
      type: String,
      maxlength: 2000,
      required: true,
    },
    activityBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: true, index: true },
  },
  { 
    timestamps: true, 
    versionKey: 'version',
  }
);

export interface Photo extends SubdocumentBase {
  id: ObjectId;
  documentId: string;
  description: string;
}
export const PhotoSchema = new Schema<Photo, Model<Photo>, Photo>({
  description: {
    type: String,
    required: false,
    maxlength: 300,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  documentId: { type: String, required: true },
});

export interface ServiceTicket extends Base {
  community: PopulatedDoc<Community.Community>;
  property?: PopulatedDoc<Property.Property>;
  requestor: PopulatedDoc<Member.Member>;
  assignedTo?: PopulatedDoc<Member.Member>;
  service?: PopulatedDoc<Service.Service>;
  title: string;
  description: string;
  status: string;
  priority: number;
  activityLog: Types.DocumentArray<ActivityDetail>;
  photos: Types.DocumentArray<Photo>;
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
}

export const ServiceTicketModel = model<ServiceTicket>(
  'ServiceTicket',
  new Schema<ServiceTicket, Model<ServiceTicket>, ServiceTicket>(
    {
      schemaVersion: {
        type: String,
        default: '1.0.0',
        required: false,
      },
      community: { type: Schema.Types.ObjectId, ref: Community.CommunityModel.modelName, required: true, index: true },
      property: { type: Schema.Types.ObjectId, ref: Property.PropertyModel.modelName, required: false, index: true },
      requestor: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: true, index: true },
      assignedTo: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true },
      service: { type: Schema.Types.ObjectId, ref:Service.ServiceModel.modelName, required: false, index: true },

      title: {
        type: String,
        required: true,
        maxlength: 200,
      },
      description: {
        type: String,
        required: true,
        maxlength: 2000,
      },
      status: {
        type: String,
        enum: ['DRAFT', 'SUBMITTED', 'ASSIGNED', 'INPROGRESS', 'COMPLETED', 'CLOSED'],
        default: 'DRAFT',
        required: true,
      },
      priority: {
        type: Number,
        required: true,
        default: 5,
        min: 1,
        max: 5,
      },
      activityLog: [ActivityDetailSchema],
      photos: [PhotoSchema],
      hash: { type: String, required: false, maxlength: 100 },
      lastIndexed: { type: Date, required: false },
      updateIndexFailedDate: { type: Date, required: false },
    },
    {
      timestamps: true, 
      versionKey: 'version',
      shardKey: { community: 1 },
    }
  )
);
