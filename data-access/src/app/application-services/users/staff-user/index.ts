import { AppContext } from '../../../init/app-context-builder';
import { StaffUserModel } from '../../../external-dependencies/datastore';
import { StaffUserUnitOfWork } from '../../../external-dependencies/domain';
import { StaffUserDataApi, StaffUserDataApiImpl } from './staff-user.data';
import { StaffUserDomainApi, StaffUserDomainApiImpl } from './staff-user.domain';

export interface StaffUserApi { 
  dataApi: StaffUserDataApi,
  domainApi: StaffUserDomainApi,
}

export class StaffUserApiImpl implements StaffUserApi {
  dataApi: StaffUserDataApi;
  domainApi: StaffUserDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new StaffUserDataApiImpl({ modelOrCollection: StaffUserModel, context });
    this.domainApi = new StaffUserDomainApiImpl({ unitOfWork: StaffUserUnitOfWork, context });
  }
}