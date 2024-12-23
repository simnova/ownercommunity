import { AzCognitiveSearch } from "../../../../seedwork/services-seedwork-cognitive-search-az";
import { CognitiveSearchInfrastructureService } from "../../../app/infrastructure-services/cognitive-search";

export class AzCognitiveSearchImpl extends AzCognitiveSearch implements CognitiveSearchInfrastructureService {
  
  /**
   * needs following environment variables:
   ** NODE_ENV =  "development" | "test" | "production"
   ** MANAGED_IDENTITY_CLIENT_ID: DefaultAzureCredentialOptions
   * 
   */  
  constructor(endpoint: string) {
      super( endpoint);
  }

  startup = async (): Promise<void> => {
    console.log('custom-log | AzCognitiveSearchImpl | startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('custom-log | AzCognitiveSearchImpl | shutdown');
  }
}
