import { BlobSettings, convertDateToSimpleDate, determineStartDate, SaveDailyGlSummaries } from "./save-daily-gl-summaries"

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

export interface DailyGlSummarySettings {
  glTransactionDate: string;
  startTimestamp: Date;
  endTimestamp: Date;
}

export const ProcessDailyGLSummaries = async (blobSettings: BlobSettings) => {
  console.log(`[ProcessDailyGlSummaries] | Starting process`);
  const dailyGlSummarySettings = await determineStartDate(blobSettings);

  console.log(`[ProcessDailyGlSummaries] | Start Date: ${dailyGlSummarySettings.startTimestamp.toString()} | End Date: ${dailyGlSummarySettings.endTimestamp.toString()}`);
  let currentDate = new Date(dailyGlSummarySettings.startTimestamp);
  while (currentDate < dailyGlSummarySettings.endTimestamp) {
    const glTransactionDate = convertDateToSimpleDate(currentDate);
    console.log(`[ProcessDailyGLSummaries] | ${glTransactionDate} | Processing daily summary for this GL Transaction Date`);
    try {
    // use the pipeline query to fetch data from the database for the current date

    console.log(`[ProcessDailyGLSummaries] | ${glTransactionDate} | Fetched data from the database`);
    // [TODO] currently using mock data
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

    // save the daily gl summaries to blob storage
    await SaveDailyGlSummaries(glTransactionDate, transactionSummary, glPostingSummary, blobSettings);

    // send out message to storage queue to alert Mule
    console.log(`[ProcessDailyGLSummaries] | ${glTransactionDate} | Sent message to storage queue`);

    console.log(`[ProcessDailyGlSummaries] | ${glTransactionDate} | Successfully processed daily summary for this GL Transaction Date`);
    } catch (error) {
      console.error(`[ProcessDailyGLSummaries] | ${glTransactionDate} | Error processing daily summary: ${error}`);
      continue;
    }

    // increment currentDate
    currentDate = getNextDateToProcess(currentDate);
  }
  console.log(`[ProcessDailyGLSummaries] | Finished process for ${convertDateToSimpleDate(dailyGlSummarySettings.startTimestamp)} to ${convertDateToSimpleDate(dailyGlSummarySettings.endTimestamp)}`);
}

function getNextDateToProcess(currentDate: Date) {
  currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  return currentDate;
}
