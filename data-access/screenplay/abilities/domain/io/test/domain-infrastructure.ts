// import { IContentModerator } from '../../../infrastructure/services/content-moderator';
// import { IVercel } from '../../../infrastructure/services/vercel';
// import { ICognitiveSearch } from '../../../infrastructure/services/cognitive-search';
// import { IBlobStorage } from '../../../infrastructure/services/blob-storage';
// import { CommunityUnitOfWork } from '../../domain/contexts/community/community.uow';
// import { MemberUnitOfWork } from '../../domain/contexts/community/member.uow';
// import { RoleUnitOfWork } from '../../domain/contexts/community/role.uow';
import { CognitiveSearchDomain } from '../../../../../src/app/domain/infrastructure/cognitive-search/interfaces';
import { DatastoreDomain } from '../../../../../src/app/domain/infrastructure/datastore/interfaces';

export interface DomainInfrastructureBDD_NOTINUSE {
  // vercel: IVercel;
  // contentModerator: IContentModerator;
  cognitiveSearch: CognitiveSearchDomain;
  // blobStorage: IBlobStorage;
  // communityUnitOfWork: CommunityUnitOfWork;
  // memberUnitOfWork: MemberUnitOfWork;
  // roleUnitOfWork: RoleUnitOfWork;
  datastore: DatastoreDomain;
}
