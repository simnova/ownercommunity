import { AppContext } from '../../init/app-context-builder';
import { ServiceModel } from '../../external-dependencies/datastore';
import { ServiceUnitOfWork } from '../../external-dependencies/domain';
import { ServiceDataApi, ServiceDataApiImpl } from './service.data';
import { ServiceDomainApi, ServiceDomainApiImpl } from './service.domain';

export interface ServiceApi { 
  dataApi: ServiceDataApi,
  domainApi: ServiceDomainApi,
}

export class ServiceApiImpl implements ServiceApi {
  dataApi: ServiceDataApi;
  domainApi: ServiceDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new ServiceDataApiImpl({ modelOrCollection: ServiceModel, context });
    this.domainApi = new ServiceDomainApiImpl({ unitOfWork: ServiceUnitOfWork, context });
  }

}
