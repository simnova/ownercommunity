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
            $and: [
              {
                assignedTo: new Types.ObjectId(id)
              },
              {
                "financeDetails.transactions.submission.amount":
                  {
                    $exists: 1
                  }
              }
            ]
          }
        },
        {
          $project: {
            createdAt: 1,
            amount:
              "$financeDetails.transactions.submission.amount",
            completedOn:
              "$financeDetails.transactions.submission.transactionReference.completedOn",
            transactionReferenceId:
              "$financeDetails.transactions.submission.transactionReference.referenceId"
          }
        },
        {
          $sort: {
            completedOn: -1
          }
        }
      ])
      .exec();
    return transactions.map((transaction) => ({ id: transaction._id, description: `Owner community requested $${transaction.amount} for violation ticket`, ...transaction }));
  }
}
