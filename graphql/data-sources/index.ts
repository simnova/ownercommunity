import { CosmosDB, CosmosDBType } from './cosmos-db';
import { Domain, DomainType } from './domain';
import { Blob, BlobType } from './blob';
import { CognitiveSearch, CognitiveSearchType } from './cognitive-search';
import { Maps, MapsType } from './maps';

export const DataSources = {
  ...CosmosDB,
  ...Domain,
  ...Blob,
  ...CognitiveSearch,
  ...Maps,
};

export type DataSourcesType = CosmosDBType & DomainType & BlobType & CognitiveSearchType & MapsType;
