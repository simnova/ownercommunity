export interface AuditContextBase {
    timestamp: Date;
}

export abstract class AuditContextBaseImpl implements AuditContextBase {
    private _timestamp: Date;
    constructor() {
        this._timestamp = new Date();
    }
    get timestamp(): Date {
        return this._timestamp;
    }
}
