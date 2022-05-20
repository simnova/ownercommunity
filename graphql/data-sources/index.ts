import { CosmosDB, CosmosDBType } from './cosmos-db';
import { Domain, DomainType } from './domain';
import { Blob, BlobType } from './blob';
import { CognitiveSearch, CognitiveSearchType } from './cognitive-search';

export const DataSources = {
  ...CosmosDB,
  ...Domain,
  ...Blob,
  ...CognitiveSearch,
};

export type DataSourcesType = CosmosDBType & DomainType & BlobType & CognitiveSearchType;
