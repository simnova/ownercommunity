import { Resolvers, Community } from '../../generated';
import { isValidObjectId } from 'mongoose';

const role : Resolvers = {
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
  }
}