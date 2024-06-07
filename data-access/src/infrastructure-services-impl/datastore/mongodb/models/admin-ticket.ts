import { Schema } from 'mongoose';
import { ServiceTicketModel } from './service-ticket';
import { ServiceTicket } from './service-ticket';

export interface AdminTicket extends ServiceTicket {
  penaltyAmount: Number;
  penaltyImposeDate?: Date;
  penaltyPaidDate?: Date;
}

const AdminTicketSchema = new Schema<AdminTicket>({
  penaltyAmount: {
    type: Number,
    required: true,
  },
  penaltyImposeDate: {
    type: Date,
    required: true,
  },
  penaltyPaidDate: {
    type: Date,
    required: true
  }}
)


export const AdminTicketModel = ServiceTicketModel.discriminator('AdminTicket', AdminTicketSchema)