import { CosmosDB } from './cosmos-db';
import { Domain } from './domain';
import { Blob } from './blob';
import { CognitiveSearch } from './cognitive-search';
import { Maps } from './maps';

export const DataSources = {
  ...CosmosDB,
  ...Domain,
  ...Blob,
  ...CognitiveSearch,
  ...Maps,
};

export type DataSourcesType = typeof DataSources;
