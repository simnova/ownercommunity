import { IContentModerator } from './content-moderator/interfaces';
import { IVercel } from './vercel/interfaces';
import { ICognitiveSearch } from './cognitive-search/interfaces';
import { IBlobStorage } from './blob-storage/interfaces';
import { IDataStore } from './datastore/interfaces';

export interface IServices {
  vercel: IVercel;
  contentModerator: IContentModerator;
  cognitiveSearch: ICognitiveSearch;
  blobStorage: IBlobStorage;
  dataStore: IDataStore;
}
