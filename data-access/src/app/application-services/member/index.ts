import { AppContext } from '../../init/app-context-builder';
import { MemberModel } from '../../external-dependencies/datastore';
import { MemberUnitOfWork } from '../../external-dependencies/domain';
import { MemberBlobApi, MemberBlobApiImpl } from './member.blob';
import { MemberDataApi, MemberDataApiImpl } from './member.data';
import { MemberDomainApi, MemberDomainApiImpl } from './member.domain';

export interface MemberApi { 
  blobApi: MemberBlobApi,
  dataApi: MemberDataApi,
  domainApi: MemberDomainApi,
}

export class MemberApiImpl implements MemberApi {
  blobApi: MemberBlobApi;
  dataApi: MemberDataApi;
  domainApi: MemberDomainApi;

  constructor(context: AppContext) {
    this.blobApi = new MemberBlobApiImpl({ context });
    this.dataApi = new MemberDataApiImpl({ modelOrCollection: MemberModel, context });
    this.domainApi = new MemberDomainApiImpl({ unitOfWork: MemberUnitOfWork, context });
  }

}