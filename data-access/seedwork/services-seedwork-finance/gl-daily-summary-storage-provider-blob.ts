import { sortDateArray } from "../utils/array-utils";
import { BlobStorageBase } from "../services-seedwork-blob-storage-interfaces";
import { BaseGlTransactionSummary, GlDailySummaryStorageProvider, GlPostingSummary } from "./gl-daily-summary-processor";
import { CustomDateInUsEasternTz as GlTransactionDate } from "../custom-types/custom-date-in-us-eastern-tz";


export interface BlobSettings {
  blobStorage: BlobStorageBase;
  blobContainerName: string;
  blobBasePath: string;
}

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


export class GlDailySummaryStorageProviderBlobImpl implements GlDailySummaryStorageProvider {
  private blobSettings: BlobSettings;
  private static instance: GlDailySummaryStorageProviderBlobImpl;

  private constructor(blobSettings: BlobSettings) {
    this.blobSettings = blobSettings;
  }

  static initialize(blobSettings: BlobSettings): void {
    if (this.instance) {
      throw new Error('GlDailySummaryStorageProviderBlobImpl has already been initialized');
    }
    this.instance = new this(blobSettings);
    console.log('GlDailySummaryStorageProviderBlobImpl initialized');
  }

  static getInstance(): GlDailySummaryStorageProviderBlobImpl {
    if (!this.instance) {
      throw new Error('GlDailySummaryStorageProviderBlobImpl has not been initialized');
    }
    return this.instance;
  }

  async getLastProcessedGlTransactionDate(): Promise<GlTransactionDate> {
    const blobs = await this.blobSettings.blobStorage.listBlobs(this.blobSettings.blobContainerName, this.blobSettings.blobBasePath) ?? [];
    if (blobs.length === 0) {
      return null;
    }
    const previouslyProcessedGlTransactionDates: GlTransactionDate[] = blobs.map((blob) => new GlTransactionDate(blob.tags.glTransactionDate));
    return GlTransactionDate.createFromDate(sortDateArray(previouslyProcessedGlTransactionDates.map((item) => item.date), -1)[0]);

  }

  async saveGlTransactionSummary(glTransactionDate: string, glTransactionData: BaseGlTransactionSummary[]) {
    const { blobStorage, blobContainerName, blobBasePath } = this.blobSettings;

    const fileNameForGlTransactionSummary = `${glTransactionDate}${BlobNameSuffix.TransactionSummary}`;

    // Daily GL Transaction Summary
    const blobNameForGlTransactionSummary = `${blobBasePath}/${fileNameForGlTransactionSummary}`;
    const glTransactionTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: BlobTagForType.TransactionSummary,
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadTransactionSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as BaseGlTransactionSummary[];
      if (fileContent.length !== glTransactionData.length) {
        console.error(`gl-daily-summary-processor | save-daily-gl-summaries | ${glTransactionDate} | Error: ${blobNameForGlTransactionSummary} has ${fileContent.length} transactions, expected ${glTransactionData.length}`);
        return false
      }
      return true;
    };
    // create blob for gl transaction summary
    console.log(`gl-daily-summary-processor | save-daily-gl-summaries | ${glTransactionDate} | 1-saving-transaction-summary-to-blob-storage | ${JSON.stringify({blobNameForGlTransactionSummary})}`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlTransactionSummary, blobContainerName, JSON.stringify(glTransactionData), 'application/json', glTransactionTags, callbackOnUploadTransactionSummarySuccess);
  }

  async saveGlPostingSummary(glTransactionDate: string, glPostingSummaryData: GlPostingSummary) {
    const { blobStorage, blobContainerName, blobBasePath } = this.blobSettings
    // Daily GL Posting Summary
    const blobNameForGlPostingSummary = `${blobBasePath}/${glTransactionDate}${BlobNameSuffix.PostingSummary}`;
    const glPostingSummaryTags: Record<string, string> = {
      glTransactionDate: glTransactionDate,
      type: BlobTagForType.PostingSummary,
      status: glPostingSummaryData['glSummary'].length > 0 ? BlobTagForStatus.New : BlobTagForStatus.NoTxn, 
    };

    // ensure the file exists in blob storage and has the correct number of transactions
    const callbackOnUploadPostingSummarySuccess = (blobText: string):boolean => {
      const fileContent = JSON.parse(blobText) as GlPostingSummary;
      if (fileContent['glSummary'].length !== glPostingSummaryData['glSummary'].length) {
        console.error(`gl-daily-summary-processor | ${glTransactionDate} | save-daily-gl-summaries | Error: ${blobNameForGlPostingSummary} has ${fileContent['glSummary'].length} transactions, expected ${glPostingSummaryData['glSummary'].length}`);
        return false
      }

      // [TODO] send message to storage queue to alert Mule
      console.log(`gl-daily-summary-processor | ${glTransactionDate} | save-daily-gl-summaries | 3-sent-message-to-storage-queue`);
      return true;
    };

    // create blob for gl posting summary
    console.log(`gl-daily-summary-processor | ${glTransactionDate} | save-daily-gl-summaries | 2-saving-posting-summary-to-blob-storage | ${JSON.stringify({blobNameForGlPostingSummary})}`);
    await blobStorage.createTextBlobIfNotExistsAndConfirm(blobNameForGlPostingSummary, blobContainerName, JSON.stringify(glPostingSummaryData), 'application/json', glPostingSummaryTags, callbackOnUploadPostingSummarySuccess);
  }
}