import { Resolvers, StaffRole, StaffRoleMutationResult } from '../builder/generated';
import { StaffRole as StaffRoleDo } from '../../../../infrastructure-services-impl/datastore/mongodb/models/roles/staff-role';

const StaffRoleMutationResolver = async (getRole: Promise<StaffRoleDo>): Promise<StaffRoleMutationResult> => {
  try {
    return {
      status: { success: true },
      role: await getRole,
    } as StaffRoleMutationResult;
  } catch (error) {
    console.error('StaffRole > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      role: null,
    } as StaffRoleMutationResult;
  }
};

const staffRole: Resolvers = {
  Query: {
    staffRole: async (_, { id }, { applicationServices }) => {
      return (await applicationServices.roles.staffRole.dataApi.getRoleById(id)) as StaffRole;
    },
    staffRoles: async (_, _args, { applicationServices }) => {
      return (await applicationServices.roles.staffRole.dataApi.getRoles()) as StaffRole[];
    },
  },
  Mutation: {
    staffRoleAdd(_parent, { input }, { applicationServices }) {
      return StaffRoleMutationResolver(applicationServices.roles.staffRole.domainApi.roleAdd(input));
    },
    staffRoleUpdate(_parent, { input }, { applicationServices }) {
      return StaffRoleMutationResolver(applicationServices.roles.staffRole.domainApi.roleUpdate(input));
    },
    staffRoleDeleteAndReassign(_parent, { input }, { applicationServices }) {
      return StaffRoleMutationResolver(applicationServices.roles.staffRole.domainApi.roleDeleteAndReassign(input));
    },
  },
};

export default staffRole;
