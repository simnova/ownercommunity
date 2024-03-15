import { IContentModerator } from './IContentModerator';
import { IVercel } from './IVercel';
import { ICognitiveSearch } from './ICognitiveSearch';
import { IBlobStorage } from './IBlobStorage';
import { IDataStore } from './IDataStore';

export interface IServices {
  vercel: IVercel;
  contentModerator: IContentModerator;
  cognitiveSearch: ICognitiveSearch;
  blobStorage: IBlobStorage;
  dataStore: IDataStore;
}
