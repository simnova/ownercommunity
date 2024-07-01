import { Schema, model, Model } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';

export interface Ticket extends Base {
  discriminatorKey: string;
}

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v
export const ticketOptions = {
  discriminatorKey: 'ticketType',
  timestamps: true,
  // versionKey: 'version',
  shardKey: { community: 1 },
};

const TicketSchema = new Schema<Ticket, Model<Ticket>, Ticket>({}, ticketOptions);

export const TicketModel = model<Ticket>('ServiceTicket', TicketSchema);
