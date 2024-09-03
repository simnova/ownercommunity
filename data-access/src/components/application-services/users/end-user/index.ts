import { AppContext } from '../../../../../framework/app/app-context-builder';
import { EndUserModel } from '../../../external-dependencies/datastore';
import { EndUserUnitOfWork } from '../../../external-dependencies/domain';
import { EndUserDataApi, EndUserDataApiImpl } from './end-user.data';
import { EndUserDomainApi, EndUserDomainApiImpl } from './end-user.domain';

export interface EndUserApi { 
  dataApi: EndUserDataApi,
  domainApi: EndUserDomainApi,
}

export class EndUserApiImpl implements EndUserApi {
  dataApi: EndUserDataApi;
  domainApi: EndUserDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new EndUserDataApiImpl({ modelOrCollection: EndUserModel, context });
    this.domainApi = new EndUserDomainApiImpl({ unitOfWork: EndUserUnitOfWork, context });
  }
}