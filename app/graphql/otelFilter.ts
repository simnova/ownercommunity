import { Attributes, Context, Link, SpanKind, TraceFlags } from '@opentelemetry/api';
import { ReadableSpan, Sampler, SamplingDecision, SamplingResult, Span, SpanProcessor } from '@opentelemetry/sdk-trace-base';

// Currently samples nothing, regardless of sampling decision. leaving here as reference
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
    const filter_word = 'serverDate';

    if ([span.attributes['graphql.field.name'], span.attributes['graphql.source']]?.valueOf().toString().includes(filter_word)) {
      span.attributes['ShouldThisBeFiltered?'] = "This should have been filtered, but wasn't";
      span.spanContext().traceFlags = TraceFlags.NONE;
    }
  }
}
