import { DatastoreDomain , DatastoreDomainInitializeable} from "../../domain/infrastructure/datastore/interfaces";
import { CommunityDatastoreInfrastructureService } from "./community";
import { MemberDatastoreInfrastructureService } from "./member";
import { PropertyDatastoreInfrastructureService } from "./property";
import { RoleDatastoreInfrastructureService } from "./role";
import { ServiceDatastoreInfrastructureService } from "./service";
import { ServiceTicketDatastoreInfrastructureService } from "./service-ticket";
import { UserDatastoreInfrastructureService } from "./user";

export {
  CommunityDatastoreInfrastructureService,
  MemberDatastoreInfrastructureService,
  PropertyDatastoreInfrastructureService,
  RoleDatastoreInfrastructureService,
  ServiceDatastoreInfrastructureService,
  ServiceTicketDatastoreInfrastructureService,
  UserDatastoreInfrastructureService,
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