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
    roles: async (_rootObj: Community, _, { dataSources }) => {
      return (await dataSources.roleCosmosdbApi.getRoles()) as Role[];
    },
    files: async (rootObj: Community, _, { dataSources }) => {
      return dataSources.communityBlobAPI.communityPublicFilesList(rootObj.id);
    },
    filesByType: async (rootObj: Community, { type }, { dataSources }) => {
      return dataSources.communityBlobAPI.communityPublicFilesListByType(rootObj.id, type);
    },
    domainStatus: async (rootObj: Community, _, { dataSources }) => {
      return dataSources.communityVercelApi.getDomainDetails(rootObj.domain);
    },
    userIsAdmin: async (rootObj: Community, _args, { dataSources }) => {
      return dataSources.communityCosmosdbApi.userIsAdmin(rootObj.id);
    },
  },
  Query: {
    community: async (_, _args, { dataSources }) => {
      return (await dataSources.communityCosmosdbApi.getCurrentCommunity()) as Community;
    },
    communityById: async (_, { id }, { dataSources }) => {
      return (await dataSources.communityCosmosdbApi.getCommunityById(id)) as Community;
    },
    communityByHandle: async (_, { handle }, { dataSources }) => {
      return (await dataSources.communityCosmosdbApi.getCommunityByHandle(handle)) as Community;
    },
    communityByDomain: async (_, { domain }, { dataSources }) => {
      return (await dataSources.communityCosmosdbApi.getCommunityByDomain(domain)) as Community;
    },
    communities: async (_, _args, { dataSources }) => {
      return (await dataSources.communityCosmosdbApi.getCommunitiesForCurrentUser()) as Community[];
    },
  },
  Mutation: {
    communityCreate: async (_, { input }, { dataSources }) => {
      return CommunityMutationResolver(dataSources.communityDomainAPI.communityCreate(input));
    },
    communityUpdate: async (_, { input }, { dataSources }) => {
      return CommunityMutationResolver(dataSources.communityDomainAPI.communityUpdate(input));
    },
    communityPublicFileCreateAuthHeader: async (_, { input }, { dataSources }) => {
      let result = await dataSources.communityBlobAPI.communityPublicFileCreateAuthHeader(input.communityId, input.fileName, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await dataSources.communityCosmosdbApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicContentCreateAuthHeader: async (_, { input }, { dataSources }) => {
      let result = await dataSources.communityBlobAPI.communityPublicContentCreateAuthHeader(input.communityId, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await dataSources.communityCosmosdbApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicFileRemove: async (_, { input }, { dataSources }) => {
      let result = await dataSources.communityBlobAPI.communityPublicFileRemove(input.communityId, input.fileName);
      console.log(`communityPublicFileRemove: ${JSON.stringify(result)}`);
      return CommunityMutationResolver(dataSources.communityCosmosdbApi.getCommunityById(input.communityId)); // as Community;
      //return result;
    },
  },
};

export default community;
