import { Resolvers, Community, CommunityMutationResult, Role } from '../builder/generated';
import { Community as CommunityDo } from '../../../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { OpenIdConfigKeyEnum } from '../../../../../../seedwork/auth-seedwork-oidc/portal-token-validation';
import { applyPermission, applyPermissionFilter } from '../resolver-helper';

const CommunityMutationResolver = async (getCommunity: Promise<CommunityDo>): Promise<CommunityMutationResult> => {
  try {
    return {
      status: { success: true },
      community: (await getCommunity) as Community,
    } as CommunityMutationResult;
  } catch (error) {
    console.error('Community > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
    } as CommunityMutationResult;
  }
};

const community: Resolvers = {
  Community: {
    roles: async (_rootObj: Community, _, { applicationServices }) => {
      return (await applicationServices.roles.endUserRole.dataApi.getRoles()) as Role[];
    },
    files: async (rootObj: Community, _, { applicationServices }) => {
      return applicationServices.community.blobApi.communityPublicFilesList(rootObj.id);
    },
    filesByType: async (rootObj: Community, { type }, { applicationServices }) => {
      return applicationServices.community.blobApi.communityPublicFilesListByType(rootObj.id, type);
    },
    domainStatus: async (rootObj: Community, _, { applicationServices }) => {
      return applicationServices.community.vercelApi.getDomainDetails(rootObj.domain);
    },
    userIsAdmin: async (rootObj: Community, _args, { applicationServices }) => {
      return applicationServices.community.dataApi.userIsAdmin(rootObj.id);
    },
  },
  Query: {
    community: async (_, _args, { applicationServices, passport, member }) => {
      const communityToReturn = await applicationServices.community.dataApi.getCurrentCommunity() as Community;
      return applyPermission<Community>(communityToReturn, (community) => {
        return passport.datastoreVisa.forCommunity(community as CommunityDo).determineIf((_permissions) => member.community.id === community.id)
      });
    },
    communityById: async (_, { id }, { applicationServices, passport, member }) => {
      const communityToReturn = await applicationServices.community.dataApi.getCommunityById(id) as Community;
      return applyPermission<Community>(communityToReturn, (community) => {
        return passport.datastoreVisa.forCommunity(community as CommunityDo).determineIf((permissions) => 
          permissions.canManageAllCommunities ||
          member.community.id === community.id
        )
      });
    },
    communityByHandle: async (_, { handle }, { applicationServices }) => {
      return (await applicationServices.community.dataApi.getCommunityByHandle(handle)) as Community;
    },
    communityByDomain: async (_, { domain }, { applicationServices }) => {
      return (await applicationServices.community.dataApi.getCommunityByDomain(domain)) as Community;
    },
    communities: async (_, _args, { applicationServices, verifiedUser, passport }) => {
      if (verifiedUser.openIdConfigKey === OpenIdConfigKeyEnum.STAFF_PORTAL) {
        const communitiesToReturn = await applicationServices.community.dataApi.getAllCommunities() as Community[];
        return applyPermissionFilter<Community>(communitiesToReturn, (community) => {
          return passport.datastoreVisa.forCommunity(community as CommunityDo)
            .determineIf((permissions) => permissions.canManageAllCommunities)
        });
      }
      return (await applicationServices.community.dataApi.getCommunitiesForCurrentUser()) as Community[];
    },
  },
  Mutation: {
    communityCreate: async (_, { input }, { applicationServices }) => {
      return CommunityMutationResolver(applicationServices.community.domainApi.communityCreate(input));
    },
    communityUpdate: async (_, { input }, { applicationServices }) => {
      return CommunityMutationResolver(applicationServices.community.domainApi.communityUpdate(input));
    },
    communityPublicFileCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.community.blobApi.communityPublicFileCreateAuthHeader(input.communityId, input.fileName, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await applicationServices.community.dataApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicContentCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.community.blobApi.communityPublicContentCreateAuthHeader(input.communityId, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await applicationServices.community.dataApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicFileRemove: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.community.blobApi.communityPublicFileRemove(input.communityId, input.fileName);
      console.log(`communityPublicFileRemove: ${JSON.stringify(result)}`);
      return CommunityMutationResolver(applicationServices.community.dataApi.getCommunityById(input.communityId)); // as Community;
      //return result;
    },
  },
};

export default community;
