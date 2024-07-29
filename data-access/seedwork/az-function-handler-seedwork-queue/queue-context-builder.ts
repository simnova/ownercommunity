import { InvocationContext } from "@azure/functions";
import { BaseContext, BaseContextBuilder } from "../az-function-handler-seedwork-base/base-context-builder";
import { AppContextBase, VerifiedUser } from "../az-function-handler-seedwork-base/base-app-context";

export interface QueueContext<InfrastructureServicesType, ApplicationServicesType, PassportType> extends BaseContext<InfrastructureServicesType, ApplicationServicesType, PassportType> {
  payload: any;
  invocationId: string;
}

export abstract class QueueContextBuilder
<InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedJwtPayloadType, AppContextType extends AppContextBase<VerifiedUser<VerifiedJwtPayloadType>, PassportType, ApplicationServicesType, InfrastructureServicesType>>
 extends BaseContextBuilder
 <InfrastructureServicesType, ApplicationServicesType, PassportType, VerifiedUser<VerifiedJwtPayloadType>, AppContextType>
  implements QueueContext
  <InfrastructureServicesType, ApplicationServicesType, PassportType> {
  protected _verifiedUser: VerifiedUser<VerifiedJwtPayloadType>;
  private _payload: any;
  private _invocationId: string;

  constructor(queueItem: any, context: InvocationContext, infrastructureServices: InfrastructureServicesType) {
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