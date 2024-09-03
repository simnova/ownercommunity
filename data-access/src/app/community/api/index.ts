import { AppContext } from '../../../../framework/app/app-context-builder';
import { CommunityBlobApi, CommunityBlobApiImpl } from './community.blob';
import { CommunityDataApi, CommunityDataApiImpl } from './community.data';
import { CommunityDomainApi, CommunityDomainApiImpl } from './community.domain';
import { CommunityVercelApi, CommunityVercelApiImpl } from './community.vercel';
import { CommunityModel } from '../../external-dependencies/datastore';
import { CommunityUnitOfWork } from '../../external-dependencies/domain';

export interface CommunityApi { 
  blobApi: CommunityBlobApi,
  dataApi: CommunityDataApi,
  domainApi: CommunityDomainApi,
  vercelApi: CommunityVercelApi,
}

export class CommunityApiImpl implements CommunityApi {
  blobApi: CommunityBlobApi;
  dataApi: CommunityDataApi;
  domainApi: CommunityDomainApi;
  vercelApi: CommunityVercelApi;

  constructor(context: AppContext) {
    this.blobApi = new CommunityBlobApiImpl({ context });
    this.dataApi = new CommunityDataApiImpl({ modelOrCollection: CommunityModel, context });
    this.domainApi = new CommunityDomainApiImpl({ unitOfWork: CommunityUnitOfWork, context });
    this.vercelApi = new CommunityVercelApiImpl({ context });
  }

}