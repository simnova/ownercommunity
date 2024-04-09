// user
import { UserDatastoreApplicationService } from './user.interface';
// community
import { CommunityDatastoreApplicationService } from './community.interface';
// member
import { MemberDatastoreApplicationService } from './member.interface';
// role
import { RoleDatastoreApplicationService } from './role.interface';
// property
import { PropertyDatastoreApplicationService } from './property.interface';
// service
import { ServiceDatastoreApplicationService } from './service.interface';
// service-ticket
import { ServiceTicketDatastoreApplicationService } from './service-ticket.interface';

export {
  UserDatastoreApplicationService as UserDataApi,
  CommunityDatastoreApplicationService as CommunityDataApi,
  MemberDatastoreApplicationService as MemberDataApi,
  RoleDatastoreApplicationService as RoleDataApi,
  PropertyDatastoreApplicationService as PropertyDataApi,
  ServiceDatastoreApplicationService as ServiceDataApi,
  ServiceTicketDatastoreApplicationService as ServiceTicketDataApi,
}