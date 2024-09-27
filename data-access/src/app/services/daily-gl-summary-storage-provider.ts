import dayjs from "dayjs";
import { sortDateArray } from "../../../seedwork/utils/array-utils";
import { BaseGlTransactionSummary, BlobSettings, GlPostingSummary } from "./process-daily-gl-summaries-interfaces";
import { getUtcDateString } from "../../../seedwork/utils/date-utils";
import { GL_TRANSACTION_DATE_FORMAT, GlTransactionDate } from "./gl-transaction-date";

export interface GlDailySummaryStorageProvider {
  getLastProcessedGlTransactionDate(): Promise<GlTransactionDate>;
  saveGlTransactionSummary(glTransactionDate: string, glTransactionSummaryData: BaseGlTransactionSummary[]): Promise<void>;
  saveGlPostingSummary(glTransactionDate: string, glPostingSummaryData: GlPostingSummary): Promise<void>; 
}


export class GlDailySummaryStorageProviderImpl implements GlDailySummaryStorageProvider {
  private blobSettings: BlobSettings;

  constructor(blobSettings: BlobSettings) {
    this.blobSettings = blobSettings;
  }

  async getLastProcessedGlTransactionDate(): Promise<GlTransactionDate> {
    const blobs = await this.blobSettings.blobStorage.listBlobs(this.blobSettings.blobContainerName, this.blobSettings.blobBasePath) ?? [];
    if (blobs.length === 0) {
      return null;
    }
    const blobDates = blobs.map((blob) => blob.tags.glTransactionDate);
    const blobDateArray = blobDates.map((blobDate) => dayjs(blobDate).toDate());
    return new GlTransactionDate(getUtcDateString(sortDateArray(blobDateArray, -1)[0], GL_TRANSACTION_DATE_FORMAT));

  }
  async saveGlTransactionSummary(glTransactionDate: string, glTransactionSummaryData: BaseGlTransactionSummary[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async saveGlPostingSummary(glTransactionDate: string, glPostingSummaryData: GlPostingSummary): Promise<void> {
    throw new Error("Method not implemented.");
  }
}