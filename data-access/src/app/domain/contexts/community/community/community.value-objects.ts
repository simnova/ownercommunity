import { VOArray, VOString } from '@lucaspaganini/value-objects';

export class Name extends VOString({ trim: true, maxLength: 200 }) {}
export class Domain extends VOString({ trim: true, maxLength: 500 }) {}
export class WhiteLabelDomain extends VOString({ trim: true, maxLength: 500 }) {}
export class Handle extends VOString({ trim: true, maxLength: 50 }) {}
export class ApprovedVendors extends VOArray(VOString(), { maxLength: 50 }) {}
