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
      status : { success: false, error: JSON.stringify(error) },
      role: null
    } as RoleMutationResult;
  }
}


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
    role: async (_, { id }, { dataSources }) => {
      return (await dataSources.roleApi.getRoleById(id)) as Role;
    },
    roles: async (_, {}, { dataSources }) => {
      return (await dataSources.roleApi.getRoles()) as Role[];
    }
  },
  Mutation: {
    roleAdd(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleAdd(input));
    },
    roleUpdate(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleUpdate(input));
    },
    roleDeleteAndReassign(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleDeleteAndReassign(input));
    }
  }
}

export default role;