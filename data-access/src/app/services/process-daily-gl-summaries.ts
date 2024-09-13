import { BlobOptions } from "buffer"
import { BlobSettings, determineLastProcessedDate, getNumberOfDays, SaveDailyGlSummaries } from "./save-daily-gl-summaries"

interface TransactionSummary {
  transactionId: string;
}

interface GlPostingSummary {
  glTransactionDate: Date;
  glSummary: GlSummary[];
}

interface GlSummary {
  accountingType: string;
  amount: number;
}

export const ProcessDailyGLSummaries = async (blobSettings: BlobSettings) => {

  const startDate = await determineLastProcessedDate(blobSettings);
  const endDate = new Date();

  const numberOfDays = getNumberOfDays(startDate, endDate);
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const transactionSummary: TransactionSummary[] = [
      { transactionId: '1' },
      { transactionId: '2' },
      { transactionId: '3' },
      { transactionId: '4' },
    ];
    const glPostingSummary: GlPostingSummary = {
      glTransactionDate: currentDate,
      glSummary: [
        { accountingType: 'debit', amount: 100 },
        { accountingType: 'credit', amount: 100 },
        { accountingType: 'debit', amount: 100 },
        { accountingType: 'credit', amount: 100 },
      ]
    };
    await SaveDailyGlSummaries(currentDate, transactionSummary, glPostingSummary, blobSettings);
  }
}