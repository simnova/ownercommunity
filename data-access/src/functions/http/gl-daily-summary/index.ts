import { HttpResponse } from "@azure/functions";
import { CustomDateInUsEasternTz as GlTransactionDate } from "../../../../seedwork/custom-types/custom-date-in-us-eastern-tz";
import { GlDailySummaryContext } from "./init/gl-daily-summary-context-builder";
import { GlDailySummaryProcessorImpl } from "../../../../seedwork/services-seedwork-finance/gl-daily-summary-processor";
import { GlDailySummaryStorageProviderBlobImpl } from "../../../../seedwork/services-seedwork-finance/gl-daily-summary-storage-provider-blob";

export const ProcessGlTransactions = async (context: GlDailySummaryContext): Promise<HttpResponse> => {
  try {
    console.log('[ProcessGlTransactions] | Invocation ID ', context);
    console.log('[ProcessGlTransactions] | Timer ', context);
    // Timer function logic here

    console.log('startDate ', context.startDate);
    console.log('endDate ', context.endDate);

    const glTransactionDate = new GlTransactionDate(context.startDate);


    const funcToGetGlTransactionSummaryData = async (startTimestamp: Date, endTimestamp: Date) => {
      return [];
    }

    const blobStorageProvider = GlDailySummaryStorageProviderBlobImpl.getInstance();

    const glDailySummaryProcessor = GlDailySummaryProcessorImpl.getInstance(
      blobStorageProvider,
      funcToGetGlTransactionSummaryData,
      glTransactionDate
    );

    await glDailySummaryProcessor.process(new Date(context.startDate), new Date(context.endDate));

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