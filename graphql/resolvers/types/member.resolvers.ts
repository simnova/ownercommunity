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
    member: async (_parent, args, context, info) => {
      if(args.id && isValidObjectId(args.id)){
        return (await context.dataSources.memberApi.findOneById(args.id)) as Member;
      }
      return null;
    },
    members: async (_, _input, { dataSources }) => {
      return (await dataSources.memberApi.getMembers()) as Member[];
    },
    membersAssignableToTickets: async (_, _input, { dataSources }) => {
      return (await dataSources.memberApi.getMembersAssignableToTickets()) as Member[];
    },
    memberForUser: async (_parent, input, context, info) => {
      return (await context.dataSources.memberApi.getMemberByCommunityIdUserId(context.community, input.userId)) as Member;
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
    memberAccountEdit: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberAccountEdit(input));
    },
    memberAccountRemove: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberAccountRemove(input));
    },
    memberProfileUpdate: async (_, { input }, { dataSources }) => {
      return MemberMutationResolver(dataSources.memberDomainAPI.memberProfileUpdate(input));
    },
    memberProfileAvatarCreateAuthHeader: async (_, { input }, { dataSources }) => {
      var result = (await dataSources.memberBlobAPI.memberProfileAvatarCreateAuthHeader(input.memberId, input.contentType, input.contentLength));
      if(result.status.success){
        result.member = await dataSources.memberDomainAPI.memberProfileUpdateAvatar(input.memberId, result.authHeader.blobName) as any;
      }
      return result;
    },
    memberProfileAvatarRemove: async (_, { memberId }, { dataSources }) => {
      let result = { 
        status: (await dataSources.memberBlobAPI.memberProfileAvatarRemove(memberId))
      } as MemberMutationResult
  
      if(!result.status.success){
        return result;
      } else {
        return  MemberMutationResolver(dataSources.memberDomainAPI.memberProfileUpdateAvatar(memberId, null));
      }
    }
  }
}

export default member;