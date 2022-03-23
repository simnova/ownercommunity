import { Resolvers, Role, Community } from '../../generated';
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
    rolesByCommunityId: async (_, { communityId }, { dataSources }) => {
      return (await dataSources.roleApi.getRolesByCommunityId(communityId)) as Role[];
    }
  }
}