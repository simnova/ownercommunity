import { BlobStorageBase } from "../../../seedwork/services-seedwork-blob-storage-interfaces";

export interface BlobSettings {
  blobStorage: BlobStorageBase;
  blobContainerName: string;
  blobBasePath: string;
}


 /**
 * Creates a JSON file for transaction summary and posting summary in blob storage for a given date and finance data
 * @param glTransactionDate The date of the transactions currently being processed
 * @param glTransactionData An array of transactions to be saved in the blob
 * @param glPostingSummaryData An object containing the daily posting summary data to be saved in the blob
 * @param blobStorage The blob storage domain object to interact with the Blob API
 * @param blobContainerName The name of the container to create the blob in
 * @param blobBasePath The base path for the blob name, ex: 'daily-gl-summaries'
 */
export const SaveDailyGlSummaries = async <TransactionType, PostingSummaryType>(
  glTransactionDate: Date,
  glTransactionData: TransactionType[],
  glPostingSummaryData: PostingSummaryType,
  { blobStorage, blobContainerName, blobBasePath }: BlobSettings
) => {
    enum BlobNameSuffix {
      TransactionSummary = '-transaction-summary.json',
      PostingSummary = '-posting-summary.json',
    }

    enum BlobTagForType {
      TransactionSummary = 'transaction-summary',
      PostingSummary = 'posting-summary',
    }

    enum BlobTagForStatus {
      New = 'NEW',
      NoTxn = 'NOTXN',
    }

    // Daily GL Transaction Summary
    const blobNameForGlTransactionSummary = `${blobBasePath}/${convertTimestampIntoBlobName(glTransactionDate)}${BlobNameSuffix.TransactionSummary}`;
    const glTransactionTags: Record<string, string> = {
      glTransactionDate: glTransactionDate.toISOString(),
      type: BlobTagForType.TransactionSummary,
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackToVerifyBlobUploadForTransactions = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as TransactionType[];
      if (fileContent.length !== glTransactionData.length) {
        console.error(`Error: ${blobNameForGlTransactionSummary} has ${fileContent.length} transactions, expected ${glTransactionData.length}`);
        return false
      }
      return true;
    };

    // create blob for gl transaction summary
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlTransactionSummary, blobContainerName, JSON.stringify(glTransactionData), callbackToVerifyBlobUploadForTransactions, 'application/json', glTransactionTags);

    // Daily GL Posting Summary
    const blobNameForGlPostingSummary = `${blobBasePath}/${convertTimestampIntoBlobName(glTransactionDate)}${BlobNameSuffix.PostingSummary}`;
    const glPostingSummaryTags: Record<string, string> = {
      glTransactionDate: glTransactionDate.toISOString(),
      type: BlobTagForType.PostingSummary,
      status: glPostingSummaryData['glSummary'].length > 0 ? BlobTagForStatus.New : BlobTagForStatus.NoTxn, 
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackToVerifyBlobUploadForPostingSummary = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as PostingSummaryType[];
      // [TODO] need to validate this a different way
      if (fileContent['glSummary'].length !== glPostingSummaryData['glSummary'].length) {
        console.error(`Error: ${blobNameForGlTransactionSummary} has ${fileContent.length} transactions, expected ${glTransactionData.length}`);
        return false
      }
      return true;
    };

    // create blob for gl posting summary
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlPostingSummary, blobContainerName, JSON.stringify(glPostingSummaryData), callbackToVerifyBlobUploadForPostingSummary, 'application/json', glPostingSummaryTags);
};

export const convertTimestampIntoBlobName = (timestamp: Date): string => {
  return timestamp.toISOString().replace(/[-T:.Z]/g,'')
}

export const determineLastProcessedDate = async ({ blobStorage, blobContainerName, blobBasePath }: BlobSettings): Promise<Date> => {
  try {
    const blobDates = (await blobStorage.listBlobs(blobContainerName, blobBasePath))?.map((blob) => new Date(blob?.tags?.glTransactionDate)) ?? [];
    return sortDateArray(blobDates, -1)?.[0] ?? new Date();
  } catch (error) {
    console.error(`Error determining last processed date: ${error.message}`);
    return null;
  }
}
export const sortDateArray = (arr: Date[], sortOrder: 1|-1) => {
  return arr.sort((a: Date, b: Date) => {
      return (getTime(a) - getTime(b)) * sortOrder;
  });
};

function getTime(date?: Date): number {
  return date != null ? date.getTime() : 0;
}

export const getNumberOfDays = (startDate: Date, endDate: Date): number => {
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
}