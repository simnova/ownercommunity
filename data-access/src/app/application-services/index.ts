import { CommunityBlobApi, MemberBlobApi, PropertyBlobApi } from "./blob-storage"
import { PropertySearchApi, ServiceTicketSearchApi } from "./cognitive-search";
import { CommunityDataApi, MemberDataApi, PropertyDataApi, RoleDataApi, ServiceDataApi, ServiceTicketDataApi, UserDataApi, ViolationTicketDataApi } from "./datastore";
import { CommunityDomainApi, MemberDomainApi, PropertyDomainApi, RoleDomainApi, ServiceDomainApi, ServiceTicketDomainApi, UserDomainApi, ViolationTicketDomainApi } from "./domain";
import { PropertyMapsApi } from "./maps";
import { PaymentApi } from "./payment";
import { CommunityVercelApi } from "./vercel";

export interface ApplicationServices {
  communityBlobApi: CommunityBlobApi;
  memberBlobApi: MemberBlobApi;
  propertyBlobApi: PropertyBlobApi;
  propertySearchApi: PropertySearchApi;
  serviceTicketSearchApi: ServiceTicketSearchApi;
  userDataApi: UserDataApi;
  roleDataApi: RoleDataApi;
  serviceDataApi: ServiceDataApi;
  serviceTicketDataApi: ServiceTicketDataApi;
  violationTicketDataApi: ViolationTicketDataApi;
  memberDataApi: MemberDataApi;
  communityDataApi: CommunityDataApi;
  propertyDataApi: PropertyDataApi;
  userDomainApi: UserDomainApi;
  communityDomainApi: CommunityDomainApi;
  memberDomainApi: MemberDomainApi;
  roleDomainApi: RoleDomainApi;
  propertyDomainApi: PropertyDomainApi;
  serviceDomainApi: ServiceDomainApi;
  serviceTicketDomainApi: ServiceTicketDomainApi;
  violationTicketDomainApi: ViolationTicketDomainApi;
  propertyMapApi: PropertyMapsApi;
  communityVercelApi: CommunityVercelApi;
  paymentApi: PaymentApi; 
}

export {
  CommunityBlobApi,
  MemberBlobApi,
  PropertyBlobApi,
  PropertySearchApi,
  ServiceTicketSearchApi,
  UserDataApi,
  RoleDataApi,
  ServiceDataApi,
  ServiceTicketDataApi,
  ViolationTicketDataApi,
  MemberDataApi,
  CommunityDataApi,
  PropertyDataApi,
  UserDomainApi,
  CommunityDomainApi,
  MemberDomainApi,
  RoleDomainApi,
  PropertyDomainApi,
  ServiceDomainApi,
  ServiceTicketDomainApi,
  ViolationTicketDomainApi,
  PropertyMapsApi,
  CommunityVercelApi,
  PaymentApi
}