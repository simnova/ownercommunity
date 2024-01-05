import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from 'applicationinsights'; // Must be FIRST import

import { AzureMonitorLogExporter } from '@azure/monitor-opentelemetry-exporter';
import { logs } from '@opentelemetry/api-logs';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DataloaderInstrumentation } from '@opentelemetry/instrumentation-dataloader';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';

import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { Resource } from '@opentelemetry/resources';
import { LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

if (!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING.length === 0) {
  console.log('Application Insights not configured');
} else {
  const customResource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: 'OwnerCommunity',
    [SemanticResourceAttributes.SERVICE_NAME]: 'DataAccess',
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: 'Local',
  });

  const config: AzureMonitorOpenTelemetryOptions = {
    azureMonitorExporterOptions: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    },
    samplingRatio: 1,
    enableAutoCollectExceptions: true,
    enableAutoCollectPerformance: true,
    // instrumentationOptions: {
    //   http: { enabled: true } as HttpInstrumentationConfig,
    //   mongoDb: { enabled: true, enhancedDatabaseReporting: true } as MongoDBInstrumentationConfig,
    // },
    // resource: customResource,
    // logInstrumentationOptions: {
    //   console: { enabled: true },
    //   bunyan: { enabled: true },
    //   winston: { enabled: true },
    // },
    // extendedMetrics: {
    //   gc: true,
    //   heap: true,
    //   loop: true,
    // },
  };
  useAzureMonitor(config);

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new MongoDBInstrumentation({ enhancedDatabaseReporting: true }),
      new GraphQLInstrumentation({ allowValues: true, ignoreTrivialResolveSpans: true}),
      new DataloaderInstrumentation(),
    ],
  });

  // Setup Logger
  const loggerProvider = new LoggerProvider({
    resource: customResource,
  });
  const logExporter = new AzureMonitorLogExporter({
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
  });
  loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(logExporter));
  logs.setGlobalLoggerProvider(loggerProvider);

  console.log('Application Insights configured');
} // End of the App Insights setup

