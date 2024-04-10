import { Resolvers } from '../builder/generated';
const { trace } = require("@opentelemetry/api");


const serverDate: Resolvers = {
  Query: {
    serverDate: async (_parent, args, context) => {

let spanId = trace.getActiveSpan().spanContext().spanId;
let traceId = trace.getActiveSpan().spanContext().traceId;
let traceFlags = trace.getActiveSpan().spanContext().traceFlags;
let traceState = trace.getActiveSpan().spanContext().traceState;
let traceParent = trace.getActiveSpan().spanContext().traceParent;
let isRemote = trace.getActiveSpan().spanContext().isRemote;
let traceStateString = trace.getActiveSpan().spanContext().traceStateString;
let traceStateHeader = trace.getActiveSpan().spanContext().traceStateHeader;

console.log(`spanId: ${spanId}`);
console.log(`traceId: ${traceId}`);
console.log(`traceFlags: ${traceFlags}`);
console.log(`traceState: ${traceState}`);
console.log(`traceParent: ${traceParent}`);
console.log(`isRemote: ${isRemote}`);
console.log(`traceStateString: ${traceStateString}`);
console.log(`traceStateHeader: ${traceStateHeader}`);

      return (new Date()).toString();
    }
  }
};

export default serverDate;