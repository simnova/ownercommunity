import { ViolationTicketData } from '../../external-dependencies/datastore';
import { CosmosDataSource } from './cosmos-data-source';
import { ViolationTicketDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';
import { Types } from 'mongoose';
import { PaymentTransactionsResult } from '../../external-dependencies/graphql-api';

export class ViolationTicketDataApiImpl extends CosmosDataSource<ViolationTicketData, AppContext> implements ViolationTicketDataApi {
  async getViolationTicketById(id: string): Promise<ViolationTicketData> {
    let dbData = await this.model.findById(id).populate(['community', 'property', 'requestor', 'assignedTo']).exec();
    return dbData;
  }

  async getMemberPaymentTransactions(id: string): Promise<PaymentTransactionsResult[]> {
    let transactions = await this.model
      .aggregate([
        {
          $match: {
            assignedTo: new Types.ObjectId(id),
          },
        },
        {
          $unwind: {
            path: '$paymentTransactions',
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $replaceRoot: {
            newRoot: '$paymentTransactions',
          },
        },
        {
          $project: {
            transactionId: 1,
            status: 1,
            type: 1,
            description: 1,
            successTimestamp: 1,
            isSuccess: 1,
            amount: '$amountDetails.amount',
            currency: '$amountDetails.currency',
          },
        },
        {
          $sort: {
            successTimestamp: -1,
          },
        },
      ])
      .exec();
    return transactions.map((transaction) => ({ id: transaction._id, ...transaction }));
  }
}
