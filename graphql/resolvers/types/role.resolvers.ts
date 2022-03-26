import { Resolvers, Role, Community, RoleMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Role as RoleDo } from '../../../infrastructure/data-sources/cosmos-db/models/role';


const RoleMutationResolver = async (getRole:Promise<RoleDo>): Promise<RoleMutationResult> => {
  try {
    return {
      status : { success: true },
      community: (await getRole) 
    } as RoleMutationResult;
  }
  catch(error){
    console.error("Role > Mutation  : ",error);
    return  {
      status : { success: false, error: JSON.stringify(error) },
      community: null
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
    rolesByCommunityId: async (_, { communityId }, { dataSources }) => {
      return (await dataSources.roleApi.getRolesByCommunityId(communityId)) as Role[];
    }
  },
  Mutation: {
    roleAdd(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleAdd(input));
    },
    roleUpdate(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleUpdate(input));
    },
    roleDelete(parent, { input }, { dataSources }) {
      return RoleMutationResolver( dataSources.roleDomainAPI.roleDelete(input));
    }
  }
}