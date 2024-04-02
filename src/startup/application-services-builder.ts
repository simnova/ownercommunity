import { ApplicationServices } from "../app/application-services";
import { AppContext } from "../app/app-context";
import {
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
} from "../app/application-services";

import { 
  CommunityBlobApiImpl,
  MemberBlobApiImpl,
  PropertyBlobApiImpl,
  PropertySearchApiImpl,
  ServiceTicketSearchApiImpl,
  UserDataApiImpl,
  RoleDataApiImpl,
  ServiceDataApiImpl,
  ServiceTicketDataApiImpl,
  MemberDataApiImpl,
  CommunityDataApiImpl,
  PropertyDataApiImpl,
  UserDomainApiImpl,
  CommunityDomainApiImpl,
  MemberDomainApiImpl,
  RoleDomainApiImpl,
  PropertyDomainApiImpl,
  ServiceDomainApiImpl,
  ServiceTicketDomainApiImpl,
  PropertyMapsApiImpl,
  CommunityVercelApiImpl,
 } from "../application-services-impl";
import { MongoUserUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/user.uow";
import { MongoCommunityUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/community.mongo-uow";
import { MongoMemberUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/member.mongo-uow";
import { MongoRoleUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/role.mongo-uow";
import { MongoPropertyUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/property.mongo-uow";
import { MongoServiceUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/service.uow";
import { MongoServiceTicketUnitOfWork } from "../infrastructure-services-impl/datastore/mongodb/infrastructure/service-ticket.uow";

export class ApplicationServicesBuilder implements ApplicationServices{
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

  constructor(context: AppContext) {
    this.communityBlobApi = new CommunityBlobApiImpl({ context });
    this.memberBlobApi = new MemberBlobApiImpl({ context });
    this.propertyBlobApi = new PropertyBlobApiImpl({ context });
    this.propertySearchApi = new PropertySearchApiImpl({ context });
    this.serviceTicketSearchApi = new ServiceTicketSearchApiImpl({ context });
    this.userDataApi = new UserDataApiImpl({ context });
    this.roleDataApi = new RoleDataApiImpl({ context });
    this.serviceDataApi = new ServiceDataApiImpl({ context });
    this.serviceTicketDataApi = new ServiceTicketDataApiImpl({ context });
    this.memberDataApi = new MemberDataApiImpl({ context });
    this.communityDataApi = new CommunityDataApiImpl({ context });
    this.propertyDataApi = new PropertyDataApiImpl({ context });
    this.userDomainApi = new UserDomainApiImpl({unitOfWork: MongoUserUnitOfWork, context });
    this.communityDomainApi = new CommunityDomainApiImpl({ unitOfWork: MongoCommunityUnitOfWork, context });
    this.memberDomainApi = new MemberDomainApiImpl({ unitOfWork: MongoMemberUnitOfWork,context });
    this.roleDomainApi = new RoleDomainApiImpl({ unitOfWork: MongoRoleUnitOfWork,context });
    this.propertyDomainApi = new PropertyDomainApiImpl({ unitOfWork: MongoPropertyUnitOfWork,context });
    this.serviceDomainApi = new ServiceDomainApiImpl({ unitOfWork: MongoServiceUnitOfWork,context });
    this.serviceTicketDomainApi = new ServiceTicketDomainApiImpl({ unitOfWork: MongoServiceTicketUnitOfWork,context });
    this.propertyMapApi = new PropertyMapsApiImpl({ context });
    this.communityVercelApi = new CommunityVercelApiImpl({ context });
  }

}