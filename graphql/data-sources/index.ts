import { CosmosDB } from './cosmos-db';
import { Domain } from './domain';
import { Blob } from './blob';
import { CognitiveSearch } from './cognitive-search';
import { Maps } from './maps';
import { Vercel } from './vercel';
import { Context } from '../context';

export const DataSources = {
  ...CosmosDB,
  ...Domain,
  ...Blob,
  ...CognitiveSearch,
  ...Maps,
  ...Vercel
};

export type DataSourcesType = typeof DataSources;

export const initializeDataSources = (context: Context): DataSourcesType => {
  Object.keys(DataSources).forEach(key => {
    if (DataSources[key].initialize) {
      DataSources[key].initialize({ context });
    }
  });
  return DataSources;
};