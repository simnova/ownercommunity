import { AzContentModerator } from "../../../services-seedwork-content-moderator";
import { ContentModeratorInfrastructure } from "../interfaces";

export class AzContentModeratorImpl extends AzContentModerator implements ContentModeratorInfrastructure {
  
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
