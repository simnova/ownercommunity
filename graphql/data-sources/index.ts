import { CosmosDB, CosmosDBType } from './cosmos-db';
import { Domain, DomainType } from './domain';
import { Blob, BlobType } from './blob';

export const DataSources = {
  ...CosmosDB,
  ...Domain,
  ...Blob,
}

export type DataSourcesType = CosmosDBType & DomainType & BlobType;