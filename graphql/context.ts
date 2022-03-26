import { DataSourcesType } from './data-sources';

export type Context = {
  verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
 
  };
  community:string;
  dataSources: DataSourcesType;
  executionContext: any;
}