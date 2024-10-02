import { GlDailySummaryProcessorImpl } from "../../../seedwork/services-seedwork-finance/gl-daily-summary-processor";
import { GlDailySummaryStorageProviderBlobImpl } from "../../../seedwork/services-seedwork-finance/gl-daily-summary-storage-provider-blob";
import { DateUtils } from "../../../seedwork/utils/date-utils";
import { TimerContext } from "../core/timer.context-builder";

export const ProcessGLTransactions = async (context: TimerContext): Promise<void> => {
  try {
    console.log(`timer-gl-daily-summary | start | ${context}`);
    // Timer function logic here

    const blobStorageProvider = GlDailySummaryStorageProviderBlobImpl.getInstance();
    const lastProcessedGlTransactionDate = await blobStorageProvider.getLastProcessedGlTransactionDate();
    const processingStartTimestamp: Date = lastProcessedGlTransactionDate ? 
        DateUtils.convertToStartOfDayEST(DateUtils.addDaysToDate(lastProcessedGlTransactionDate.date, 1)) 
        : new Date(Date.now() - 86400000);
    const processingEndTimestamp = DateUtils.convertToStartOfDayEST(new Date());

    // this will be coming from context.applicationServices
    const funcToGetGlTransactionSummaryData = async (startTimestamp: Date, endTimestamp: Date) => {
      return [];
    }

    const glDailySummaryProcessor = GlDailySummaryProcessorImpl.getInstance(
      blobStorageProvider, 
      funcToGetGlTransactionSummaryData, 
      lastProcessedGlTransactionDate
    );

    await glDailySummaryProcessor.process(processingStartTimestamp, processingEndTimestamp);
    console.log(`timer-gl-daily-summary | end | ${context}`);
    return;
  } catch (error) {
    console.error(`timer-gl-daily-summary | error | ${error}`);
    throw error;
  }
}