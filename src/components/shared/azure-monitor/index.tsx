import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights, DistributedTracingModes, ITelemetryItem } from '@microsoft/applicationinsights-web';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString: `${import.meta.env.VITE_APP_INSIGHTS_CONNECTION_STRING}`,
    extensions: [reactPlugin],
    extensionConfig: {},
    enableAutoRouteTracking: true, // option to log all route changes, compatible with react-router v6+
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true, // require for cross domain tracking
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
    distributedTracingMode: DistributedTracingModes.W3C

    
  }
});
appInsights.loadAppInsights();

// Creating Telemetry Initializer
// https://github.com/microsoft/ApplicationInsights-JS#telemetry-initializers
appInsights.addTelemetryInitializer((env:ITelemetryItem) => {
    env.tags = env.tags ?? [];
    env.tags["ai.cloud.role"] = "OwnerCommunity-UI";
});

export { appInsights, reactPlugin };
