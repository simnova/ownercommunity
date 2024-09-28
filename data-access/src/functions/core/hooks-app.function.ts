import './telemetry/tracer';
import { wrapFunctionHandler } from './telemetry/wrapper';
// above has added to avoid the error: Accessing resource attributes before async attributes

import { app, AppStartContext, AppTerminateContext } from '@azure/functions';
import { initializeFunctionApp } from './initialize-function-app';

app.hook.appStart(async (context: AppStartContext) => {
    console.log('custom-log | app-start-hook | begin | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    await initializeFunctionApp();
    console.log('custom-log | app-start-hook | end | <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
});

app.hook.appTerminate((context: AppTerminateContext) => {
    console.log('custom-log | app-terminate-hook | begin | >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // add your logic here
    console.log('custom-log | app-terminate-hook | end | <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

});