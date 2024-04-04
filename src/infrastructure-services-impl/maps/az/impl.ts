import { AzMaps } from "../../../../seedwork/services-seedwork-maps-az";
import { MapsInfrastructureService } from "../../../app/infrastructure-services/maps";

export class AzMapsImpl extends AzMaps implements MapsInfrastructureService {
  
  /**
   * needs following environment variables:
    ** MAPS_AZURE_SUBSCRIPTION_ID
    ** MAPS_RESOURCE_GROUP
    ** MAPS_OBJECT_PRINCIPAL_ID
    ** MAPS_ACCOUNT_NAME
    ** MAPS_USER_ASSIGNED_FUNCTION_IDENTITY_CLIENT_ID
   */  
  constructor() {
      super();
  }
}
