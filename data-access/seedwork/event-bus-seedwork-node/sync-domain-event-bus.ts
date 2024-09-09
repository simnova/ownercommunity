import { DomainEvent, DomainEventBase } from "../domain-seedwork/domain-event";

export interface SyncDomainEventBus {
  register<PayloadType>(callback: (event: DomainEvent<PayloadType>) => void, eventClassName: string): void
  dispatch<T extends DomainEventBase> (event: T): void
}

class SyncDomainEventBusImpl 
  implements SyncDomainEventBus
{
  private static instance: SyncDomainEventBusImpl;
  private handlersMap = {};

public register<PayloadType>(callback: (event: DomainEvent<PayloadType>) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public clearHandlers(): void {
    this.handlersMap = {};
  }

  public dispatch<T extends DomainEventBase> (event: T): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }

  public static getInstance(): SyncDomainEventBusImpl {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
}

export const SyncDomainEventBusInstance = SyncDomainEventBusImpl.getInstance();
