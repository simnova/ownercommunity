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
        return (await context.applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    role: async (parent, _args, context) => {
      if (parent.role && isValidObjectId(parent.role.toString())) {
        return (await context.applicationServices.roleDataApi.getRoleById(parent.role.toString())) as Role;
      }
      return parent.role;
    },
    isAdmin: async (parent, _args, context) => {
      return (await context.applicationServices.memberDataApi.isAdmin(parent.id));
    },
  },
  MemberAccount: {
    user: async (parent, _args, context) => {
      if (parent.user && isValidObjectId(parent.user.toString())) {
        return (await context.applicationServices.userDataApi.getUserById(parent.user.toString())) as User;
      }
      return parent.user;
    },
    createdBy: async (parent, _args, context) => {
      if (parent.createdBy && isValidObjectId(parent.createdBy.toString())) {
        return (await context.applicationServices.userDataApi.getUserById(parent.createdBy.toString())) as User;
      }
      return parent.createdBy;
    },
  },
  Query: {
    member: async (_parent, {id}, context) => {
      if (id && isValidObjectId(id)) {
        return (await context.applicationServices.memberDataApi.getMemberById(id)) as Member;
      }
      return null;
    },
    members: async (_, _input, { applicationServices }) => {
      return (await applicationServices.memberDataApi.getMembers()) as Member[];
    },
    membersByCommunityId: async (_, { communityId }, { applicationServices }) => {
      return (await applicationServices.memberDataApi.getMembersByCommunityId(communityId)) as Member[];
    },
    membersByUserExternalId: async (_, { userExternalId }, { applicationServices }) => {
      return (await applicationServices.memberDataApi.getMembersByUserExternalId(userExternalId)) as Member[];
    },
    membersAssignableToTickets: async (_, _input, { applicationServices }) => {
      return (await applicationServices.memberDataApi.getMembersAssignableToTickets()) as Member[];
    },
    memberForCurrentUser: async (_, _input, context) => {
      return getMemberForCurrentUser(context);
    },
  },
  Mutation: {
    memberCreate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberCreate(input));
    },
    memberUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberUpdate(input));
    },
    memberAccountAdd: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountAdd(input));
    },
    memberAccountEdit: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountEdit(input));
    },
    memberAccountRemove: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountRemove(input));
    },
    memberProfileUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberProfileUpdate(input));
    },
    memberProfileAvatarCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      const result = await applicationServices.memberBlobApi.memberProfileAvatarCreateAuthHeader(input.memberId, input.fileName, input.contentType, input.contentLength);
      if (result.status.success) {
        result.member = (await applicationServices.memberDomainApi.memberProfileUpdateAvatar(input.memberId, result.authHeader.blobName)) as any;
      }
      return result;
    },
    memberProfileAvatarRemove: async (_, { memberId }, { applicationServices }) => {
      const result = {
        status: await applicationServices.memberBlobApi.memberProfileAvatarRemove(memberId),
      } as MemberMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return MemberMutationResolver(applicationServices.memberDomainApi.memberProfileUpdateAvatar(memberId, null));
      }
    },
  },
};

export default member;
