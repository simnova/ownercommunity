import { BlobStorageBase } from "../../../seedwork/services-seedwork-blob-storage-interfaces";

export interface BlobSettings {
  blobStorage: BlobStorageBase;
  blobContainerName: string;
  blobBasePath: string;
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
  glSummary: GlSummary[];
}

export interface GlSummary {
  accountingType: string;
  glAccountId: string;
  amount: number;
}