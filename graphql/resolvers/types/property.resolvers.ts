import { Resolvers, Community, Member, Property } from '../../generated';
import { isValidObjectId } from 'mongoose';

const property : Resolvers = {
  Property: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, args, context, info) => {
      if(parent.owner && isValidObjectId(parent.owner.toString())){
        return (await context.dataSources.memberApi.findOneById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    }
  },
  Query: {
    propertiesByCommunityId: async (_, { communityId }, context) => {
      const user = await context.dataSources.userApi.getByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.dataSources.propertyApi.getPropertiesByCommunityId(communityId, user.id)) as Property[];
    }
  }
}