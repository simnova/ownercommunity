import { ApplicationServices,
  CommunityBlobApi,
  MemberBlobApi,
  PropertyBlobApi,
  PropertySearchApi,
  ServiceTicketSearchApi,
  UserDataApi,
  RoleDataApi,
  ServiceDataApi,
  ServiceTicketDataApi,
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
  PropertyMapsApi,
  CommunityVercelApi,
} from "../application-services";
import { UserModel, CommunityModel, RoleModel, PropertyModel, MemberModel, ServiceModel, ServiceTicketModel } from "../external-dependencies/datastore";
import { CommunityUnitOfWork, MemberUnitOfWork, PropertyUnitOfWork, RoleUnitOfWork, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserUnitOfWork } from "../external-dependencies/domain";
import { CommunityBlobApiImpl, MemberBlobApiImpl, PropertyBlobApiImpl} from '../application-services-impl/blob-storage';
import { PropertySearchApiImpl, ServiceTicketSearchApiImpl } from '../application-services-impl/cognitive-search';
import { UserDataApiImpl, RoleDataApiImpl, ServiceDataApiImpl, ServiceTicketDataApiImpl, MemberDataApiImpl, CommunityDataApiImpl, PropertyDataApiImpl } from '../application-services-impl/datastore';
import { UserDomainApiImpl, RoleDomainApiImpl, ServiceDomainApiImpl, ServiceTicketDomainApiImpl, MemberDomainApiImpl, CommunityDomainApiImpl, PropertyDomainApiImpl } from "../application-services-impl/domain";
import { PropertyMapsApiImpl } from "../application-services-impl/maps";
import { CommunityVercelApiImpl } from "../application-services-impl/vercel";
import { AppContext } from "./app-context-builder";

export class ApplicationServicesBuilder implements ApplicationServices {
  communityBlobApi: CommunityBlobApi;
  memberBlobApi: MemberBlobApi;
  propertyBlobApi: PropertyBlobApi;
  propertySearchApi: PropertySearchApi;
  serviceTicketSearchApi: ServiceTicketSearchApi;
  userDataApi: UserDataApi;
  roleDataApi: RoleDataApi;
  serviceDataApi: ServiceDataApi;
  serviceTicketDataApi: ServiceTicketDataApi;
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
  propertyMapApi: PropertyMapsApi;
  communityVercelApi: CommunityVercelApi;
  

  constructor(context: AppContext) {
    this.communityBlobApi = new CommunityBlobApiImpl({ context });
    this.memberBlobApi = new MemberBlobApiImpl({ context });
    this.propertyBlobApi = new PropertyBlobApiImpl({ context });
    this.propertySearchApi = new PropertySearchApiImpl({ context });
    this.serviceTicketSearchApi = new ServiceTicketSearchApiImpl({ context });
    this.userDataApi = new UserDataApiImpl({ modelOrCollection: UserModel, context });
    this.roleDataApi = new RoleDataApiImpl({ modelOrCollection: RoleModel, context });
    this.serviceDataApi = new ServiceDataApiImpl({ modelOrCollection: ServiceModel, context });
    this.serviceTicketDataApi = new ServiceTicketDataApiImpl({ modelOrCollection: ServiceTicketModel, context });
    this.memberDataApi = new MemberDataApiImpl({ modelOrCollection: MemberModel, context });
    this.communityDataApi = new CommunityDataApiImpl({ modelOrCollection: CommunityModel, context });
    this.propertyDataApi = new PropertyDataApiImpl({ modelOrCollection: PropertyModel, context });
    this.userDomainApi = new UserDomainApiImpl({ unitOfWork: UserUnitOfWork, context });
    this.communityDomainApi = new CommunityDomainApiImpl({ unitOfWork: CommunityUnitOfWork, context });
    this.memberDomainApi = new MemberDomainApiImpl({ unitOfWork: MemberUnitOfWork, context });
    this.roleDomainApi = new RoleDomainApiImpl({ unitOfWork: RoleUnitOfWork, context });
    this.propertyDomainApi = new PropertyDomainApiImpl({ unitOfWork: PropertyUnitOfWork, context });
    this.serviceDomainApi = new ServiceDomainApiImpl({ unitOfWork: ServiceUnitOfWork, context });
    this.serviceTicketDomainApi = new ServiceTicketDomainApiImpl({ unitOfWork: ServiceTicketUnitOfWork, context });
    this.propertyMapApi = new PropertyMapsApiImpl({ context });
    this.communityVercelApi = new CommunityVercelApiImpl({ context });
  }
}