import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { BlobStorageBase } from "../../../seedwork/services-seedwork-blob-storage-interfaces";
import { DailyGlSummarySettings } from "./process-daily-gl-summaries";

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
  glTransactionDate: string,
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
    const blobNameForGlTransactionSummary = `${blobBasePath}/${glTransactionDate}${BlobNameSuffix.TransactionSummary}`;
    const glTransactionTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: BlobTagForType.TransactionSummary,
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadTransactionSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as TransactionType[];
      if (fileContent.length !== glTransactionData.length) {
        console.error(`[ProcessDailyGlSummaries] | [SaveDailyGlSummaries] | ${glTransactionDate} | Error: ${blobNameForGlTransactionSummary} has ${fileContent.length} transactions, expected ${glTransactionData.length}`);
        return false
      }
      return true;
    };

    // create blob for gl transaction summary
    console.log(`[ProcessDailyGlSummaries] | [SaveDailyGlSummaries] | ${glTransactionDate} | Saving ${glTransactionDate}${BlobNameSuffix.TransactionSummary} to blob storage`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlTransactionSummary, blobContainerName, JSON.stringify(glTransactionData), 'application/json', glTransactionTags, callbackOnUploadTransactionSummarySuccess);

    // Daily GL Posting Summary
    const blobNameForGlPostingSummary = `${blobBasePath}/${glTransactionDate}${BlobNameSuffix.PostingSummary}`;
    const glPostingSummaryTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: BlobTagForType.PostingSummary,
      status: glPostingSummaryData['glSummary'].length > 0 ? BlobTagForStatus.New : BlobTagForStatus.NoTxn, 
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadPostingSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as PostingSummaryType;
      // [TODO] need to validate this a different way
      if (fileContent['glSummary'].length !== glPostingSummaryData['glSummary'].length) {
        console.error(`[ProcessDailyGlSummaries] | [SaveDailyGlSummaries] | ${glTransactionDate} | Error: ${blobNameForGlTransactionSummary} has ${fileContent['glSummary'].length} transactions, expected ${glTransactionData.length}`);
        return false
      }

      // [TODO] send message to storage queue to alert Mule

      return true;
    };

    // create blob for gl posting summary
    console.log(`[ProcessDailyGlSummaries] | [SaveDailyGlSummaries] | ${glTransactionDate} | Saving ${glTransactionDate}${BlobNameSuffix.PostingSummary} to blob storage`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlPostingSummary, blobContainerName, JSON.stringify(glPostingSummaryData), 'application/json', glPostingSummaryTags, callbackOnUploadPostingSummarySuccess);
};

export const convertTimestampIntoBlobName = (timestamp: Date): string => {
  return timestamp.toISOString().replace(/[-T:.Z]/g,'')
}

export const determineStartDate = async ({ blobStorage, blobContainerName, blobBasePath }: BlobSettings): Promise<DailyGlSummarySettings> => {
  try {
    const blobDates = (await blobStorage.listBlobs(blobContainerName, blobBasePath)) ?? [];
    // should return current date minus one if no entries in blob, else last processed date plus one
    // [TODO] convert timestamps to start of day
    const startTimestamp = convertToStartOfDayEST(calculateStartDate(blobDates.map((blob) => blob.tags.glTransactionDate)));
    const glTransactionDate = convertDateToSimpleDate(startTimestamp);
    const endTimestamp = convertToStartOfDayEST(new Date());
    return { glTransactionDate, startTimestamp, endTimestamp };
    
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

export const calculateStartDate = (blobDates: string[]): Date => {
  const blobDateArray = blobDates.map((blobDate) => dayjs(blobDate).toDate());
  const lastProcessedDate = sortDateArray(blobDateArray, -1)?.[0];
  if (!lastProcessedDate) {
    return new Date(Date.now() - 86400000); // Current date minus one day
  }
  return new Date(lastProcessedDate.setDate(lastProcessedDate.getDate() + 1)); // Last processed date plus one day
}

function getTime(date?: Date): number {
  return date != null ? date.getTime() : 0;
}

export const convertDateToSimpleDate = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
}

export const convertToStartOfDayEST = (date: Date): Date => {
  return date ? dayjs.tz(date, 'America/New_York').startOf('day').toDate() : null;
};