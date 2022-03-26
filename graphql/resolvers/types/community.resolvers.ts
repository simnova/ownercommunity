import { Resolvers, Community, CommunityMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Community as CommunityDo } from '../../../infrastructure/data-sources/cosmos-db/models/community';

const CommunityMutationResolver = async (getCommunity:Promise<CommunityDo>): Promise<CommunityMutationResult> => {
  try {
    return {
      status : { success: true },
      community: (await getCommunity) 
    } as CommunityMutationResult;
  }
  catch(error){
    console.error("Community > Mutation  : ",error);
    return  {
      status : { success: false, error: JSON.stringify(error) },
      community: null
    } as CommunityMutationResult;
  }
}

const community : Resolvers = {
  Role: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
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
    }
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