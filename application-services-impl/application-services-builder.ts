import { Context } from "../context";
import { CommunityBlobAPI, MemberBlobAPI, PropertyBlobAPI } from "./blob-storage"
import { PropertySearchAPI, ServiceTicketSearchAPI } from "./cognitive-search";
import { CommunityDataAPI, CommunityModel, MemberDataAPI, MemberModel, PropertyDataAPI, PropertyModel, RoleDataAPI, RoleModel, ServiceDataAPI, ServiceModel, ServiceTicketDataAPI, ServiceTicketModel, UserDataAPI, UserModel } from "./datastore";
import { CommunityDomainAPI, CommunityUnitOfWork, MemberDomainAPI, MemberUnitOfWork, PropertyDomainAPI, PropertyUnitOfWork, RoleDomainAPI, RoleUnitOfWork, ServiceDomainAPI, ServiceTicketDomainAPI, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserDomainAPI, UserUnitOfWork } from "./domain";
import { PropertyMapAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export class DataSourceBuilder {
  communityBlobApi: CommunityBlobAPI;
  memberBlobApi: MemberBlobAPI;
  propertyBlobApi: PropertyBlobAPI;
  propertySearchApi: PropertySearchAPI;
  serviceTicketSearchApi: ServiceTicketSearchAPI;
  userCosmosdbApi: UserDataAPI;
  roleCosmosdbApi: RoleDataAPI;
  serviceCosmosdbApi: ServiceDataAPI;
  serviceTicketCosmosdbApi: ServiceTicketDataAPI;
  memberCosmosdbApi: MemberDataAPI;
  communityCosmosdbApi: CommunityDataAPI;
  propertyCosmosdbApi: PropertyDataAPI;
  userDomainApi: UserDomainAPI;
  communityDomainApi: CommunityDomainAPI;
  memberDomainApi: MemberDomainAPI;
  roleDomainApi: RoleDomainAPI;
  propertyDomainApi: PropertyDomainAPI;
  serviceDomainApi: ServiceDomainAPI;
  serviceTicketDomainApi: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapAPI;
  communityVercelApi: CommunityVercelAPI;

  constructor(context: Context) {
    this.communityBlobApi = new CommunityBlobAPI({ context });
    this.memberBlobApi = new MemberBlobAPI({ context });
    this.propertyBlobApi = new PropertyBlobAPI({ context });
    this.propertySearchApi = new PropertySearchAPI({ context });
    this.serviceTicketSearchApi = new ServiceTicketsSearchAPI({ context });
    this.userCosmosdbApi = new UserDataAPI({ modelOrCollection: UserModel, context });
    this.roleCosmosdbApi = new RoleDataAPI({ modelOrCollection: RoleModel, context });
    this.serviceCosmosdbApi = new ServiceDataAPI({ modelOrCollection: ServiceModel, context });
    this.serviceTicketCosmosdbApi = new ServiceTicketDataAPI({ modelOrCollection: ServiceTicketModel, context });
    this.memberCosmosdbApi = new MemberDataAPI({ modelOrCollection: MemberModel, context });
    this.communityCosmosdbApi = new CommunityDataAPI({ modelOrCollection: CommunityModel, context });
    this.propertyCosmosdbApi = new PropertyDataAPI({ modelOrCollection: PropertyModel, context });
    this.userDomainApi = new UserDomainAPI({ unitOfWork: UserUnitOfWork, context });
    this.communityDomainApi = new CommunityDomainAPI({ unitOfWork: CommunityUnitOfWork, context });
    this.memberDomainApi = new MemberDomainAPI({ unitOfWork: MemberUnitOfWork, context });
    this.roleDomainApi = new RoleDomainAPI({ unitOfWork: RoleUnitOfWork, context });
    this.propertyDomainApi = new PropertyDomainAPI({ unitOfWork: PropertyUnitOfWork, context });
    this.serviceDomainApi = new ServiceDomainAPI({ unitOfWork: ServiceUnitOfWork, context });
    this.serviceTicketDomainApi = new ServiceTicketDomainAPI({ unitOfWork: ServiceTicketUnitOfWork, context });
    this.propertyMapApi = new PropertyMapAPI({ context });
    this.communityVercelApi = new CommunityVercelAPI({ context });
  }

}