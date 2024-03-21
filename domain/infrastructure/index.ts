import { IContentModerator } from './content-moderator/interfaces';
import { VercelDomain } from './vercel/interfaces';
import { BlobStorageDomain } from './blob-storage/interfaces';
import { DatastoreDomain } from './datastore/interfaces';
import { CognitiveSearchDomain } from './cognitive-search/interfaces';

export interface DomainInfrastructure {
  vercel: VercelDomain;
  contentModerator: IContentModerator;
  cognitiveSearch: CognitiveSearchDomain;
  blobStorage: BlobStorageDomain;
  datastore: DatastoreDomain;
}
