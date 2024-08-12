import { Schema, Model, Types, PopulatedDoc, ObjectId } from 'mongoose';
import { NestedPath, SubdocumentBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as Community from './../community';
import * as Property from './../property';
import * as Member from './../member';
import * as Service from './../service';
import { Ticket, TicketModel, ticketOptions } from './ticket';

export interface ViolationTicketRevisionRequestedChanges extends NestedPath {
  requestUpdatedAssignment: boolean;
  requestUpdatedStatus: boolean;
  requestUpdatedProperty: boolean;
  requestUpdatedPaymentTransaction: boolean;
}

export interface ViolationTicketRevisionRequest extends NestedPath {
  requestedAt: Date;
  requestedBy: PopulatedDoc<Member.Member>;
  revisionSummary: string;
  requestedChanges: ViolationTicketRevisionRequestedChanges;
  revisionSubmittedAt?: Date;
}

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

export interface ViolationTicketMessage extends SubdocumentBase {
  id: ObjectId;
  sentBy: string;
  initiatedBy?: PopulatedDoc<Member.Member>;
  message: string;
  embedding?: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

const ViolationTicketMessageSchema = new Schema<ViolationTicketMessage, Model<ViolationTicketMessage>, ViolationTicketMessage>({
  sentBy: { type: String, required: true, enum: ['external', 'internal'] },
  initiatedBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true },
  message: { type: String, required: true, maxlength: 2000 },
  embedding: { type: String, required: false, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
  isHiddenFromApplicant: { type: Boolean, required: true, default: false },
});

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
  financeDetails: FinanceDetails;
  revisionRequest?: ViolationTicketRevisionRequest;
  title: string;
  description: string;
  status: string;
  priority: number;
  ticketType?: string;
  discriminatorKey: string;
  activityLog: Types.DocumentArray<ActivityDetail>;
  messages: Types.DocumentArray<ViolationTicketMessage>;
  photos: Types.DocumentArray<Photo>;
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
}

export interface TransactionReference extends NestedPath {
  vendor: string;
  referenceId: string;
  completedOn: Date;
}

export interface AdhocTransaction extends SubdocumentBase {
  id: ObjectId;
  amount: number;
  requestedBy: PopulatedDoc<Member.Member>;
  requestedOn: Date;
  reason: string;
  approval: Approval;
  transactionReference?: TransactionReference;
  financeReference?: FinanceReference;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission extends NestedPath {
  amount: number;
  transactionReference: TransactionReference;
}
export interface Transaction extends NestedPath {
  submission?: Submission;
  adhocTransactions?: Types.DocumentArray<AdhocTransaction>;
}

export interface GlTransaction extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  amount: number;
  recognitionDate: Date;
  completedOn?: Date;
}

export interface RevenueRecognition extends NestedPath {
  submission?: GlTransaction,
  recognition?: GlTransaction
}

export interface FinanceDetails extends NestedPath {
  serviceFee: number;
  transactions?: Transaction;
  revenueRecognition?: RevenueRecognition;
}

export interface FinanceReference extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  completedOn?: Date;
}

const TransactionReferenceSchema = new Schema<TransactionReference, Model<TransactionReference>, TransactionReference>({
  vendor: { type: String, required: false },
  referenceId: { type: String, required: false },
  completedOn: { type: Date, required: false },
});

const FinanceReference = new Schema<FinanceReference, Model<FinanceReference>, FinanceReference>({
  debitGlAccount: { type: String, required: false },
  creditGlAccount: { type: String, required: false },
  completedOn: { type: Date, required: false },
});

export interface Approval extends NestedPath {
  isApplicantApprovalRequired?: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;
}

const ApprovalSchema = new Schema<Approval, Model<Approval>, Approval>({
  isApplicantApprovalRequired: { type: Boolean, required: false },
  isApplicantApproved: { type: Boolean, required: false },
  applicantRespondedAt: { type: Date, required: false },
});

const AdhocTransactionSchema = new Schema<AdhocTransaction, Model<AdhocTransaction>, AdhocTransaction>({
  amount: { type: Number, required: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: true },
  requestedOn: { type: Date, required: true },
  reason: { type: String, required: true },
  approval: { type: ApprovalSchema, required: false, _id: false },
  transactionReference: { type: TransactionReferenceSchema, required: false,  _id: false },
  financeReference: { type: FinanceReference, required: false, _id: false },
  _id: { type: Schema.Types.ObjectId, required: true },
}, {timestamps: true});

const SubmissionSchema = new Schema<Submission, Model<Submission>, Submission>({
  amount: { type: Number, required: false },
  transactionReference: { type: TransactionReferenceSchema, required: true,  _id: false, default: {} },
})

const TransactionSchema = new Schema<Transaction, Model<Transaction>, Transaction>({
  submission : { type: SubmissionSchema, required: false, _id: false, default: {} },
  adhocTransactions: { type: [AdhocTransactionSchema], required: false },
})

const GlTransactionSchema = new Schema<GlTransaction, Model<GlTransaction>, GlTransaction>({
  debitGlAccount: { type: String, required: false },
  creditGlAccount: { type: String, required: false },
  amount: { type: Number, required: false },
  recognitionDate: { type: Date, required: false },
  completedOn: { type: Date, required: false, default: null },
})

const RevenueRecognitionSchema = new Schema<RevenueRecognition, Model<RevenueRecognition>, RevenueRecognition>({
  submission: { type: GlTransactionSchema, required: false, _id: false },
  recognition: { type: GlTransactionSchema, required: false, _id: false },
})

const FinanceDetailSchema = new Schema<FinanceDetails, Model<FinanceDetails>, FinanceDetails>({
  serviceFee: { type: Number, required: true },
  transactions: { type: TransactionSchema, required: false, _id: false, default: {} },
  revenueRecognition: {type: RevenueRecognitionSchema, required: false, _id: false, default: {} },
})

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
    financeDetails: { type: FinanceDetailSchema, required: true, _id: false },
    revisionRequest: {
      type: {
        requestedAt: { type: Date, required: true },
        requestedBy: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: true },
        revisionSummary: { type: String, required: true },
        requestedChanges: {
          requestUpdatedAssignment: { type: Boolean, required: true },
          requestUpdatedStatus: { type: Boolean, required: true },
          requestUpdatedProperty: { type: Boolean, required: true },
          requestUpdatedPaymentTransaction: { type: Boolean, required: true },
        },
        revisionSubmittedAt: { type: Date, required: false },
      },
      required: false,
    },
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
    messages: [ViolationTicketMessageSchema],
    photos: [PhotoSchema],
    hash: { type: String, required: false, maxlength: 100 },
    lastIndexed: { type: Date, required: false },
    updateIndexFailedDate: { type: Date, required: false },
  },
  ticketOptions
);

export const ViolationTicketModel = TicketModel.discriminator('ViolationTicketType', ViolationTicketSchema);
