import { InvocationContext, Timer } from "@azure/functions";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import { BaseContext, BaseContextBuilder } from "../seedwork-az-function-handler_base/base-context-builder";

export interface TimerContext extends BaseContext {
  timer: Timer;
  invocationId: string;
}

export abstract class TimerContextBuilder extends BaseContextBuilder implements TimerContext {
  private _timer: Timer;
  private _invocationId: string;

  constructor(timer: Timer, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    super(infrastructureServices);
    this._timer = timer;
    this._invocationId = context.invocationId;
  }

  get timer(): Timer {
    return this._timer;
  }

  get invocationId(): string {
    return this._invocationId;
  }
}