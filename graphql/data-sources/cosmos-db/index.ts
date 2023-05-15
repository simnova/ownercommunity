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

// export const Cosmosdb = {
//   userCosmosdbApi: new Users({ collection: UserModel, context: {} as any }),
//   roleCosmosdbApi: new Roles({ collection: RoleModel, context: {} as any }),
//   serviceCosmosdbApi: new Services({ collection: ServiceModel, context: {} as any }),
//   serviceTicketCosmosdbApi: new ServiceTickets({ collection: ServiceTicketModel, context: {} as any }),
//   memberCosmosdbApi: new Members({ collection: MemberModel, context: {} as any }),
//   communityCosmosdbApi: new Communities({ collection: CommunityModel, context: {} as any }),
//   propertyCosmosdbApi: new Properties({ collection: PropertyModel, context: {} as any }),
// };

export {
  Users as UserCosmosdbAPI,
  UserModel,
  Roles as RoleCosmosdbAPI,
  RoleModel,
  Services as ServiceCosmosdbAPI,
  ServiceModel,
  ServiceTickets as ServiceTicketCosmosdbAPI,
  ServiceTicketModel,
  Members as MemberCosmosdbAPI,
  MemberModel,
  Communities as CommunityCosmosdbAPI,
  CommunityModel,
  Properties as PropertyCosmosdbAPI,
  PropertyModel
}