import { InvocationContext, Timer } from "@azure/functions";
import { BaseContext, BaseContextBuilder } from "../az-function-handler-seedwork-base/base-context-builder";
import { AppContextBase, VerifiedUser } from "../az-function-handler-seedwork-base/base-app-context";

export interface TimerContext<InfrastructureServicesType, ApplicationServicesType, PassportType> extends BaseContext<InfrastructureServicesType, ApplicationServicesType, PassportType> {
  timer: Timer;
  invocationId: string;
}

export abstract class TimerContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedJwtPayloadType, AppContextType extends AppContextBase<VerifiedUser<VerifiedJwtPayloadType>, PassportType, ApplicationServicesType, InfrastructureServicesType>>
extends BaseContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedUser<VerifiedJwtPayloadType>, AppContextType>
 implements TimerContext
 <InfrastructureServicesType, ApplicationServicesType, PassportType> {
  protected _verifiedUser: VerifiedUser<VerifiedJwtPayloadType>;
  protected _timerName: string;
  private _timer: Timer;
  private _invocationId: string;

  constructor(timer: Timer, context: InvocationContext, infrastructureServices: InfrastructureServicesType) {
    super(infrastructureServices);
    this._timer = timer;
    this._invocationId = context.invocationId;
    this._timerName = context.functionName;
  }

  get timer(): Timer {
    return this._timer;
  }

  get invocationId(): string {
    return this._invocationId;
  }
}