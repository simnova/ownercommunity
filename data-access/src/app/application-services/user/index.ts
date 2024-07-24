import { AppContext } from '../../init/app-context-builder';
import { UserModel } from '../../external-dependencies/datastore';
import { UserUnitOfWork } from '../../external-dependencies/domain';
import { UserDataApi, UserDataApiImpl } from './user.data';
import { UserDomainApi, UserDomainApiImpl } from './user.domain';

export interface UserApi { 
  dataApi: UserDataApi,
  domainApi: UserDomainApi,
}

export class UserApiImpl implements UserApi {
  dataApi: UserDataApi;
  domainApi: UserDomainApi;

  constructor(context: AppContext) {
    this.dataApi = new UserDataApiImpl({ modelOrCollection: UserModel, context });
    this.domainApi = new UserDomainApiImpl({ unitOfWork: UserUnitOfWork, context });
  }

}
