import { Passport } from '../domain/contexts/iam/passport';
import * as util from './init/extensions/util';
import { HttpRequest } from '@azure/functions';
import { ApolloServerRequestHandler } from './init/apollo';
import { decorateContext } from './init/extensions/passport-context';
import { Services } from '../infrastructure/services';
import { CommunityBlobAPI, MemberBlobAPI, PropertyBlobAPI } from './data-sources/blob';
import { PropertySearchAPI, ServiceTicketsSearchAPI } from './data-sources/cognitive-search';
import { CommunityCosmosdbAPI, CommunityModel, MemberCosmosdbAPI, MemberModel, PropertyCosmosdbAPI, PropertyModel, RoleCosmosdbAPI, RoleModel, ServiceCosmosdbAPI, ServiceModel, ServiceTicketCosmosdbAPI, ServiceTicketModel, UserCosmosdbAPI, UserModel } from './data-sources/cosmos-db';
import { CommunityDomainAPI, CommunityUnitOfWork, MemberDomainAPI, MemberUnitOfWork, PropertyDomainAPI, PropertyUnitOfWork, RoleDomainAPI, RoleUnitOfWork, ServiceDomainAPI, ServiceTicketDomainAPI, ServiceTicketUnitOfWork, ServiceUnitOfWork, UserDomainAPI, UserUnitOfWork } from './data-sources/domain';
import { PropertyMapAPI } from './data-sources/maps';
import { CommunityVercelAPI } from './data-sources/vercel';

export class Context {
  public verifiedUser: {
    verifiedJWT: any;
    openIdConfigKey: string;
  };
  public community: string;
  public passport: Passport;
  public dataSources: any;
  public executionContext: any;
  public services: Services;

  public async init(req: HttpRequest, serverRequestHandler: ApolloServerRequestHandler) {
    let bearerToken = util.ExtractBearerToken(req);
    console.log('[BearerToken]: ', bearerToken);

    this.services = new Services();

    this.dataSources = {
      communityBlobAPI: new CommunityBlobAPI({ context: this }),
      memberBlobAPI: new MemberBlobAPI({ context: this }),
      propertyBlobAPI: new PropertyBlobAPI({ context: this }),
      propertySearchApi: new PropertySearchAPI({ context: this }),
      serviceTicketsSearchApi: new ServiceTicketsSearchAPI({ context: this }),
      userCosmosdbApi: new UserCosmosdbAPI({ collection: UserModel, context: this }),
      roleCosmosdbApi: new RoleCosmosdbAPI({ collection: RoleModel, context: this }),
      serviceCosmosdbApi: new ServiceCosmosdbAPI({ collection: ServiceModel, context: this }),
      serviceTicketCosmosdbApi: new ServiceTicketCosmosdbAPI({ collection: ServiceTicketModel, context: this }),
      memberCosmosdbApi: new MemberCosmosdbAPI({ collection: MemberModel, context: this }),
      communityCosmosdbApi: new CommunityCosmosdbAPI({ collection: CommunityModel, context: this }),
      propertyCosmosdbApi: new PropertyCosmosdbAPI({ collection: PropertyModel, context: this }),
      userDomainAPI: new UserDomainAPI({ unitOfWork: UserUnitOfWork, context: this }),
      communityDomainAPI: new CommunityDomainAPI({ unitOfWork: CommunityUnitOfWork, context: this }),
      memberDomainAPI: new MemberDomainAPI({ unitOfWork: MemberUnitOfWork, context: this }),
      roleDomainAPI: new RoleDomainAPI({ unitOfWork: RoleUnitOfWork, context: this }),
      propertyDomainAPI: new PropertyDomainAPI({ unitOfWork: PropertyUnitOfWork, context: this }),
      serviceDomainAPI: new ServiceDomainAPI({ unitOfWork: ServiceUnitOfWork, context: this }),
      serviceTicketDomainAPI: new ServiceTicketDomainAPI({ unitOfWork: ServiceTicketUnitOfWork, context: this }),
      propertyMapApi: new PropertyMapAPI({ context: this }),
      communityVercelApi: new CommunityVercelAPI({ context: this }),
    };

    if (bearerToken) {
      let verifiedUser = await serverRequestHandler.getPortalTokenExtractor().GetVerifiedUser(bearerToken);
      console.log('Decorating context with verified user:', JSON.stringify(verifiedUser));
      if (verifiedUser) {
        this.verifiedUser = verifiedUser;
        console.log('context value is now:', this);
      }
    }

    await decorateContext(this, req);

    req.headers['x-ms-privatelink-id'] = ''; // https://github.com/Azure/azure-functions-host/issues/6013
    req.headers['server'] = null; //hide microsoft server header
  }
}
