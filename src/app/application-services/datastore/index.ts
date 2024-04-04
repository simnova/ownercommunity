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

import { CommunityData, RoleData, PropertyData, MemberData, ServiceData, ServiceTicketData, UserData } from "../../infrastructure-services/datastore";

export {
  UserDatastoreApplicationService as UserDataAPI, UserData,
  CommunityDatastoreApplicationService as CommunityDataAPI, CommunityData,
  MemberDatastoreApplicationService as MemberDataAPI, MemberData,
  RoleDatastoreApplicationService as RoleDataAPI, RoleData,
  PropertyDatastoreApplicationService as PropertyDataAPI, PropertyData,
  ServiceDatastoreApplicationService as ServiceDataAPI, ServiceData,
  ServiceTicketDatastoreApplicationService as ServiceTicketDataAPI, ServiceTicketData,
}