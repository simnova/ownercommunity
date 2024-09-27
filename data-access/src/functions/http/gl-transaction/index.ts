import { HttpResponse } from "@azure/functions";
import { DailyGlSummaryProcessor } from "../../../../seedwork/services-seedwork-process-daily-gl-summaries";
import { GlTransactionContext } from "./init/gl-transaction-context-builder";

export const ProcessGlTransactions = async (context: GlTransactionContext): Promise<HttpResponse> => {
  try {
    console.log('[ProcessGlTransactions] | Invocation ID ', context);
    console.log('[ProcessGlTransactions] | Timer ', context);
    // Timer function logic here

    const { blobStorage } = context.infrastructureServices;

    const blobSettings = {
      blobStorage: blobStorage,
      blobContainerName: 'finance',
      blobBasePath: 'daily-gl-summaries'
    };

    DailyGlSummaryProcessor.initialize(blobSettings);

    console.log('startDate ', context.startDate);
    console.log('endDate ', context.endDate);

    DailyGlSummaryProcessor.process(context.startDate, context.endDate);

    return new HttpResponse({
      status: 200,
      body: 'Success',
    });

  } catch (error) {
    console.error('[ProcessGlTransactions] | Error ', error);
    return new HttpResponse({
      status: 500,
      body: error.message,
    });
  }

};