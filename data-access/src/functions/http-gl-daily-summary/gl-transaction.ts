import { HttpResponse } from "@azure/functions";
import { CustomDateInUsEasternTz as GlTransactionDate } from "../../../seedwork/custom-types/custom-date-in-us-eastern-tz";
import { GlDailySummaryContext } from "./init/gl-daily-summary-context-builder";
import { GlDailySummaryProcessorImpl } from "../../../seedwork/services-seedwork-finance/gl-daily-summary-processor";
import { GlDailySummaryStorageProviderBlobImpl } from "../../../seedwork/services-seedwork-finance/gl-daily-summary-storage-provider-blob";

export const ProcessGLTransactions = async (context: GlDailySummaryContext): Promise<HttpResponse> => {
  try {
    console.log('http-gl-daily-summary | begin');
    // Timer function logic here

    console.log('http-gl-daily-summary | startDate ', context.startDate);
    console.log('http-gl-daily-summary | endDate ', context.endDate);

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

    console.log('http-gl-daily-summary | end');
    return new HttpResponse({
      status: 200,
      body: 'Success',
    });

  } catch (error) {
    console.error('http-gl-daily-summary | Error ', error);
    return new HttpResponse({
      status: 500,
      body: error.message,
    });
  }

};