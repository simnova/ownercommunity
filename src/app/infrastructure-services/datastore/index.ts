import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";
import { CommunityDatastoreInfrastructureService, CommunityData } from "./community";
import { MemberDatastoreInfrastructureService, MemberData } from "./member";
import { PropertyDatastoreInfrastructureService, PropertyData } from "./property";
import { RoleDatastoreInfrastructureService, RoleData } from "./role";
import { ServiceDatastoreInfrastructureService, ServiceData } from "./service";
import { ServiceTicketDatastoreInfrastructureService, ServiceTicketData } from "./service-ticket";
import { UserDatastoreInfrastructureService, UserData } from "./user";

export {
  CommunityDatastoreInfrastructureService, CommunityData,
  MemberDatastoreInfrastructureService, MemberData,
  PropertyDatastoreInfrastructureService, PropertyData,
  RoleDatastoreInfrastructureService, RoleData,
  ServiceDatastoreInfrastructureService, ServiceData,
  ServiceTicketDatastoreInfrastructureService, ServiceTicketData,
  UserDatastoreInfrastructureService, UserData,
}
export interface DatastoreInfrastructureService extends DatastoreDomain, DatastoreDomainInitializeable {
  communityDatastore: CommunityDatastoreInfrastructureService;
  memberDatastore: MemberDatastoreInfrastructureService
  roleDatastore: RoleDatastoreInfrastructureService;
  propertyDatastore: PropertyDatastoreInfrastructureService;
  serviceDatastore: ServiceDatastoreInfrastructureService;
  serviceTicketDatastore: ServiceTicketDatastoreInfrastructureService
  userDatastore: UserDatastoreInfrastructureService
}