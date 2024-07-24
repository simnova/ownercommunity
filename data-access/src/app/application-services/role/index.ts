import { AppContext } from '../../init/app-context-builder';
import { RoleModel } from '../../external-dependencies/datastore';
import { RoleUnitOfWork } from '../../external-dependencies/domain';
import { RoleDataApi, RoleDataApiImpl } from './role.data';
import { RoleDomainApi, RoleDomainApiImpl } from './role.domain';

export interface RoleApi { 
  dataApi: RoleDataApi,
  domainApi: RoleDomainApi,
}

export class RoleApiImpl implements RoleApi {
  dataApi: RoleDataApi;
  domainApi: RoleDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new RoleDataApiImpl({ modelOrCollection: RoleModel, context });
    this.domainApi = new RoleDomainApiImpl({ unitOfWork: RoleUnitOfWork, context });
  }

}
