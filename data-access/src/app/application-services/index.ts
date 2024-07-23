import { MemberBlobApi, PropertyBlobApi } from "./blob-storage"
import { PropertySearchApi, ServiceTicketSearchApi } from "./cognitive-search";
import { CommunityApiV1 } from "./community/v1";
import { MemberDataApi, PropertyDataApi, RoleDataApi, ServiceDataApi, ServiceTicketDataApi, UserDataApi, ViolationTicketDataApi } from "./datastore";
import { MemberDomainApi, PropertyDomainApi, RoleDomainApi, ServiceDomainApi, ServiceTicketDomainApi, UserDomainApi, ViolationTicketDomainApi } from "./domain";
import { PropertyMapsApi } from "./maps";
import { PaymentApi } from "./payment";

export interface ApplicationServices {
  community: {
    v1: CommunityApiV1
  },
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
  propertyDataApi: PropertyDataApi;
  userDomainApi: UserDomainApi;
  memberDomainApi: MemberDomainApi;
  roleDomainApi: RoleDomainApi;
  propertyDomainApi: PropertyDomainApi;
  serviceDomainApi: ServiceDomainApi;
  serviceTicketDomainApi: ServiceTicketDomainApi;
  violationTicketDomainApi: ViolationTicketDomainApi;
  propertyMapApi: PropertyMapsApi;
  paymentApi: PaymentApi; 
}

export {
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
  PropertyDataApi,
  UserDomainApi,
  MemberDomainApi,
  RoleDomainApi,
  PropertyDomainApi,
  ServiceDomainApi,
  ServiceTicketDomainApi,
  ViolationTicketDomainApi,
  PropertyMapsApi,
  PaymentApi
}