import { UserModel } from '../../../infrastructure/data-sources/cosmos-db/models/user';
import { RoleModel } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { ServiceTicketModel } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { MemberModel } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { CommunityModel } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { PropertyModel } from '../../../infrastructure/data-sources/cosmos-db/models/property';

import { Users } from './users';
import { Roles } from './roles';
import { ServiceTickets } from './service-tickets';
import { Members } from './members';
import { Communities } from './communities';
import { Properties } from './properties';

export const CosmosDB = {
  userApi: new Users(UserModel),
  roleApi: new Roles(RoleModel),
  serviceTicketApi: new ServiceTickets(ServiceTicketModel),
  memberApi: new Members(MemberModel),
  communityApi: new Communities(CommunityModel),
  propertyApi: new Properties(PropertyModel)
}

export type CosmosDBType = typeof CosmosDB;