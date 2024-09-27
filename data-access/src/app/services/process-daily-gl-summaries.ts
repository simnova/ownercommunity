import dayjs from 'dayjs';
import { BlobSettings, BaseGlTransactionSummary, GlPostingSummary, GlSummary, DailyGlSummarySettings } from "./process-daily-gl-summaries-interfaces";
import { sortDateArray } from '../../../seedwork/utils/array-utils';
import { DateUtils } from '../../../seedwork/utils/date-utils';
import { GlTransactionDate } from './gl-transaction-date';
import { GlDailySummaryStorageProvider } from './daily-gl-summary-storage-provider';

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

export interface GlDailySummaryProcessor {

}

export class GlDailySummaryProcessorImpl implements GlDailySummaryProcessor {

  constructor(
    private readonly _storageProvider: GlDailySummaryStorageProvider, 
    private readonly _funcToGetGlTransactionSummaryData: (glTransactionDate: Date) => Promise<BaseGlTransactionSummary[]>,
    private readonly _lastProcessedGlTransactionDate: GlTransactionDate,
  ) {}

  get processingStartTimestamp(): Date {
    if (!this._lastProcessedGlTransactionDate) {
      return new Date(Date.now() - 86400000);
    }
    return DateUtils.convertToStartOfDayEST(DateUtils.addDaysToDate(this._lastProcessedGlTransactionDate.date, 1));
  }

  get processingEndTimestamp(): Date {
    return DateUtils.convertToStartOfDayEST(new Date());
  }

  get glTransactionDate(): GlTransactionDate {
    return new GlTransactionDate(DateUtils.getUtcDateString(this.processingStartTimestamp, GL_TRANSACTION_DATE_FORMAT));
  }

  determineStartDate = async (lastProcessedDate: GlTransactionDate): Promise<DailyGlSummarySettings> => {
    try {
      let startTimestamp;
      if (lastProcessedDate === null) {
        startTimestamp = new Date(Date.now() - 86400000); // Current date minus one day
      } else {
        startTimestamp = DateUtils.addDaysToDate(lastProcessedDate.date, 1) // Last processed date plus one day
      }
      // should return current date minus one if no entries in blob, else last processed date plus one
      startTimestamp = DateUtils.convertToStartOfDayEST(new Date(lastProcessedDate.dateString));
      const glTransactionDate = DateUtils.getUtcDateString(startTimestamp, GL_TRANSACTION_DATE_FORMAT);
      const endTimestamp = DateUtils.convertToStartOfDayEST(new Date());
      return { glTransactionDate, startTimestamp, endTimestamp };
      
    } catch (error) {
      console.error(`Error determining last processed date: ${error.message}`);
      throw error;
    }
  }

  async process(startDate: Date, endDate: Date) {
    const originalStartDate = new Date(startDate);
    console.log(`process-daily-gl-summaries | ${DateUtils.getUtcDateString(startDate, GL_TRANSACTION_DATE_FORMAT)} | ${DateUtils.getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | begin`);
    let currentDate = startDate;
    let glTransactionDate = new GlTransactionDate(DateUtils.getUtcDateString(this.processingStartTimestamp, GL_TRANSACTION_DATE_FORMAT));
    while (glTransactionDate.date < endDate) {
      // const glTransactionDate = DateUtils.getUtcDateString(currentDate, GL_TRANSACTION_DATE_FORMAT);
      console.log(`process-daily-gl-summaries | ${glTransactionDate} | begin`);
      try {
        const glTransactionSummary = await this.getDailyGlTransactionSummaryData(currentDate);
        const glPostingSummary = this.getDailyGlPostingSummaryData(currentDate, glTransactionSummary);
        await this.saveDailyGlSummaries(glTransactionDate, glTransactionSummary, glPostingSummary);
      } catch (error) {
        console.error(`process-daily-gl-summaries | ${glTransactionDate} | Error processing daily summary: ${error}`);
        continue;
      } finally {
        console.log(`process-daily-gl-summaries | ${glTransactionDate} | end`);
        // currentDate = DateUtils.addDaysToDate(currentDate, 1);
        glTransactionDate = DateUtils.addDaysToDate(glTransactionDate.date, 1);
      }
    }
    console.log(`process-daily-gl-summaries | ${getUtcDateString(originalStartDate, GL_TRANSACTION_DATE_FORMAT)} | ${getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | end`);
  }

  private getDailyGlTransactionSummaryData = async (glTransactionDate: Date) => {
    console.log(`process-daily-gl-summaries | ${DateUtils.getUtcDateString(glTransactionDate, GL_TRANSACTION_DATE_FORMAT)} | get-daily-gl-transaction-summary-data`);
    // use the pipeline query to fetch data from the database for the current date
    // return [
    //   { amount: 100, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 50, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 25, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 200, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    // ];
    return await this._funcToGetGlTransactionSummaryData(glTransactionDate);
  }

  private getDailyGlPostingSummaryData = (glTransactionDate: Date, transactionSummaryData: BaseGlTransactionSummary[]) => {
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

  private async saveDailyGlSummaries(glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[], glPostingSummaryData: GlPostingSummary) {
    await GlDailySummaryProcessor.saveTransactionSummary(glTransactionDate, glTransactionData, BlobNameSuffix.TransactionSummary, BlobTagForType.TransactionSummary, GlDailySummaryProcessor.blobSettings);
    await GlDailySummaryProcessor.savePostingSummary(glTransactionDate, glPostingSummaryData, BlobNameSuffix.PostingSummary, BlobTagForType.PostingSummary, GlDailySummaryProcessor.blobSettings);
  }

  private saveTransactionSummary = async (glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[], blobNameSuffix: string, blobTagForType: string, { blobContainerName,blobBasePath, blobStorage }: BlobSettings) => {
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

  private savePostingSummary = async (glTransactionDate: string, glPostingSummaryData: GlPostingSummary, blobNameSuffix: string, blobTagForType: string, { blobContainerName,blobBasePath, blobStorage }: BlobSettings) => {
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

  private calculateStartDate = (blobDates: string[]): Date => {
    if (blobDates.length === 0) {
      return new Date(Date.now() - 86400000); // Current date minus one day
    }
    const blobDateArray = blobDates.map((blobDate) => dayjs(blobDate).toDate());
    const lastProcessedDate = sortDateArray(blobDateArray, -1)[0];
    return new Date(lastProcessedDate.setDate(lastProcessedDate.getDate() + 1)); // Last processed date plus one day
  }
}