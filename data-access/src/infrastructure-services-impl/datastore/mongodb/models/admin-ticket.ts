import { Schema, Model } from 'mongoose';
import { ServiceTicket, ServiceTicketModel } from './service-ticket';

export interface AdminTicket extends ServiceTicket {
  penaltyAmount: number;
  penaltyPaidDate: Date;
}

const AdminTicketSchema = new Schema<AdminTicket, Model<AdminTicket>, AdminTicket>({
  penaltyAmount: {
    type: Number,
    required: true,
  },
  penaltyPaidDate: {
    type: Date,
    required: false,
  },
}, {discriminatorKey: 'ticketType'});

export const AdminTicketModel = ServiceTicketModel.discriminator('AdminTicket', AdminTicketSchema)