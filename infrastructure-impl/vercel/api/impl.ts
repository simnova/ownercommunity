import { VercelApi } from "../../../services-seedwork-vercel-api";
import { VercelInfrastructure } from "../interfaces";

export class VercelApiImpl extends VercelApi implements VercelInfrastructure {
  
  constructor(vercelToken: string, vercelProject: string) {
      super(vercelToken, vercelProject);
  }

  startup = async (): Promise<void> => {
    console.log('VercelApiImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('VercelApiImpl shutdown');
  }
}
