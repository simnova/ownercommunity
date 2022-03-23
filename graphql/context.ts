import { DataSourcesType } from './data-sources';

export type Context = {
  verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  dataSources: DataSourcesType;
  executionContext: any;
}