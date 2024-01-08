import { Attributes, Context, Link, SpanKind, TraceFlags, TraceAPI } from '@opentelemetry/api';
import { ReadableSpan, Sampler, SamplingDecision, SamplingResult, Span, SpanProcessor, BasicTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

export class SpanFilterSampler implements Sampler {
  shouldSample(context: Context, traceId: string, spanName: string, spanKind: SpanKind, attributes: Attributes, links: Link[]): SamplingResult {
    const traceIdBytes = traceId.slice(-8);
    const traceIdInt = parseInt(traceIdBytes, 16);
    const shouldSample = checkFilter(attributes);
    const decision = {
      decision: shouldSample ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD,
      attributes: { 'CanLukaDetectThis?': 'YesHeCan(SpanFilterSampler)' }, // Try and mark the span as filtered, in case it can mark but not block it
    };

    return decision;
  }
}

const checkFilter = (attributes) => {
  if (
    attributes['graphql.source']?.includes('serverDate') // || // TODO - Figure out if there are any other places serverDate could hide
    // attributes['Message']?.includes('serverDate')
  ) {
    console.log('Blocking serverDate (Custom Sampler)');
    return true;
  }
  return false;
};

// TODO - decide what we want to do with this. Leave as reference for applying attributes to spans pre-export?
export class SpanEnrichingProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  onStart(_span: Span): void {}

  onEnd(span: ReadableSpan) {
    span.attributes['CanLukaDetectThis?'] = 'YesHeCan(SpanEnrichingProcessor)';

    if (span.attributes['graphql.source']?.valueOf().toString().includes('serverDate')) {
      span.attributes['CanLukaFilterThis?'] = 'YesHeCan(SpanEnrichingProcessor)';
      span.spanContext().traceFlags = TraceFlags.NONE; // Same as SamplingDecision.NOT_RECORD I think
    }
  }
}
