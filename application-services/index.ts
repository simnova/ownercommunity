import { CommunityBlobAPI, MemberBlobAPI, PropertyBlobAPI } from "./blob-storage"
import { PropertySearchAPI, ServiceTicketSearchAPI } from "./cognitive-search";
import { CommunityDataAPI, MemberDataAPI, PropertyDataAPI, RoleDataAPI, ServiceDataAPI, ServiceTicketDataAPI, UserDataAPI } from "./datastore";
import { CommunityDomainAPI, MemberDomainAPI, PropertyDomainAPI, RoleDomainAPI, ServiceDomainAPI, ServiceTicketDomainAPI, UserDomainAPI } from "./domain";
import { PropertyMapsAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export interface ApplicationServices {
  communityBlobApi: CommunityBlobAPI;
  memberBlobApi: MemberBlobAPI;
  propertyBlobApi: PropertyBlobAPI;
  propertySearchApi: PropertySearchAPI;
  serviceTicketSearchApi: ServiceTicketSearchAPI;
  userDataApi: UserDataAPI;
  roleDataApi: RoleDataAPI;
  serviceDataApi: ServiceDataAPI;
  serviceTicketDataApi: ServiceTicketDataAPI;
  memberDataApi: MemberDataAPI;
  communityDataApi: CommunityDataAPI;
  propertyDataApi: PropertyDataAPI;
  userDomainApi: UserDomainAPI;
  communityDomainApi: CommunityDomainAPI;
  memberDomainApi: MemberDomainAPI;
  roleDomainApi: RoleDomainAPI;
  propertyDomainApi: PropertyDomainAPI;
  serviceDomainApi: ServiceDomainAPI;
  serviceTicketDomainApi: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapsAPI;
  communityVercelApi: CommunityVercelAPI;
}

export {
  CommunityBlobAPI,
  MemberBlobAPI,
  PropertyBlobAPI,
  PropertySearchAPI,
  ServiceTicketSearchAPI,
  UserDataAPI,
  RoleDataAPI,
  ServiceDataAPI,
  ServiceTicketDataAPI,
  MemberDataAPI,
  CommunityDataAPI,
  PropertyDataAPI,
  UserDomainAPI,
  CommunityDomainAPI,
  MemberDomainAPI,
  RoleDomainAPI,
  PropertyDomainAPI,
  ServiceDomainAPI,
  ServiceTicketDomainAPI,
  PropertyMapsAPI,
  CommunityVercelAPI
}