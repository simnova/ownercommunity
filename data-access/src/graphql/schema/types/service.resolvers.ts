import { Community, Resolvers, Service, ServiceMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { Service as ServiceDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/service';


const ServiceMutationResolver = async (getService:Promise<ServiceDo>): Promise<ServiceMutationResult> => {
  try {
    return {
      status : { success: true },
      service: (await getService) 
    } as ServiceMutationResult;
  }
  catch(error){
    console.error("Service > Mutation  : ",error);
    return  {
      status : { success: false, errorMessage: error.message },
      service: null
    } as ServiceMutationResult;
  }
}

const service : Resolvers = {
  Service: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
  },
  Query: {
    service: async (_parent, args, context, _info) => {
      return (await context.applicationServices.serviceDataApi.getServiceById(args.id)) as Service;
    },
    servicesByCommunityId: async (_parent, {communityId}, context, _info) => {
      return (await context.applicationServices.serviceDataApi.getServicesByCommunityId(communityId)) as Service[];
    }
  },
  Mutation: {
    serviceCreate: async (_, { input }, {applicationServices}) => {
      return ServiceMutationResolver( applicationServices.serviceDomainApi.serviceCreate(input));
    },
    serviceUpdate: async (_, { input }, {applicationServices}) => {
      return ServiceMutationResolver( applicationServices.serviceDomainApi.serviceUpdate(input));
    },
  }
}

export default service;