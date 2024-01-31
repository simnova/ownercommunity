import { Attributes, Context, Link, SpanKind, TraceFlags } from '@opentelemetry/api';
import { ReadableSpan, Sampler, SamplingDecision, SamplingResult, Span, SpanProcessor } from '@opentelemetry/sdk-trace-base';

// Currently samples nothing, regardless of
export class SpanFilterSampler implements Sampler {
  shouldSample(context: Context, traceId: string, spanName: string, spanKind: SpanKind, attributes: Attributes, links: Link[]): SamplingResult {
    const checkFilter = (attributes) => {
      if (attributes['graphql.field.name']?.valueOf().toString().includes('serverDate')) {
        return SamplingDecision.NOT_RECORD;
      }
      return SamplingDecision.RECORD_AND_SAMPLED;
    };

    const decision = { decision: checkFilter(attributes), attributes: attributes };

    return decision;
  }
}

export class SpanFilteringProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  onStart(_span: Span): void {}

  onEnd(span: ReadableSpan): void {
    if (span.attributes['graphql.source']?.valueOf().toString().includes('serverDate')) {
      // if (span.attributes['graphql.field.name']?.valueOf().toString().includes('property')) {
      span.attributes['ShouldThisBeFiltered?'] = 'YesItShould(SpanFilteringProcessor)';
      span.spanContext().traceFlags = TraceFlags.NONE; // Same as SamplingDecision.NOT_RECORD I think
    }
  }
}
