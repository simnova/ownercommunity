import { Resolvers, Community, CommunityMutationResult, Role } from '../builder/generated';
import { Community as CommunityDo } from '../../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { applyPermission, applyPermissionFilter, checkAccountPortalAccess, checkAnyAccess, checkStaffPortalAccess, checkSystemAccess } from '../resolver-helper';

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

const checkPermission = (passport, community, permissionCheck) => {  
  return passport.datastoreVisa.forCommunity(community as CommunityDo).determineIf(permissionCheck);  
};  

const community: Resolvers = {
  Community: {
    roles: async (rootObj: Community, _, { applicationServices, verifiedUser }) => {
      if (checkStaffPortalAccess(verifiedUser)) {
        return (await applicationServices.roles.endUserRole.dataApi.getRolesByCommunityId(rootObj.id.toString())) as Role[];
      } else if (checkAccountPortalAccess(verifiedUser) || checkSystemAccess(verifiedUser)) {
        return (await applicationServices.roles.endUserRole.dataApi.getRoles()) as Role[];
      }
      return [];
    },
    files: async (rootObj: Community, _, { applicationServices, passport }) => {
      if (checkPermission(passport, rootObj, (permissions) => permissions.canManageAllCommunities || permissions.canManageSiteContent)) {
        return applicationServices.community.blobApi.communityPublicFilesList(rootObj.id);
      }
      return [];
    },
    filesByType: async (rootObj: Community, { type }, { applicationServices, passport }) => {
      if (checkPermission(passport, rootObj, (permissions) => permissions.canManageAllCommunities || permissions.canManageSiteContent)) {
        return applicationServices.community.blobApi.communityPublicFilesListByType(rootObj.id, type);
      }
      return [];
    },
    domainStatus: async (rootObj: Community, _, { applicationServices, passport, member }) => {
      if (checkPermission(passport, rootObj, (permissions) => permissions.canManageAllCommunities || (permissions.canManageSiteContent && rootObj.id.toString() === member.community.toString()))) {
        return applicationServices.community.vercelApi.getDomainDetails(rootObj.domain);
      }
      return null;
    },
    userIsAdmin: async (rootObj: Community, _args, { applicationServices, verifiedUser }) => {
      if (checkAccountPortalAccess(verifiedUser)) {
        return applicationServices.community.dataApi.userIsAdmin(rootObj.id);
      }
      return null;
    },
  },
  Query: {
    community: async (_, _args, { applicationServices, verifiedUser, passport, member }) => {
      if (checkAccountPortalAccess(verifiedUser)) {
        const communityToReturn = await applicationServices.community.dataApi.getCurrentCommunity() as Community;
        return applyPermission<Community>(communityToReturn, (community) => {
          return checkPermission(passport, community, (_permissions) => member.community.id === community.id)
        });
      }
      return null;
    },
    communityById: async (_, { id }, { applicationServices, passport, member }) => {
      const communityToReturn = await applicationServices.community.dataApi.getCommunityById(id) as Community;
      return applyPermission<Community>(communityToReturn, (community) => {
        return checkPermission(passport, community, (permissions) => 
          permissions.canManageAllCommunities ||
          member?.community.toString() === community.id
        )
      });
    },
    communityByHandle: async (_, { handle }, { applicationServices, verifiedUser }) => {
      if (checkAnyAccess(verifiedUser)) {
        return (await applicationServices.community.dataApi.getCommunityByHandle(handle)) as Community;
      }
      return null;
    },
    communityByDomain: async (_, { domain }, { applicationServices, verifiedUser }) => {
      if (checkAnyAccess(verifiedUser)) {
        return (await applicationServices.community.dataApi.getCommunityByDomain(domain)) as Community;
      }
      return null;
    },
    communities: async (_, _args, { applicationServices, verifiedUser, passport }) => {
      if (checkStaffPortalAccess(verifiedUser)) {
        const communitiesToReturn = await applicationServices.community.dataApi.getAllCommunities() as Community[];
        return applyPermissionFilter<Community>(communitiesToReturn, (community) => {
          return passport.datastoreVisa.forCommunity(community as CommunityDo)
            .determineIf((permissions) => permissions.canManageAllCommunities)
        });
      } else if (checkAccountPortalAccess(verifiedUser)) {
        return (await applicationServices.community.dataApi.getCommunitiesForCurrentUser()) as Community[];
      }
      return null;
    },
  },
  Mutation: {
    communityCreate: async (_, { input }, { applicationServices, verifiedUser }) => {
      if (checkAccountPortalAccess(verifiedUser)) {
        return CommunityMutationResolver(applicationServices.community.domainApi.communityCreate(input));
      }
      return { status: { success: false, errorMessage: 'User does not have permission to create community.' } } as CommunityMutationResult;
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
