import { InvocationContext } from "@azure/functions";
import { InfrastructureServicesBuilder } from "../../src/init/infrastructure-services-builder";
import { BaseContext, BaseContextBuilder } from "../seedwork-az-function-handler_base/base-context-builder";

export interface QueueContext extends BaseContext {
  payload: any;
  invocationId: string;
}

export abstract class QueueContextBuilder extends BaseContextBuilder implements QueueContext{
  private _payload: any;
  private _invocationId: string;

  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServicesBuilder) {
    super(infrastructureServices);
    this._payload = JSON.parse(JSON.stringify(queueItem));
    this._invocationId = context.invocationId;
  }

  get payload(): any {
    return this._payload;
  }

  get invocationId(): string {
    return this._invocationId;
  
  }
}