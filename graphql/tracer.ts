import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from '@azure/monitor-opentelemetry'; // Must be FIRST import

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DataloaderInstrumentation } from '@opentelemetry/instrumentation-dataloader';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_INSTANCE_ID, SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_NAMESPACE } from '@opentelemetry/semantic-conventions';
import { SpanFilteringProcessor } from './otelFilter';

// process.env.APPLICATIONINSIGHTS_INSTRUMENTATION_LOGGING_LEVEL = "VERBOSE";

if (!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING.length === 0) {
  console.log('Application Insights not configured');
} else {
  const customResource = new Resource({
    [SEMRESATTRS_SERVICE_NAMESPACE]: 'OwnerCommunity',
    [SEMRESATTRS_SERVICE_NAME]: 'DataAccess',
    [SEMRESATTRS_SERVICE_INSTANCE_ID]: 'Local',
  });

  const config: AzureMonitorOpenTelemetryOptions = {
    azureMonitorExporterOptions: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    },
    samplingRatio: 1,
    resource: customResource,
    spanProcessors: [new SpanFilteringProcessor()],
  };

  useAzureMonitor(config);

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new MongoDBInstrumentation({ enhancedDatabaseReporting: true }),
      new DataloaderInstrumentation(),
      new GraphQLInstrumentation({ allowValues: true, ignoreTrivialResolveSpans: true }),
    ],
  });

  console.log('Application Insights configured');
} // End of the App Insights setup
