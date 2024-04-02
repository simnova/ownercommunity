import { AzContentModerator } from "../../../../seedwork/services-seedwork-content-moderator";
import { ContentModeratorInfrastructureService } from "../../../app/infrastructure-services/content-moderator";

export class AzContentModeratorImpl extends AzContentModerator implements ContentModeratorInfrastructureService {
  
  constructor(endpoint: string, subscriptionKey: string) {
      super(endpoint, subscriptionKey);
  }

  startup = async (): Promise<void> => {
    console.log('AzContentModeratorImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('AzContentModeratorImpl shutdown');
  }
}
