import { AppContext } from '../../../../../framework/app/app-context-builder';
import { EndUserRoleModel } from '../../../external-dependencies/datastore';
import { EndUserRoleUnitOfWork } from '../../../external-dependencies/domain';
import { EndUserRoleDataApi, EndUserRoleDataApiImpl } from './end-user-role.data';
import { EndUserRoleDomainApi, EndUserRoleDomainApiImpl } from './end-user-role.domain';

export interface EndUserRoleApi { 
  dataApi: EndUserRoleDataApi,
  domainApi: EndUserRoleDomainApi,
}

export class EndUserRoleApiImpl implements EndUserRoleApi {
  dataApi: EndUserRoleDataApi;
  domainApi: EndUserRoleDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new EndUserRoleDataApiImpl({ modelOrCollection: EndUserRoleModel, context });
    this.domainApi = new EndUserRoleDomainApiImpl({ unitOfWork: EndUserRoleUnitOfWork, context });
  }

}