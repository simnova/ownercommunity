import { DailyGlSummaryProcessor } from "../../../../seedwork/services-seedwork-process-daily-gl-summaries";
import { determineStartDate } from "../../../../seedwork/services-seedwork-process-daily-gl-summaries/helpers";
import { TimerContext } from "../init/timer-context-builder";


export const ProcessGLTransactions = async (context: TimerContext): Promise<void> => {
  try {
    console.log('[ProcessGLTransactions] | Invocation ID ', context);
    console.log('[ProcessGLTransactions] | Timer ', context);
    // Timer function logic here

    const { blobStorage } = context.infrastructureServices;

    const blobSettings = {
      blobStorage: blobStorage,
      blobContainerName: 'finance',
      blobBasePath: 'daily-gl-summaries'
    };

    DailyGlSummaryProcessor.initialize(blobSettings);

    const { startTimestamp, endTimestamp} = await determineStartDate(blobSettings);

    await DailyGlSummaryProcessor.process(startTimestamp, endTimestamp);

    return;
  } catch (error) {
    console.error('[ProcessGLTransactions] | Error ', error);
    throw error;
  }
}