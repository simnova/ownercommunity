export interface DomainEventBase {
  get aggregateId(): string;
}
export abstract class DomainEventBaseImpl implements DomainEventBase {
  constructor(private readonly _aggregateId: string) {}
  get aggregateId(): string {
    return this._aggregateId;
  }
}

export interface DomainEvent<T> extends DomainEventBase {
  get payload(): T;
  set payload(payload: T);
}
export abstract class DomainEventImpl<T> extends DomainEventBaseImpl implements DomainEvent<T> {
  private _payload: T;
  get payload(): T {
    return this._payload;
  }
  set payload(payload: T) {
    this._payload = payload;
  }
}
