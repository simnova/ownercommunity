import { AzCognitiveSearch } from "../../../../services-seedwork-cognitive-search-az";
import { CognitiveSearchInfrastructure } from "../../interfaces";

export class AzCognitiveSearchImpl extends AzCognitiveSearch implements CognitiveSearchInfrastructure {
  
  /**
   * needs following environment variables:
   ** NODE_ENV =  "development" | "test" | "production"
   ** MANAGED_IDENTITY_CLIENT_ID: DefaultAzureCredentialOptions
   * 
   */  
  constructor(searchKey: string, endpoint: string) {
      super(searchKey,  endpoint);
  }
}
