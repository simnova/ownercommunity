import { Types } from "mongoose";
import { CosmosDataSource } from "../../../../data-sources/cosmos-data-source";
import { ViolationTicketData } from "../../../../external-dependencies/datastore";
import { PaymentTransactionsResult } from "../../../../external-dependencies/graphql-api";
import { AppContext } from "../../../../init/app-context-builder";

export interface ViolationTicketV1DataApi {
  getViolationTicketById(id: string): Promise<ViolationTicketData>;
  getMemberPaymentTransactions(id: string): Promise<PaymentTransactionsResult[]>;
  // getServiceTicketsByCommunityId(communityId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsOpenByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsClosedByRequestor(memberId: string): Promise<ServiceTicketData[]>;
  // getServiceTicketsByAssignedTo(communityId: string, memberId: string): Promise<ServiceTicketData[]>; 
}

export class ViolationTicketV1DataApiImpl
  extends CosmosDataSource<ViolationTicketData, AppContext>
  implements ViolationTicketV1DataApi {
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
