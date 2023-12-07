import { ApplicationInsightsClient, ApplicationInsightsConfig } from "applicationinsights"; //must be FIRST import
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { MongoDBInstrumentationConfig } from "@opentelemetry/instrumentation-mongodb";
import { HttpInstrumentationConfig } from "@opentelemetry/instrumentation-http";
import { DataloaderInstrumentation} from "@opentelemetry/instrumentation-dataloader";
import { LoggerProvider, SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { logs }  from "@opentelemetry/api-logs";
import { AzureMonitorLogExporter } from "@azure/monitor-opentelemetry-exporter";
import { Resource } from "@opentelemetry/resources";

let appInsights : ApplicationInsightsClient

if(!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || process.env.APPLICATIONINSIGHTS_CONNECTION_STRING.length === 0){
  console.log('Application Insights not configured');
} else {
  const aiConfig = new ApplicationInsightsConfig();
  aiConfig.azureMonitorExporterConfig.connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
  aiConfig.samplingRatio = 1.0; //default is 1.0 (100%) - may want to move downwards in production
  aiConfig.enableAutoCollectExceptions = true;  //unhandled exceptions sent (default is true) - keep this enabled
  aiConfig.enableAutoCollectPerformance = true; //sends once per minute (default is true)
  aiConfig.enableAutoCollectStandardMetrics = true; //sends once per minute (default is true)
  aiConfig.logInstrumentations =  {
    console: {enabled: false}, //logs console (can also use this option for winston/bunyan)
  }
  aiConfig.instrumentations = {
    http: {
      enabled: true,
    } as HttpInstrumentationConfig,
    mongoDb: {
      enabled: true,
      enhancedDatabaseReporting: true // adds query parameters to telemetry
    } as MongoDBInstrumentationConfig,
  }

  // Shows the Role Name: <<SERVICE_NAMESPACE>>.<<SERVICE_NAME>> and  Role Instance : <<SERVICE_INSTANCE_ID>> in Application Insights
  /*
  const customResource = Resource.EMPTY;
  customResource.attributes[SemanticResourceAttributes.SERVICE_NAMESPACE] = "OwnerCommunity";
  customResource.attributes[SemanticResourceAttributes.SERVICE_NAME] = "DataAccess";
  customResource.attributes[SemanticResourceAttributes.SERVICE_INSTANCE_ID] = "Local";
  */

  const customResource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAMESPACE] : "OwnerCommunity",
    [SemanticResourceAttributes.SERVICE_NAME] : "DataAccess",
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID] : "Local"
  });
  aiConfig.resource.merge(customResource);


  appInsights = new ApplicationInsightsClient(aiConfig);


  
  const traceHandler = appInsights.getTraceHandler();
  traceHandler.addInstrumentation(new GraphQLInstrumentation({ allowValues: true })); 
  traceHandler.addInstrumentation(new DataloaderInstrumentation()); 
 



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
} 


export default () => appInsights;