import { GraphqlContext } from "../graphql-context";
import { CommunityBlobAPI, MemberBlobAPI, PropertyBlobAPI } from "./blob"
import { PropertySearchAPI, ServiceTicketsSearchAPI } from "./cognitive-search";
import { CommunityCosmosdbAPI, CommunityModel, MemberCosmosdbAPI, MemberModel, PropertyCosmosdbAPI, PropertyModel, RoleCosmosdbAPI, RoleModel, ServiceCosmosdbAPI, ServiceModel, ServiceTicketCosmosdbAPI, ServiceTicketModel, UserCosmosdbAPI, UserModel } from "./cosmos-db";
import { CommunityDomainAPI, CommunityUnitOfWork, MemberDomainAPI, MemberUnitOfWork, PropertyDomainAPI, PropertyUnitOfWork, RoleDomainAPI, RoleUnitOfWork, ServiceDomainAPI, ServiceTicketDomainAPI, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserDomainAPI, UserUnitOfWork } from "./domain";
import { PropertyMapAPI } from "./maps";
import { CommunityVercelAPI } from "./vercel";

export class DataSourceBuilder {
  communityBlobAPI: CommunityBlobAPI;
  memberBlobAPI: MemberBlobAPI;
  propertyBlobAPI: PropertyBlobAPI;
  propertySearchApi: PropertySearchAPI;
  serviceTicketsSearchApi: ServiceTicketsSearchAPI;
  userCosmosdbApi: UserCosmosdbAPI;
  roleCosmosdbApi: RoleCosmosdbAPI;
  serviceCosmosdbApi: ServiceCosmosdbAPI;
  serviceTicketCosmosdbApi: ServiceTicketCosmosdbAPI;
  memberCosmosdbApi: MemberCosmosdbAPI;
  communityCosmosdbApi: CommunityCosmosdbAPI;
  propertyCosmosdbApi: PropertyCosmosdbAPI;
  userDomainAPI: UserDomainAPI;
  communityDomainAPI: CommunityDomainAPI;
  memberDomainAPI: MemberDomainAPI;
  roleDomainAPI: RoleDomainAPI;
  propertyDomainAPI: PropertyDomainAPI;
  serviceDomainAPI: ServiceDomainAPI;
  serviceTicketDomainAPI: ServiceTicketDomainAPI;
  propertyMapApi: PropertyMapAPI;
  communityVercelApi: CommunityVercelAPI;

  constructor(context: GraphqlContext) {
    this.communityBlobAPI = new CommunityBlobAPI({ context });
    this.memberBlobAPI = new MemberBlobAPI({ context });
    this.propertyBlobAPI = new PropertyBlobAPI({ context });
    this.propertySearchApi = new PropertySearchAPI({ context });
    this.serviceTicketsSearchApi = new ServiceTicketsSearchAPI({ context });
    this.userCosmosdbApi = new UserCosmosdbAPI({ modelOrCollection: UserModel, context });
    this.roleCosmosdbApi = new RoleCosmosdbAPI({ modelOrCollection: RoleModel, context });
    this.serviceCosmosdbApi = new ServiceCosmosdbAPI({ modelOrCollection: ServiceModel, context });
    this.serviceTicketCosmosdbApi = new ServiceTicketCosmosdbAPI({ modelOrCollection: ServiceTicketModel, context });
    this.memberCosmosdbApi = new MemberCosmosdbAPI({ modelOrCollection: MemberModel, context });
    this.communityCosmosdbApi = new CommunityCosmosdbAPI({ modelOrCollection: CommunityModel, context });
    this.propertyCosmosdbApi = new PropertyCosmosdbAPI({ modelOrCollection: PropertyModel, context });
    this.userDomainAPI = new UserDomainAPI({ unitOfWork: UserUnitOfWork, context });
    this.communityDomainAPI = new CommunityDomainAPI({ unitOfWork: CommunityUnitOfWork, context });
    this.memberDomainAPI = new MemberDomainAPI({ unitOfWork: MemberUnitOfWork, context });
    this.roleDomainAPI = new RoleDomainAPI({ unitOfWork: RoleUnitOfWork, context });
    this.propertyDomainAPI = new PropertyDomainAPI({ unitOfWork: PropertyUnitOfWork, context });
    this.serviceDomainAPI = new ServiceDomainAPI({ unitOfWork: ServiceUnitOfWork, context });
    this.serviceTicketDomainAPI = new ServiceTicketDomainAPI({ unitOfWork: ServiceTicketUnitOfWork, context });
    this.propertyMapApi = new PropertyMapAPI({ context });
    this.communityVercelApi = new CommunityVercelAPI({ context });
  }

}