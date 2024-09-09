import { DomainEntity, DomainEntityProps } from './domain-entity';
import { DomainEvent, DomainEventBase } from './domain-event';

export interface RootEventRegistry {
  addDomainEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
}

export  class AggregateRoot<PropType extends DomainEntityProps> extends DomainEntity<PropType> implements RootEventRegistry {
  private _isDeleted: boolean = false;
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  protected set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  private _syncDomainEvents: DomainEventBase[] = [];
  public addSyncDomainEvent<EventPayloadType, T extends DomainEvent<EventPayloadType>> (syncDomainEvent: new () => T, payload: T['payload']): void {
    let syncDomainEventToAdd = new syncDomainEvent();
    syncDomainEventToAdd.payload = payload;
    this._syncDomainEvents.push(syncDomainEventToAdd);
  }
  public clearSyncDomainEvents (): void {
    this._syncDomainEvents.splice(0, this._syncDomainEvents.length);
  }
  public getSyncDomainEvents(): DomainEventBase[] {
    return this._syncDomainEvents;
  }

  private domainEvents: DomainEventBase[] = [];
  public addDomainEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.domainEvents.push(eventToAdd);
  }
  public clearDomainEvents() {
    this.domainEvents = [];
  }
  public getDomainEvents(): DomainEventBase[] {
    return this.domainEvents;
  }

  private integrationEvents: DomainEventBase[] = [];
  public addIntegrationEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.integrationEvents.push(eventToAdd);
  }
  public clearIntegrationEvents() {
    this.integrationEvents = [];
  }
  public getIntegrationEvents(): DomainEventBase[] {
    return this.integrationEvents;
  }

  public onSave(isModified: boolean): void {
    //override this method to do something on save
  }
}
