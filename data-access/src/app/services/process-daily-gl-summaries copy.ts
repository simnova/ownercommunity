import dayjs from 'dayjs';
import { BlobSettings, BaseGlTransactionSummary, GlPostingSummary, GlSummary, DailyGlSummarySettings } from "./process-daily-gl-summaries-interfaces";
import { sortDateArray } from '../../../seedwork/utils/array-utils';
import { convertToStartOfDayEST, getUtcDateString } from '../../../seedwork/utils/date-utils';

const GL_TRANSACTION_DATE_FORMAT = 'YYYY-MM-DD';

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

export class DailyGlSummaryProcessor {
  private static blobSettings: BlobSettings;
  private static pipeline: (glTransactionDate: Date) => Promise<BaseGlTransactionSummary[]>;
  
  static initialize<TransactionSummaryType extends BaseGlTransactionSummary>(blobSettings: BlobSettings, pipeline?: (glTransactionDate: Date) => Promise<TransactionSummaryType[]>) {
    DailyGlSummaryProcessor.blobSettings = blobSettings;
    DailyGlSummaryProcessor.pipeline = pipeline;
  }

  static determineStartDate = async ({ blobStorage, blobContainerName, blobBasePath }: BlobSettings): Promise<DailyGlSummarySettings> => {
    try {
      const blobDates = (await blobStorage.listBlobs(blobContainerName, blobBasePath)) ?? [];
      // should return current date minus one if no entries in blob, else last processed date plus one
      const startTimestamp = convertToStartOfDayEST(DailyGlSummaryProcessor.calculateStartDate(blobDates.map((blob) => blob.tags.glTransactionDate)));
      const glTransactionDate = getUtcDateString(startTimestamp, GL_TRANSACTION_DATE_FORMAT);
      const endTimestamp = convertToStartOfDayEST(new Date());
      return { glTransactionDate, startTimestamp, endTimestamp };
      
    } catch (error) {
      console.error(`Error determining last processed date: ${error.message}`);
      throw error;
    }
  }

  static async process(startDate: Date, endDate: Date) {
    const originalStartDate = new Date(startDate);
    console.log(`process-daily-gl-summaries | ${getUtcDateString(startDate, GL_TRANSACTION_DATE_FORMAT)} | ${getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | begin`);
    let currentDate = startDate;
    while (currentDate < endDate) {
      const glTransactionDate = getUtcDateString(currentDate, GL_TRANSACTION_DATE_FORMAT);
      console.log(`process-daily-gl-summaries | ${glTransactionDate} | begin`);
      try {
        const glTransactionSummary = await DailyGlSummaryProcessor.getDailyGlTransactionSummaryData(currentDate);
        const glPostingSummary = DailyGlSummaryProcessor.getDailyGlPostingSummaryData(currentDate, glTransactionSummary);
        await DailyGlSummaryProcessor.saveDailyGlSummaries(glTransactionDate, glTransactionSummary, glPostingSummary);
      } catch (error) {
        console.error(`process-daily-gl-summaries | ${glTransactionDate} | Error processing daily summary: ${error}`);
        continue;
      } finally {
        console.log(`process-daily-gl-summaries | ${glTransactionDate} | end`);
        currentDate = DailyGlSummaryProcessor.getNextDateToProcess(currentDate);
      }
    }
    console.log(`process-daily-gl-summaries | ${getUtcDateString(originalStartDate, GL_TRANSACTION_DATE_FORMAT)} | ${getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | end`);
  }

  private static getDailyGlTransactionSummaryData = async (glTransactionDate: Date) => {
    console.log(`process-daily-gl-summaries | ${getUtcDateString(glTransactionDate, GL_TRANSACTION_DATE_FORMAT)} | get-daily-gl-transaction-summary-data`);
    // use the pipeline query to fetch data from the database for the current date
    return [
      { amount: 100, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
      { amount: 50, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
      { amount: 25, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
      { amount: 200, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    ];
    // return await DailyGlSummaryProcessor.pipeline(glTransactionDate);
  }

  private static getDailyGlPostingSummaryData = (glTransactionDate: Date, transactionSummaryData: BaseGlTransactionSummary[]) => {
    console.log(`process-daily-gl-summaries | ${getUtcDateString(glTransactionDate, GL_TRANSACTION_DATE_FORMAT)} | get-daily-gl-posting-summary-data`);
    // [TODO] implement mapping transaction summary data to posting summary record
    let glSummary: GlSummary[] = [];
    transactionSummaryData.forEach((transaction) => {
      glSummary.push({
        accountingType: 'DEBIT',
        amount: transaction.amount,
        glAccountId: transaction.financeReference.debitGlAccount,
      });
      glSummary.push({
        accountingType: 'CREDIT',
        amount: transaction.amount,
        glAccountId: transaction.financeReference.creditGlAccount,
      });
    })
    return {
      glTransactionDate,
      glSummary,
    }
  }

  private static async saveDailyGlSummaries(glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[], glPostingSummaryData: GlPostingSummary) {
    await DailyGlSummaryProcessor.saveTransactionSummary(glTransactionDate, glTransactionData, BlobNameSuffix.TransactionSummary, BlobTagForType.TransactionSummary, DailyGlSummaryProcessor.blobSettings);
    await DailyGlSummaryProcessor.savePostingSummary(glTransactionDate, glPostingSummaryData, BlobNameSuffix.PostingSummary, BlobTagForType.PostingSummary, DailyGlSummaryProcessor.blobSettings);
  }

  private static saveTransactionSummary = async (glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[], blobNameSuffix: string, blobTagForType: string, { blobContainerName,blobBasePath, blobStorage }: BlobSettings) => {
    const fileNameForGlTransactionSummary = `${glTransactionDate}${blobNameSuffix}`;

    // Daily GL Transaction Summary
    const blobNameForGlTransactionSummary = `${blobBasePath}/${fileNameForGlTransactionSummary}`;
    const glTransactionTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: blobTagForType,
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadTransactionSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as BaseGlTransactionSummary[];
      if (fileContent.length !== glTransactionData.length) {
        console.error(`process-daily-gl-summaries | save-daily-gl-summaries | ${glTransactionDate} | Error: ${blobNameForGlTransactionSummary} has ${fileContent.length} transactions, expected ${glTransactionData.length}`);
        return false
      }
      return true;
    };

    // create blob for gl transaction summary
    console.log(`process-daily-gl-summaries | save-daily-gl-summaries | ${glTransactionDate} | 1-saving-transaction-summary-to-blob-storage | ${JSON.stringify({blobNameForGlTransactionSummary})}`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlTransactionSummary, blobContainerName, JSON.stringify(glTransactionData), 'application/json', glTransactionTags, callbackOnUploadTransactionSummarySuccess);
  }

  private static savePostingSummary = async (glTransactionDate: string, glPostingSummaryData: GlPostingSummary, blobNameSuffix: string, blobTagForType: string, { blobContainerName,blobBasePath, blobStorage }: BlobSettings) => {
    // Daily GL Posting Summary
    const blobNameForGlPostingSummary = `${blobBasePath}/${glTransactionDate}${blobNameSuffix}`;
    const glPostingSummaryTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: blobTagForType,
      status: glPostingSummaryData['glSummary'].length > 0 ? BlobTagForStatus.New : BlobTagForStatus.NoTxn, 
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadPostingSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as GlPostingSummary;
      // [TODO] need to validate this a different way
      if (fileContent['glSummary'].length !== glPostingSummaryData['glSummary'].length) {
        console.error(`process-daily-gl-summaries | ${glTransactionDate} | save-daily-gl-summaries | Error: ${blobNameForGlPostingSummary} has ${fileContent['glSummary'].length} transactions, expected ${glPostingSummaryData['glSummary'].length}`);
        return false
      }

      // [TODO] send message to storage queue to alert Mule
      console.log(`process-daily-gl-summaries | ${glTransactionDate} | save-daily-gl-summaries | 3-sent-message-to-storage-queue`);
      return true;
    };

    // create blob for gl posting summary
    console.log(`process-daily-gl-summaries | ${glTransactionDate} | save-daily-gl-summaries | 2-saving-posting-summary-to-blob-storage | ${JSON.stringify({blobNameForGlPostingSummary})}`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlPostingSummary, blobContainerName, JSON.stringify(glPostingSummaryData), 'application/json', glPostingSummaryTags, callbackOnUploadPostingSummarySuccess);
  }

  private static getNextDateToProcess = (currentDate: Date): Date => {
    return new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  private static calculateStartDate = (blobDates: string[]): Date => {
    if (blobDates.length === 0) {
      return new Date(Date.now() - 86400000); // Current date minus one day
    }
    const blobDateArray = blobDates.map((blobDate) => dayjs(blobDate).toDate());
    const lastProcessedDate = sortDateArray(blobDateArray, -1)[0];
    return new Date(lastProcessedDate.setDate(lastProcessedDate.getDate() + 1)); // Last processed date plus one day
  }
}