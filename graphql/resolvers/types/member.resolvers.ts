import { Resolvers, Member, Community, Role, User, MemberMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { getMemberForCurrentUser } from './helpers';
import { Member as MemberDo } from '../../../infrastructure/data-sources/cosmos-db/models/member';


const MemberMutationResolver = async (getMember:Promise<MemberDo>): Promise<MemberMutationResult> => {
  try {
    return {
      status : { success: true },
      member: (await getMember) 
    } as MemberMutationResult;
  }
  catch(error){
    console.error("Community > Mutation  : ",error);
    return  {
      status : { success: false, error: JSON.stringify(error) },
      member: null
    } as MemberMutationResult;
  }
}

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
  },
  MemberAccount: {
    user: async (parent, args, context, info) => {
      if(parent.user && isValidObjectId(parent.user.toString())){
        return (await context.dataSources.userApi.findOneById(parent.user.toString())) as User;
      }
      return parent.user; 
    },
    createdBy: async (parent, args, context, info) => {
      if(parent.createdBy && isValidObjectId(parent.createdBy.toString())){
        return (await context.dataSources.userApi.findOneById(parent.createdBy.toString())) as User;
      }
      return parent.createdBy;
    }
  },
  Query: {
    member: async (parent, args, context, info) => {
      if(args.id && isValidObjectId(args.id)){
        return (await context.dataSources.memberApi.findOneById(args.id)) as Member;
      }
      return null;
    },
    members: async (_, {  }, { dataSources }) => {
      return (await dataSources.memberApi.getMembers()) as Member[];
    },
    memberForCurrentUser: async (_, { communityId }, context) => {
      return getMemberForCurrentUser(context, communityId);
    }
  },
  Mutation: {
    memberCreate: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberCreate(input));
    },
    memberUpdate: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberUpdate(input));
    },
    memberAccountAdd: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberAccountAdd(input));
    },
    memberAccountRemove: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberAccountRemove(input));
    },
    memberProfileUpdate: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberProfileUpdate(input));
    }
  }
}

export default member;