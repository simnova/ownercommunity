import { Schema, Model, Types, PopulatedDoc, model, ObjectId } from 'mongoose';
import { Base, SubdocumentBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as Community from './../community';
import * as Property from './../property';
import * as Member from './../member';
import * as Service from './../service';
import { Ticket, TicketModel, ticketOptions } from './ticket';

export interface ActivityDetail extends SubdocumentBase {
  id: ObjectId;
  activityType: string;
  activityDescription: string;
  activityBy: PopulatedDoc<Member.Member>;
}

export interface Photo extends SubdocumentBase {
  id: ObjectId;
  documentId: string;
  description: string;
}

const ActivityDetailSchema = new Schema<ActivityDetail, Model<ActivityDetail>, ActivityDetail>(
  {
    activityType: {
      type: String,
      required: true,
      enum: ['CREATED', 'SUBMITTED', 'ASSIGNED', 'INPROGRESS', 'PAID', 'UPDATED', 'CLOSED'],
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

export interface ViolationTicket extends Ticket {
  community: PopulatedDoc<Community.Community>;
  property?: PopulatedDoc<Property.Property>;
  requestor: PopulatedDoc<Member.Member>;
  assignedTo?: PopulatedDoc<Member.Member>;
  service?: PopulatedDoc<Service.Service>;
  paymentTransactions?: Types.DocumentArray<Transaction>;
  title: string;
  description: string;
  status: string;
  priority: number;
  ticketType?: string;
  discriminatorKey: string;
  activityLog: Types.DocumentArray<ActivityDetail>;
  photos: Types.DocumentArray<Photo>;
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
  penaltyAmount: number;
  penaltyPaidDate: Date;
}

export interface Transaction extends SubdocumentBase {
  transactionId: string;
  description: string;
  type: string;
  clientReferenceCode: string;
  amountDetails: {
    amount: number;
    authorizedAmount: number;
    currency: string;
  };
  status: string;
  reconciliationId: string;
  isSuccess: boolean;
  transactionTime: Date;
  successTimestamp: Date;
  error: {
    code: string;
    message: string;
    timestamp: Date;
  };
}

const TransactionSchema = new Schema<Transaction, Model<Transaction>, Transaction>({
  transactionId: { type: String, required: true },
  transactionTime: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['PAYMENT', 'REFUND'] },
  clientReferenceCode: { type: String, required: true },
  amountDetails: {
    amount: { type: String, required: true },
    authorizedAmount: { type: String, required: true },
    currency: { type: String, required: true },
  },
  status: { type: String, required: true },
  reconciliationId: { type: String, required: true },
  isSuccess: { type: Boolean, required: true },
  successTimestamp: { type: Date, required: false },
  error: {
    code: { type: String, required: false },
    message: { type: String, required: false },
    timestamp: { type: Date, required: false },
  },
});

const ViolationTicketSchema = new Schema<ViolationTicket, Model<ViolationTicket>, ViolationTicket>(
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
    paymentTransactions: { type: [TransactionSchema], required: false, default: [] },
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
      enum: ['DRAFT', 'SUBMITTED', 'ASSIGNED', 'INPROGRESS', 'PAID', 'CLOSED'],
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
    penaltyAmount: {
      type: Number,
      required: true,
    },
    penaltyPaidDate: {
      type: Date,
      required: false,
    },
  },
  ticketOptions
);

export const ViolationTicketModel = TicketModel.discriminator('ViolationTicketType', ViolationTicketSchema);
