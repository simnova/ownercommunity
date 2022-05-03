import { Resolvers, Community, Member, Property, PropertyMutationResult } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Property as PropertyDo } from '../../../infrastructure/data-sources/cosmos-db/models/property';


const PropertyMutationResolver = async (getProperty:Promise<PropertyDo>): Promise<PropertyMutationResult> => {
  try {
    return {
      status : { success: true },
      property: (await getProperty) 
    } as PropertyMutationResult;
  }
  catch(error){
    console.error("Property > Mutation  : ",error);
    return  {
      status : { success: false, errorMessage: error.message },
      property: null
    } as PropertyMutationResult;
  }
}

const property : Resolvers = {
  Property: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, args, context, info) => {
      if(parent.owner && isValidObjectId(parent.owner.toString())){
        return (await context.dataSources.memberApi.findOneById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    }
  },
  Query: {
    property: async (_parent, args, context, info) => {
      if(args.id && isValidObjectId(args.id)){
        return (await context.dataSources.propertyApi.findOneById(args.id)) as Property;
      }
      return null;
    },
    properties: async (_, _args, context) => {
      const user = await context.dataSources.userApi.getByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.dataSources.propertyApi.getPropertiesByCommunityId(context.community, user.id)) as Property[];
    },
    propertiesByCommunityId: async (_, {communityId}, context) => {
      const user = await context.dataSources.userApi.getByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.dataSources.propertyApi.getPropertiesByCommunityId(communityId, user.id)) as Property[];
    }
  },
  Mutation: {
    propertyAdd: async (_, {input}, {dataSources}) => {
      return PropertyMutationResolver( dataSources.propertyDomainAPI.propertyAdd(input));
    },
    propertyUpdate: async (_, {input}, {dataSources}) => {
      return PropertyMutationResolver( dataSources.propertyDomainAPI.propertyUpdate(input));
    },
    propertyDelete: async (_, {input}, {dataSources}) => {
      return PropertyMutationResolver( dataSources.propertyDomainAPI.propertyDelete(input));
    },
    propertyAssignOwner: async (_, {input}, {dataSources}) => {
      return PropertyMutationResolver( dataSources.propertyDomainAPI.propertyAssignOwner(input));
    },
    propertyRemoveOwner: async (_, {input}, {dataSources}) => {
      return PropertyMutationResolver( dataSources.propertyDomainAPI.propertyRemoveOwner(input));
    }
  }  
}

export default property;