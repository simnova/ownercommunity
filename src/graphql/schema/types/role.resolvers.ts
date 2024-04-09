import { Resolvers, Role, Community, RoleMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { Role as RoleDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/role';

const RoleMutationResolver = async (getRole: Promise<RoleDo>): Promise<RoleMutationResult> => {
  try {
    return {
      status: { success: true },
      role: await getRole,
    } as RoleMutationResult;
  } catch (error) {
    console.error('Role > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      role: null,
    } as RoleMutationResult;
  }
};

const role: Resolvers = {
  Role: {
    community: async (parent, _args, context, _info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await context.applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
  },
  Query: {
    role: async (_, { id }, { applicationServices }) => {
      return (await applicationServices.roleDataApi.getRoleById(id)) as Role;
    },
    roles: async (_, _args, { applicationServices }) => {
      return (await applicationServices.roleDataApi.getRoles()) as Role[];
    },
    rolesByCommunityId: async (_, { communityId }, { applicationServices }) => {
      return (await applicationServices.roleDataApi.getRolesByCommunityId(communityId)) as Role[];
    },
  },
  Mutation: {
    roleAdd(_parent, { input }, { applicationServices }) {
      return RoleMutationResolver(applicationServices.roleDomainApi.roleAdd(input));
    },
    roleUpdate(_parent, { input }, { applicationServices }) {
      return RoleMutationResolver(applicationServices.roleDomainApi.roleUpdate(input));
    },
    roleDeleteAndReassign(_parent, { input }, { applicationServices }) {
      return RoleMutationResolver(applicationServices.roleDomainApi.roleDeleteAndReassign(input));
    },
  },
};

export default role;
