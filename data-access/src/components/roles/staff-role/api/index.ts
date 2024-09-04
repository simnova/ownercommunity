import { AppContext } from '../../../../../framework/app/app-context-builder';
import { StaffRoleModel } from '../../../external-dependencies/datastore';
import { StaffRoleUnitOfWork } from '../../../external-dependencies/domain';
import { StaffRoleDataApi, RoleDataApiImpl } from './staff-role.data';
import { StaffRoleDomainApi, StaffRoleDomainApiImpl } from './staff-role.domain';

export interface StaffRoleApi { 
  dataApi: StaffRoleDataApi,
  domainApi: StaffRoleDomainApi,
}

export class StaffRoleApiImpl implements StaffRoleApi {
  dataApi: StaffRoleDataApi;
  domainApi: StaffRoleDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new RoleDataApiImpl({ modelOrCollection: StaffRoleModel, context });
    this.domainApi = new StaffRoleDomainApiImpl({ unitOfWork: StaffRoleUnitOfWork, context });
  }

}