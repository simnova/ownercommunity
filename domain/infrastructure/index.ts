import { IContentModerator } from './content-moderator/interfaces';
import { IVercel } from './vercel/interfaces';
import { IBlobStorage } from './blob-storage/interfaces';
import { DataStoreInfrastructure } from '../../infrastructure-impl/datastore/interfaces';
import { CognitiveSearchInfrastructure } from '../../infrastructure-impl/cognitive-search/interfaces';

export interface DomainInfrastructure {
  vercel: IVercel;
  contentModerator: IContentModerator;
  cognitiveSearch: CognitiveSearchInfrastructure;
  blobStorage: IBlobStorage;
  dataStore: DataStoreInfrastructure;
}
