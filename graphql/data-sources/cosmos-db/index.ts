import { UserModel } from '../../../infrastructure/data-sources/cosmos-db/models/user';

import { Users } from './users';

export const CosmosDB = {
  userAPI: new Users(UserModel),
}

export type CosmosDBType = typeof CosmosDB;