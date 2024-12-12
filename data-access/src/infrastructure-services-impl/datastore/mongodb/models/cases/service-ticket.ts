import { Schema, Model, PopulatedDoc, ObjectId, Types } from 'mongoose';
import { NestedPath, NestedPathOptions, SubdocumentBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as Community from './../community';
import * as Property from './../property';
import * as Member from './../member';
import * as Service from './../service';
import { Ticket, TicketModel, ticketOptions } from './ticket';

export interface ServiceTicketRevisionRequestChanges extends NestedPath {
  requestUpdatedAssignment: boolean;
  requestUpdatedStatus: boolean;
  requestUpdatedProperty: boolean;
}

export const ServiceTicketRevisionRequestChangesType = {
  requestUpdatedAssignment: { type: Boolean, required: true },
  requestUpdatedStatus: { type: Boolean, required: true },
  requestUpdatedProperty: { type: Boolean, required: true },
}

export interface ServiceTicketRevisionRequest extends NestedPath {
  requestedAt: Date;
  requestedBy: PopulatedDoc<Member.Member>;
  revisionSummary: string;
  requestedChanges: ServiceTicketRevisionRequestChanges;
  revisionSubmittedAt?: Date;
}

export const ServiceTicketRevisionRequestType = {
  requestedAt: { type: Date, required: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: true },
  revisionSummary: { type: String, required: true },
  requestedChanges: { type: ServiceTicketRevisionRequestChangesType, required: true, ...NestedPathOptions },
  revisionSubmittedAt: {type: Date, required: false}
}

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

export interface ServiceTicketMessage extends SubdocumentBase {
  id: ObjectId;
  sentBy: string;
  initiatedBy?: PopulatedDoc<Member.Member>;
  message: string;
  embedding?: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

const ServiceTicketMessageSchema = new Schema<ServiceTicketMessage, Model<ServiceTicketMessage>, ServiceTicketMessage>({
  sentBy: { type: String, required: true, enum: ['external', 'internal'] },
  initiatedBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true },
  message: { type: String, required: true, maxlength: 2000 },
  embedding: { type: String, required: false, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
  isHiddenFromApplicant: { type: Boolean, required: true, default: false },
});

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

export interface ServiceTicket extends Ticket {
  community: PopulatedDoc<Community.Community>;
  property?: PopulatedDoc<Property.Property>;
  requestor: PopulatedDoc<Member.Member>;
  assignedTo?: PopulatedDoc<Member.Member>;
  service?: PopulatedDoc<Service.Service>;
  title: string;
  description: string;
  status: string;
  priority: number;
  ticketType?: string;
  discriminatorKey: string;
  activityLog: Types.DocumentArray<ActivityDetail>;
  revisionRequest?: ServiceTicketRevisionRequest;
  messages: Types.DocumentArray<ServiceTicketMessage>;
  photos: Types.DocumentArray<Photo>;
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
  assignedVendor: string
}

const ServiceTicketSchema = new Schema<ServiceTicket, Model<ServiceTicket>, ServiceTicket>(
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
    service: { type: Schema.Types.ObjectId, ref: Service.ServiceModel.modelName, required: false, index: true },

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
    revisionRequest: { type: ServiceTicketRevisionRequestType, required: false, ...NestedPathOptions },
    messages: [ServiceTicketMessageSchema],
    photos: [PhotoSchema],
    hash: { type: String, required: false, maxlength: 100 },
    lastIndexed: { type: Date, required: false },
    updateIndexFailedDate: { type: Date, required: false },
    assignedVendor: { type: String, required: false }
  },
  ticketOptions,
);

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v

export const ServiceTicketModel = TicketModel.discriminator('ServiceTicketType', ServiceTicketSchema);
