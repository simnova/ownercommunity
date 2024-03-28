import { CommunityBlobStorageAPI, MemberBlobStorageAPI, PropertyBlobStorageAPI } from "./blob-storage"
import { PropertySearchAPI, ServiceTicketSearchAPI } from "./cognitive-search";
import { CommunityDataAPI, MemberDataAPI, PropertyDataAPI, RoleDataAPI, ServiceDataAPI, ServiceTicketDataAPI, UserDataAPI } from "./datastore";
import { CommunityDomainAPI, MemberDomainAPI, PropertyDomainAPI, RoleDomainAPI, ServiceDomainAPI, ServiceTicketDomainAPI, UserDomainAPI } from "./domain";
import { PropertyMapsAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export interface ApplicationServices {
  communityBlobApi: CommunityBlobStorageAPI;
  memberBlobApi: MemberBlobStorageAPI;
  propertyBlobApi: PropertyBlobStorageAPI;
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