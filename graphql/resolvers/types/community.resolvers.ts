import { Resolvers, Community, CommunityMutationResult, Role, FileInfo } from '../../generated';
import { Community as CommunityDo } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { DataSources } from '../../data-sources';

const CommunityMutationResolver = async (
  getCommunity: Promise<CommunityDo>
): Promise<CommunityMutationResult> => {
  try {
    return {
      status: { success: true },
      community: (await getCommunity) as Community,
    } as CommunityMutationResult;
  } catch (error) {
    console.error("Community > Mutation  : ", error);
    return {
      status: { success: false, errorMessage: error.message },
    } as CommunityMutationResult;
  }
};

const community: Resolvers = {

  Community: {
    roles: async (_rootObj: Community) => {
      return (await DataSources.roleApi.getRoles()) as Role[];
    },
    files: async (rootObj: Community) => {
      return DataSources.communityBlobAPI.communityPublicFilesList(rootObj.id);
    },
    filesByType: async (rootObj: Community, { type } ) => {
      return DataSources.communityBlobAPI.communityPublicFilesListByType(rootObj.id, type);
    },
  },
  Query: {
    community: async (_, _args, { dataSources }) => {
      return (await dataSources.communityApi.getCurrentCommunity()) as Community;
    },
    communityById: async (_, { id }, { dataSources }) => {
      return (await dataSources.communityApi.getCommunityById(id)) as Community;
    },
    communityByHandle: async (_, { handle }, { dataSources }) => {
      return (await dataSources.communityApi.getCommunityByHandle(handle)) as Community;
    },
    communityByDomain: async (_, { domain }, { dataSources }) => {
      return (await dataSources.communityApi.getCommunityByDomain(domain)) as Community;
    },
    communities: async (_, _args, { dataSources }) => {
      return (await dataSources.communityApi.getCommunitiesForCurrentUser()) as Community[];
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
      var result = await dataSources.communityBlobAPI.communityPublicFileCreateAuthHeader(input.communityId, input.fileName, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await dataSources.communityApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicContentCreateAuthHeader: async (_, { input }, { dataSources }) => {
      var result = await dataSources.communityBlobAPI.communityPublicContentCreateAuthHeader(input.communityId, input.contentType, input.contentLength);
      console.log(`communityPublicContentCreateAuthHeader: ${JSON.stringify(result)}`);
      result.community = (await dataSources.communityApi.getCommunityById(input.communityId)) as Community;
      return result;
    },
    communityPublicFileRemove: async (_, { input }, { dataSources }) => {
      var result = await dataSources.communityBlobAPI.communityPublicFileRemove(input.communityId, input.fileName);
      console.log(`communityPublicFileRemove: ${JSON.stringify(result)}`);
      return CommunityMutationResolver( dataSources.communityApi.getCommunityById(input.communityId));// as Community;
      //return result;
    }
  },
};

export default community;