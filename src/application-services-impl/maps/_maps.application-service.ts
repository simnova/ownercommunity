import { BaseApplicationService, BaseApplicationServiceExecutionContext } from "../_base.application-service";
import { Passport } from "../../app/domain/contexts/iam/passport";
import { MapsInfrastructureService } from "../../app/infrastructure-services/maps";

export class MapsApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> extends BaseApplicationService<Context> {

  public async withMaps(func: (passport: Passport, maps: MapsInfrastructureService) => Promise<void>): Promise<void> {
    await func(
      this.context.passport, 
      this.context.infrastructureServices.maps
    );
  }
}
