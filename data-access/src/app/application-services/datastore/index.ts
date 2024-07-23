// user
import { UserDatastoreApplicationService } from './user.interface';
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
// violation-ticket
import { ViolationTicketDatastoreApplicationService } from './violation-ticket.interface';

export {
  UserDatastoreApplicationService as UserDataApi,
  MemberDatastoreApplicationService as MemberDataApi,
  RoleDatastoreApplicationService as RoleDataApi,
  PropertyDatastoreApplicationService as PropertyDataApi,
  ServiceDatastoreApplicationService as ServiceDataApi,
  ServiceTicketDatastoreApplicationService as ServiceTicketDataApi,
  ViolationTicketDatastoreApplicationService as ViolationTicketDataApi
}