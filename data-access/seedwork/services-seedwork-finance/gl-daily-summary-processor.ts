import { DateUtils } from '../utils/date-utils';
import { CustomDateInUsEasternTz as GlTransactionDate } from '../custom-types/custom-date-in-us-eastern-tz';

export interface GlDailySummaryStorageProvider {
  getLastProcessedGlTransactionDate(): Promise<GlTransactionDate>;
  saveGlTransactionSummary(glTransactionDate: string, glTransactionSummaryData: BaseGlTransactionSummary[]): Promise<void>;
  saveGlPostingSummary(glTransactionDate: string, glPostingSummaryData: GlPostingSummary): Promise<void>; 
}

export interface DailyGlSummarySettings {
  glTransactionDate: string;
  startTimestamp: Date;
  endTimestamp: Date;
}

export interface BaseGlTransactionSummary {
  amount: number;
  financeReference: {
    debitGlAccount: string;
    creditGlAccount: string;
  }
}

export interface GlPostingSummary {
  glTransactionDate: Date;
  glSummary: GlPostingSummaryItem[];
}

export interface GlPostingSummaryItem {
  accountingType: string;
  glAccountId: string;
  amount: number;
}

const GL_TRANSACTION_DATE_FORMAT = 'YYYY-MM-DD';

export interface GlDailySummaryProcessor {
  process(startDate: Date, endDate: Date): Promise<void>;
}

export class GlDailySummaryProcessorImpl implements GlDailySummaryProcessor {
  private static _instance: GlDailySummaryProcessorImpl;
  private _isRunning: boolean;

  private constructor(
    private readonly _storageProvider: GlDailySummaryStorageProvider, 
    private readonly _funcToGetGlTransactionSummaryData: (startTimestamp: Date, endTimestamp: Date) => Promise<BaseGlTransactionSummary[]>,
  ) {}

  static getInstance(
    storageProvider: GlDailySummaryStorageProvider, 
    funcToGetGlTransactionSummaryData: (startTimestamp: Date, endTimestamp: Date) => Promise<BaseGlTransactionSummary[]>, 
    lastProcessedGlTransactionDate: GlTransactionDate
  ): GlDailySummaryProcessorImpl {
    if (!this._instance) {
      this._instance = new this(storageProvider, funcToGetGlTransactionSummaryData);
    }
    return this._instance;
  }

  private start(): void {
    if (this._isRunning === true) {
      throw new Error('Processor is already running');
    }
    this._isRunning = true;
    console.log('gl-daily-summary-processor | start');
  }

  private stop(): void {
    this._isRunning = false;
    console.log('gl-daily-summary-processor | stop');
  }

  /**
   * @param startDate processing will begin from 00:00:00 of this date as per America/New_York timezone
   * @param endDate processing will continue until 23:59:59 of this date as per America/New_York timezone
   */
  async process(startDate: Date, endDate: Date) {
    this.start();
    if (startDate > endDate || endDate > new Date()) {
      throw new Error('Invalid start and end date range');
    }
    console.log(`gl-daily-summary-processor | ${DateUtils.getUtcDateString(startDate, GL_TRANSACTION_DATE_FORMAT)} | ${DateUtils.getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | begin`);
    let currentProcessingDate = new Date(startDate);
    while (currentProcessingDate < endDate) {
      const glTransactionDate = GlTransactionDate.createFromDate(currentProcessingDate);
      await this.processGlSummaryForTransactionDate(glTransactionDate);
      currentProcessingDate = DateUtils.addDaysToDate(currentProcessingDate, 1);
    }
    console.log(`gl-daily-summary-processor | ${DateUtils.getUtcDateString(startDate, GL_TRANSACTION_DATE_FORMAT)} | ${DateUtils.getUtcDateString(endDate, GL_TRANSACTION_DATE_FORMAT)} | end`);
    this.stop();
  }

  private processGlSummaryForTransactionDate = async (glTransactionDate: GlTransactionDate) => {
    console.log(`gl-daily-summary-processor | ${glTransactionDate.dateString} | begin`);
      try {
        const glTransactionSummary = await this.getGlDailyTransactionSummaryData(glTransactionDate);
        const glPostingSummary = this.getGlDailyPostingSummaryData(glTransactionDate, glTransactionSummary);
        await this.saveDailyGlSummaries(glTransactionDate.dateString, glTransactionSummary, glPostingSummary);
      } catch (error) {
        console.error(`gl-daily-summary-processor | ${glTransactionDate.dateString} | Error processing daily summary: ${error}`);
      } finally {
        console.log(`gl-daily-summary-processor | ${glTransactionDate.dateString} | end`);
      }
  }

  private getGlDailyTransactionSummaryData = async (glTransactionDate: GlTransactionDate) => {
    console.log(`gl-daily-summary-processor | ${glTransactionDate.dateString} | get-gl-daily-transaction-summary-data`);
    // use the pipeline query to fetch data from the database for the current date
    // return [
    //   { amount: 100, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 50, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 25, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    //   { amount: 200, financeReference: { debitGlAccount: '000-111-222', creditGlAccount: '333-444-555' } },
    // ];
    return await this._funcToGetGlTransactionSummaryData(glTransactionDate.startOfDayTimestamp, glTransactionDate.endOfDayTimestamp);
  }

  private getGlDailyPostingSummaryData = (glTransactionDate: GlTransactionDate, transactionSummaryData: BaseGlTransactionSummary[]): GlPostingSummary => {
    console.log(`gl-daily-summary-processor | ${glTransactionDate.dateString} | get-gl-daily-posting-summary-data`);
    // [TODO] implement mapping transaction summary data to posting summary record
    let glSummary: GlPostingSummaryItem[] = [];
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
      glTransactionDate: glTransactionDate.date,
      glSummary,
    } as GlPostingSummary;
  }

  private async saveDailyGlSummaries(glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[], glPostingSummaryData: GlPostingSummary) {
    await this._storageProvider.saveGlTransactionSummary(glTransactionDate, glTransactionData);
    await this._storageProvider.saveGlPostingSummary(glTransactionDate, glPostingSummaryData);
  }
}