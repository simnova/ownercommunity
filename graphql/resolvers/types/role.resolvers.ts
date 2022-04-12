import { Resolvers, Role, Community, RoleMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Role as RoleDo } from '../../../infrastructure/data-sources/cosmos-db/models/role';


const RoleMutationResolver = async (getRole:Promise<RoleDo>): Promise<RoleMutationResult> => {
  try {
    return {
      status : { success: true },
      role: (await getRole) 
    } as RoleMutationResult;
  }
  catch(error){
    console.error("Role > Mutation  : ",error);
    return  {
      status : { success: false, error: error.message },
      role: null
    } as RoleMutationResult;
  }
}


const role : Resolvers = {
  Role: {
    community: async (parent, _args, context, _info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
  },
  Query: {
    role: async (_, { id }, { dataSources }) => {
      return (await dataSources.roleApi.getRoleById(id)) as Role;
    },
    roles: async (_, _args, { dataSources }) => {
      return (await dataSources.roleApi.getRoles()) as Role[];
    }
  },
  Mutation: {
    roleAdd(_parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleAdd(input));
    },
    roleUpdate(_parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleUpdate(input));
    },
    roleDeleteAndReassign(_parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleDeleteAndReassign(input));
    }
  }
}

export default role;