import { TimerContext } from "../init/timer-context-builder";
import { ProcessDailyGLSummaries } from "../../../app/services/process-daily-gl-summaries";

export const ProcessGLTransactions = async (context: TimerContext): Promise<void> => {
  try {
    console.log('[TestTimerHandler] | Invocation ID ', context);
    console.log('[TestTimerHandler] | Timer ', context);
    // Timer function logic here

    const { blobStorage } = context.infrastructureServices;

    const blobSettings = {
      blobStorage: blobStorage,
      blobContainerName: 'finance',
      blobBasePath: 'daily-gl-summaries'
    };

    await ProcessDailyGLSummaries(blobSettings);

    return;
  } catch (error) {
    console.error('[ProcessGLTransactions] | Error ', error);
    throw error;
  }
}