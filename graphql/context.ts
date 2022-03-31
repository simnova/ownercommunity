import { Passport } from '../domain/contexts/iam/passport';
import { DataSourcesType } from './data-sources';

export type Context = {
  verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
 
  };
  community:string;
  passport: Passport;
  dataSources: DataSourcesType;
  executionContext: any;
}