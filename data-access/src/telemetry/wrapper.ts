import { HttpHandler, HttpRequest, InvocationContext } from '@azure/functions';
import api, { propagation, trace } from '@opentelemetry/api';
import { W3CTraceContextPropagator } from '@opentelemetry/core';

export const wrapFunctionHandler = (originalFunctionHandler: HttpHandler) => {
  return async function (request: HttpRequest, context: InvocationContext) {
    // api.context.with(api.context.active(), async () => {
    const wc3Propagator = new W3CTraceContextPropagator();

    const headerInfo = {
      traceparent: context.traceContext.traceParent,
      tracestate: context.traceContext.traceState,
    };

    //const contextWithParent = wc3Propagator.extract(api.context.active(),request.headers,defaultTextMapGetter);
    const activeContext = propagation.extract(api.context.active(), headerInfo);

    const tracer = trace.getTracer('PGAzureFunctions');

    //const tracer = api.context..getTraceHandler().getTracer();

    const span = tracer.startSpan('PGFunctionHandler', { attributes: {} }, activeContext); //TODO - need to see why this isn't showing up.
    trace.setSpan(activeContext, span);

    try {
      span.setAttribute('http.method', request.method);
      span.setAttribute('http.url', request.url);
      span.setAttribute('http.target', request.url);
      span.setAttribute('http.host', request.headers.get('host'));
      span.setAttribute('http.route', request.url);

      const spanContext = span.spanContext();
      console.log(`Span Context: TraceId:`, spanContext.traceId);
      console.log(`Span Context: IsRemote:`, spanContext.isRemote);
      const result = await originalFunctionHandler(request, context);
      span.setAttribute('http.status_code', result.status);

      span.end();
      return result;
    } catch (err) {
      span.recordException(err);
      span.end();
      throw err;
    }
  };
};
