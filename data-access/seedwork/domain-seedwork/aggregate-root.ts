import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { CustomDomainEvent, DomainEvent } from './domain-event';

export interface RootEventRegistry {
  addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get visa(): Visa;
}

export  class AggregateRoot<
  PropType extends DomainEntityProps,
  ContextType extends BaseDomainExecutionContext,
  VisaType extends Visa
> extends DomainEntity<PropType> implements RootEventRegistry {
  private _executionContext: ContextType;
  
  constructor(
    props: PropType, 
    private readonly _domainExecutionContext: ContextType,
    private readonly _visaFunc: (executionContext: ContextType) => VisaType,
  ) {
    super(props);
    this._executionContext = this._domainExecutionContext;
  }

  public get _context(): ContextType {
    return this._executionContext;
  }
  public get visa(): VisaType {
    return this._visaFunc(this._executionContext);
  }

  private _isDeleted: boolean = false;
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  protected set isDeleted(value: boolean) {
    this._isDeleted = value;
  }
  private domainEvents: DomainEvent[] = [];
  public addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.domainEvents.push(eventToAdd);
  }
  public clearDomainEvents() {
    this.domainEvents = [];
  }
  public getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  private integrationEvents: DomainEvent[] = [];
  public addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.integrationEvents.push(eventToAdd);
  }
  public clearIntegrationEvents() {
    this.integrationEvents = [];
  }
  public getIntegrationEvents(): DomainEvent[] {
    return this.integrationEvents;
  }

  public onSave(isModified: boolean): void {
    //override this method to do something on save
  }
}
