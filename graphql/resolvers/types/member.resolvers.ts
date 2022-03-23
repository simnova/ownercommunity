import { Resolvers, Member, Community, Role, User } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { getMemberForCurrentUser } from './helpers';

const member : Resolvers = {
  Member: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    role: async (parent, args, context, info) => {
      if(parent.role && isValidObjectId(parent.role.toString())){
        return (await context.dataSources.roleApi.findOneById(parent.role.toString())) as Role;
      }
      return parent.role;
    },
    createdBy: async (parent, args, context, info) => {
      if(parent.createdBy && isValidObjectId(parent.createdBy.toString())){
        return (await context.dataSources.userApi.findOneById(parent.createdBy.toString())) as User;
      }
      return parent.createdBy;
    }
  },
  MemberAccount: {
    user: async (parent, args, context, info) => {
      if(parent.user && isValidObjectId(parent.user.toString())){
        return (await context.dataSources.userApi.findOneById(parent.user.toString())) as User;
      }
      return parent.user; 
    }
  },
  Query: {
    membersByCommunityId: async (_, { communityId }, { dataSources }) => {
      return (await dataSources.memberApi.getMembersByCommunityId(communityId)) as Member[];
    },
    memberForCurrentUser: async (_, { communityId }, context) => {
      return getMemberForCurrentUser(context, communityId);
    }
  }
}