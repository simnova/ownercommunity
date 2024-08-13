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

      const generateDescription = (amount: number) => `Owner community requested $${amount} for violation ticket`;
      return transactions.map((transaction) => ({
        id: transaction._id,
        description: generateDescription(transaction.amount),
        ...transaction
      }));
  }

  async getGlTransactions() {
    let submissionTransactions = await this.model.aggregate([
      {
        $match: {
          $and: [
            {
              "financeDetails.revenueRecognition.submission.completedOn":
                {
                  $exists: true,
                  $eq: null
                }
            }
          ]
        }
      },
      {
        $project: {
          case: "$_id",
          caseType: "$ticketType",
          applicant: "$assignedTo",
          transactionType: "submission",
          amount:
            "$financeDetails.transactions.submission.amount",
          transactionReference: {
            referenceId:
              "$financeDetails.transactions.submission.transactionReference.referenceId",
            vendor:
              "$financeDetails.transactions.submission.transactionReference.vendor",
            completedOn:
              "$financeDetails.transactions.submission.transactionReference.completedOn"
          },
          financeReference: {
            debitGLAccount:
              "$financeDetails.revenueRecognition.submission.debitGlAccount",
            creditGLAccount:
              "$financeDetails.revenueRecognition.submission.creditGlAccount"
          }
        }
      },
    ]).exec();

    let recognitionTransactions = await this.model.aggregate([
      {
        $match: {
          $and: [
            {
              "financeDetails.revenueRecognition.recognition.completedOn":
                {
                  $exists: true,
                  $eq: null
                }
            }
          ]
        }
      },
      {
        $project: {
          case: "$_id",
          caseType: "$ticketType",
          applicant: "$assignedTo",
          transactionType: "recognition",
          amount:
            "$financeDetails.transactions.recognition.amount",
          transactionReference: {
            referenceId:
              "$financeDetails.transactions.submission.transactionReference.referenceId",
            vendor:
              "$financeDetails.transactions.submission.transactionReference.vendor",
            completedOn:
              "$financeDetails.transactions.submission.transactionReference.completedOn"
          },
          financeReference: {
            debitGLAccount:
              "$financeDetails.revenueRecognition.recognition.debitGlAccount",
            creditGLAccount:
              "$financeDetails.revenueRecognition.recognition.creditGlAccount"
          }
        }
      },
    ]).exec();

    // TODO: Write Aggregation pipeline to get ADHOC GL Transactions combine results for all 3 pipelines and then return
  }
}