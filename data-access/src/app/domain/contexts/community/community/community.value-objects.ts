import { VOArray, VOObject, VOString } from '@lucaspaganini/value-objects';

export class Name extends VOString({ trim: true, maxLength: 200 }) {}
export class Domain extends VOString({ trim: true, maxLength: 500 }) {}
export class WhiteLabelDomain extends VOString({ trim: true, maxLength: 500 }) {}
export class Handle extends VOString({ trim: true, maxLength: 50 }) {}
class ApprovedVendor extends VOObject({
  vendorId: String,
  displayName: String,
  email: String,
  approvedBy: String,
}) {}
export class ApprovedVendors extends VOArray(ApprovedVendor, { maxLength: 50 }) {}
