import { UserModel } from '../../../infrastructure/data-sources/cosmos-db/models/user';
import { RoleModel } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { ServiceModel } from '../../../infrastructure/data-sources/cosmos-db/models/service';
import { ServiceTicketModel } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { MemberModel } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { CommunityModel } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { PropertyModel } from '../../../infrastructure/data-sources/cosmos-db/models/property';

import { Users } from './users';
import { Roles } from './roles';
import { Services } from './services';
import { ServiceTickets } from './service-tickets';
import { Members } from './members';
import { Communities } from './communities';
import { Properties } from './properties';

export const CosmosDB = {
  userCosmosdbApi: new Users(UserModel),
  roleCosmosdbApi: new Roles(RoleModel),
  serviceCosmosdbApi: new Services(ServiceModel),
  serviceTicketCosmosdbApi: new ServiceTickets(ServiceTicketModel),
  memberCosmosdbApi: new Members(MemberModel),
  communityCosmosdbApi: new Communities(CommunityModel),
  propertyCosmosdbApi: new Properties(PropertyModel)
}