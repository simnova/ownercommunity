export interface AuditContextBase {
    timestamp: Date;
}

export abstract class AuditContextBaseImpl implements AuditContextBase {
    get timestamp(): Date {
        return new Date();
    }
}
