import { ContentModeratorDomain } from './content-moderator/interfaces';
import { VercelDomain } from './vercel/interfaces';
import { BlobStorageDomain } from './blob-storage/interfaces';
import { DatastoreDomain } from './datastore/interfaces';
import { CognitiveSearchDomain } from './cognitive-search/interfaces';

export interface DomainInfrastructure {
  vercel: VercelDomain;
  contentModerator: ContentModeratorDomain;
  cognitiveSearch: CognitiveSearchDomain;
  blobStorage: BlobStorageDomain;
  datastore: DatastoreDomain;
}
