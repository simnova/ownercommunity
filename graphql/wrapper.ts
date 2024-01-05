import appInsights from 'applicationinsights'; // Must be FIRST import

import { AzureFunction, Context } from '@azure/functions';
import api, { propagation, trace } from '@opentelemetry/api';
import { W3CTraceContextPropagator } from '@opentelemetry/core';

export const wrapFunctionHandler = (originalFunctionHandler: AzureFunction) => {
  return async function (context: Context, args: any) {
    // api.context.with(api.context.active(), async () => {
    const wc3Propagator = new W3CTraceContextPropagator();

    const headerInfo = {
      traceparent: context.req.headers['traceparent'],
      tracestate: context.req.headers['tracestate'],
    };

    //const contextWithParent = wc3Propagator.extract(api.context.active(),context.req.headers,defaultTextMapGetter);
    const activeContext = propagation.extract(api.context.active(), headerInfo);

    const tracer = trace.getTracer('PGAzureFunctions');

    //const tracer = api.context..getTraceHandler().getTracer();

    const span = tracer.startSpan('PGFunctionHandler', { attributes: {} }, activeContext); //TODO - need to see why this isn't showing up.
    trace.setSpan(activeContext, span);

    try {
      span.setAttribute('http.method', context.req.method);
      span.setAttribute('http.url', context.req.url);
      span.setAttribute('http.target', context.req.url);
      span.setAttribute('http.host', context.req.headers.host);
      span.setAttribute('http.route', context.req.url);

      const spanContext = span.spanContext();
      console.log(`Span Context: TraceId:`, spanContext.traceId);
      console.log(`Span Context: IsRemote:`, spanContext.isRemote);
      const result = await originalFunctionHandler(context, args);
      span.setAttribute('http.status_code', context.res.status);

      span.end();
      return result;
    } catch (err) {
      span.recordException(err);
      span.end();
      throw err;
    }

    console.log(`Context With Parent:`, activeContext);

    //output headers
    console.log('Headers: ', context.req.headers);
    console.log('HeaderInfo: ', headerInfo);

    //wc3Propagator.inject(api.context.active(),context.res.headers,defaultTextMapSetter);
  };
};

export const startup = () => appInsights;
