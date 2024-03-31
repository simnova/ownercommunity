import { Resolvers, Member, Community, Role, User, MemberMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { getMemberForCurrentUser } from '../resolver-helper';
import { Member as MemberDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';

const MemberMutationResolver = async (getMember: Promise<MemberDo>): Promise<MemberMutationResult> => {
  try {
    const temp = { status: { success: true }, member: await getMember } as MemberMutationResult;
    return temp;
  } catch (error) {
    console.error('Community > Mutation  : ', error, error.stack);
    return {
      status: { success: false, errorMessage: error.message },
      member: null,
    } as MemberMutationResult;
  }
};

const member: Resolvers = {
  Member: {
    community: async (parent, _args, context) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await context.dataSources.communityCosmosdbApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    role: async (parent, _args, context) => {
      if (parent.role && isValidObjectId(parent.role.toString())) {
        return (await context.dataSources.roleCosmosdbApi.findOneById(parent.role.toString())) as Role;
      }
      return parent.role;
    },
  },
  MemberAccount: {
    user: async (parent, _args, context) => {
      if (parent.user && isValidObjectId(parent.user.toString())) {
        return (await context.dataSources.userCosmosdbApi.findOneById(parent.user.toString())) as User;
      }
      return parent.user;
    },
    createdBy: async (parent, _args, context) => {
      if (parent.createdBy && isValidObjectId(parent.createdBy.toString())) {
        return (await context.dataSources.userCosmosdbApi.findOneById(parent.createdBy.toString())) as User;
      }
      return parent.createdBy;
    },
  },
  Query: {
    member: async (_parent, {id}, context) => {
      if (id && isValidObjectId(id)) {
        return (await context.dataSources.memberCosmosdbApi.findOneById(id)) as Member;
      }
      return null;
    },
    members: async (_, _input, { dataSources }) => {
      return (await dataSources.memberCosmosdbApi.getMembers()) as Member[];
    },
    membersByCommunityId: async (_, { communityId }, { dataSources }) => {
      return (await dataSources.memberCosmosdbApi.getMembersByCommunityId(communityId)) as Member[];
    },
    membersAssignableToTickets: async (_, _input, { dataSources }) => {
      return (await dataSources.memberCosmosdbApi.getMembersAssignableToTickets()) as Member[];
    },
    memberForUser: async (_parent, input, context) => {
      return (await context.dataSources.memberCosmosdbApi.getMemberByCommunityIdUserId(context.community, input.userId)) as Member;
    },
    memberForCurrentUser: async (_, { communityId }, context) => {
      return getMemberForCurrentUser(context, communityId);
    },
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
      const result = await dataSources.memberBlobAPI.memberProfileAvatarCreateAuthHeader(input.memberId, input.fileName, input.contentType, input.contentLength);
      if (result.status.success) {
        result.member = (await dataSources.memberDomainAPI.memberProfileUpdateAvatar(input.memberId, result.authHeader.blobName)) as any;
      }
      return result;
    },
    memberProfileAvatarRemove: async (_, { memberId }, { dataSources }) => {
      const result = {
        status: await dataSources.memberBlobAPI.memberProfileAvatarRemove(memberId),
      } as MemberMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return MemberMutationResolver(dataSources.memberDomainAPI.memberProfileUpdateAvatar(memberId, null));
      }
    },
  },
};

export default member;
