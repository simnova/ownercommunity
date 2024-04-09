import { Resolvers, Community, CommunityMutationResult, Role } from '../builder/generated';
import { Community as CommunityDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/community';

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
      return (await applicationServices.roleDataApi.getRoles()) as Role[];
    },
    files: async (rootObj: Community, _, { applicationServices }) => {
      return applicationServices.communityBlobApi.communityPublicFilesList(rootObj.id);
    },
    filesByType: async (rootObj: Community, { type }, { applicationServices }) => {
      return applicationServices.communityBlobApi.communityPublicFilesListByType(rootObj.id, type);
    },
    domainStatus: async (rootObj: Community, _, { applicationServices }) => {
      return applicationServices.communityVercelApi.getDomainDetails(rootObj.domain);
    },
    userIsAdmin: async (rootObj: Community, _args, { applicationServices }) => {
      return applicationServices.communityDataApi.userIsAdmin(rootObj.id);
    },
  },
  Query: {
    community: async (_, _args, { applicationServices }) => {
      return (await applicationServices.communityDataApi.getCurrentCommunity()) as Community;
    },
    communityById: async (_, { id }, { applicationServices }) => {
      return (await applicationServices.communityDataApi.getCommunityById(id)) as Community;
    },
    communityByHandle: async (_, { handle }, { applicationServices }) => {
      return (await applicationServices.communityDataApi.getCommunityByHandle(handle)) as Community;
    },
    communityByDomain: async (_, { domain }, { applicationServices }) => {
      return (await applicationServices.communityDataApi.getCommunityByDomain(domain)) as Community;
    },
    communities: async (_, _args, { applicationServices }) => {
      return (await applicationServices.communityDataApi.getCommunitiesForCurrentUser()) as Community[];
    },
  },
  Mutation: {
    communityCreate: async (_, { input }, { applicationServices }) => {
      return CommunityMutationResolver(applicationServices.communityDomainApi.communityCreate(input));
    },
    communityUpdate: async (_, { input }, { applicationServices }) => {
      return CommunityMutationResolver(applicationServices.communityDomainApi.communityUpdate(input));
    },
    communityPublicFileCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.communityBlobApi.communityPublicFileCreateAuthHeader(input.communityId, input.fileName, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await applicationServices.communityDataApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicContentCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.communityBlobApi.communityPublicContentCreateAuthHeader(input.communityId, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await applicationServices.communityDataApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicFileRemove: async (_, { input }, { applicationServices }) => {
      let result = await applicationServices.communityBlobApi.communityPublicFileRemove(input.communityId, input.fileName);
      console.log(`communityPublicFileRemove: ${JSON.stringify(result)}`);
      return CommunityMutationResolver(applicationServices.communityDataApi.getCommunityById(input.communityId)); // as Community;
      //return result;
    },
  },
};

export default community;
