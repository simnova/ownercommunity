import { DomainEventBase } from './domain-event';

export interface HandleEvent<T> {
  handle(event: T): void;
}

export class HandleEventImpl<T extends DomainEventBase> implements HandleEvent<T> {
  constructor(private eventHandler: (event: T) => void) {}

  public static register<T extends DomainEventBase>(eventHandler: (event: T) => void): HandleEvent<T> {
    return new HandleEventImpl(eventHandler);
  }

  registerAll(eventHandlers: HandleEvent<T>[]): HandleEvent<T> {
    return new HandleEventImpl((event) => {
      eventHandlers.forEach((eh) => eh.handle(event));
    });
  }

  handle(event: T): void {
    this.eventHandler(event);
  }
}
