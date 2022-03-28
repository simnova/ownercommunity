import { Resolvers, Community, CommunityMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Community as CommunityDo } from '../../../infrastructure/data-sources/cosmos-db/models/community';


const CommunityMutationResolver = async (getCommunity:Promise<CommunityDo>): Promise<CommunityMutationResult> => {
  try {
    return {
      status : { success: true },
      community: (await getCommunity) as Community
    } as CommunityMutationResult;
  }
  catch(error){
    console.error("Community > Mutation  : ",error);
    return  {
      status : { success: false, error: JSON.stringify(error) },      
    } as CommunityMutationResult;
  }
}


const community : Resolvers = {
  Community: {
    
  },
  Query: {
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
      return CommunityMutationResolver( dataSources.communityDomainAPI.communityCreate(input));
    },
    communityUpdate: async (_, { input }, { dataSources }) => {
      return CommunityMutationResolver( dataSources.communityDomainAPI.communityUpdate(input));
    },
    communityPublicContentCreateAuthHeader: async (_, { input }, { dataSources }) => {
      return dataSources.communityBlobAPI.communityPublicContentCreateAuthHeader(input.communityId, input.contentType, input.contentLength);
    }
  }
}

export default community;