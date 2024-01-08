import { AzureFunction, Context } from "@azure/functions";
import api, { propagation, trace } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import appInsights from "applicationinsights"; //must be FIRST import





export const wrapFunctionHandler = ( originalFunctionHandler: AzureFunction) => {
  return async function (context : Context, args : any) {
    
   // api.context.with(api.context.active(), async () => {
    


    const headerInfo = {
      traceparent: context.req.headers['traceparent'],
      tracestate: context.req.headers['tracestate']
    }
    
    //const contextWithParent = wc3Propagator.extract(api.context.active(),context.req.headers,defaultTextMapGetter);
    const activeContext = propagation.extract(api.context.active(),headerInfo);
    

    
    const tracer = trace.getTracer("PGAzureFunctions");

    //const tracer = api.context..getTraceHandler().getTracer();


    const span = tracer.startSpan("PGFunctionHandler",{attributes:{}}, activeContext); // Need to see why this isn't showing up.
    trace.setSpan(activeContext, span);


    try {
    
      span.setAttribute("http.method", context.req.method);
      span.setAttribute("http.url", context.req.url);
      span.setAttribute("http.target", context.req.url);
      span.setAttribute("http.host", context.req.headers.host);
      span.setAttribute("http.route", context.req.url);

      const spanContext = span.spanContext();
      console.log(`Span Context: TraceId:`, spanContext.traceId);
      console.log(`Span Context: IsRemote:`, spanContext.isRemote);
      const result = await originalFunctionHandler(context, args);
      span.setAttribute("http.status_code", context.res.status);

      span.end();
      return result;
    } catch (err) {
      span.recordException(err);
      span.end();
      throw err;
    }    
  }
}

export const startup = () => appInsights;