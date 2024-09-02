import { VercelApi } from "../../../../seedwork/services-seedwork-vercel-api";
import { VercelInfrastructureService } from "../../../../framework/infrastructure-services/vercel.infra.interface";

export class VercelApiImpl extends VercelApi implements VercelInfrastructureService {
  
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
