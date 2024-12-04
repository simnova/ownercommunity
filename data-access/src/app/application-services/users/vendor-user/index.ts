import { AppContext } from '../../../init/app-context-builder';
import { VendorUserModel } from '../../../external-dependencies/datastore';
import { VendorUserUnitOfWork } from '../../../external-dependencies/domain';
import { VendorUserDataApi, VendorUserDataApiImpl } from './vendor-user.data';
import { VendorUserDomainApi, VendorUserDomainApiImpl } from './vendor-user.domain';

export interface VendorUserApi { 
  dataApi: VendorUserDataApi,
  domainApi: VendorUserDomainApi,
}

export class VendorUserApiImpl implements VendorUserApi {
  dataApi: VendorUserDataApi;
  domainApi: VendorUserDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new VendorUserDataApiImpl({ modelOrCollection: VendorUserModel, context });
    this.domainApi = new VendorUserDomainApiImpl({ unitOfWork: VendorUserUnitOfWork, context });
  }
}