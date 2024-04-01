import { BaseApplicationService, BaseApplicationServiceExecutionContext } from "../_base.application-service";
import { Passport } from "../../core/domain/contexts/iam/passport";
import { MapsInfrastructureService } from "../../core/infrastructure-services/maps";

export class MapsApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withMaps(func: (passport: Passport, maps: MapsInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this._context.passport, 
      this._context.infrastructureServices.maps
    );
  }
}
