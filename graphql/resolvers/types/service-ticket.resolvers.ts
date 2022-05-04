import { Community, Member, Property, Resolvers, ServiceTicket, ServiceTicketMutationResult } from '../../generated';
import { getMemberForCurrentUser } from './helpers';
import { isValidObjectId } from 'mongoose';
import { ServiceTicket as ServiceTicketDo } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';


const ServiceTicketMutationResolver = async (getServiceTicket:Promise<ServiceTicketDo>): Promise<ServiceTicketMutationResult> => {
  try {
    return {
      status : { success: true },
      serviceTicket: (await getServiceTicket) 
    } as ServiceTicketMutationResult;
  }
  catch(error){
    console.error("ServiceTicket > Mutation  : ",error);
    return  {
      status : { success: false, errorMessage: error.message },
      serviceTicket: null
    } as ServiceTicketMutationResult;
  }
}

const serviceTicket : Resolvers = {
  ServiceTicket: {
    community: async (parent, args, context, info) => {
      if(parent.community && isValidObjectId(parent.community.toString())){
        return (await context.dataSources.communityApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    property: async (parent, args, context, info) => {
      if(parent.property && isValidObjectId(parent.property.toString())){
        return (await context.dataSources.propertyApi.findOneById(parent.property.toString())) as Property;
      }
      return parent.property;
    },
    requestor: async (parent, args, context, info) => {
      if(parent.requestor && isValidObjectId(parent.requestor.toString())){
        return (await context.dataSources.memberApi.findOneById(parent.requestor.toString())) as Member;
      }
      return parent.requestor;
    },
    assignedTo: async (parent, args, context, info) => {
      if(parent.assignedTo && isValidObjectId(parent.assignedTo.toString())){
        return (await context.dataSources.memberApi.findOneById(parent.assignedTo.toString())) as Member;
      }
      return parent.assignedTo;
    }
  },
  ServiceTicketActivityDetail: {
    activityBy: async (parent, args, context, info) => {
      if(parent.activityBy && isValidObjectId(parent.activityBy.toString())){
        return (await context.dataSources.memberApi.findOneById(parent.activityBy.toString())) as Member;
      }
      return parent.activityBy;
    }
  },
  Query: {
    serviceTicket: async (_parent, args, context, _info) => {
      return (await context.dataSources.serviceTicketApi.findOneById(args.id)) as ServiceTicket;
    },
    serviceTicketsOpenByCommunity: async (_parent, _args, context, _info) => {
      return (await context.dataSources.serviceTicketApi.getServiceTicketsByCommunityId(context.community)) as ServiceTicket[];
    },
    serviceTicketsOpenByRequestor: async (_, { propertyId }, { dataSources }) => {
      return (await dataSources.serviceTicketApi.getServiceTicketsOpenByRequestor(propertyId)) as ServiceTicket[];
    },
    serviceTicketsClosedByRequestor: async (_, { propertyId }, { dataSources }) => {
      return (await dataSources.serviceTicketApi.getServiceTicketsClosedByRequestor(propertyId)) as ServiceTicket[];
    },
    serviceTicketsAssignedToCurrentUser: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      return (await context.dataSources.serviceTicketApi.getServiceTicketsByAssignedTo(context.community, member.id)) as ServiceTicket[];
    },
    serviceTicketsById: async (_parent, {communityId}, context, _info) => {
      return (await context.dataSources.serviceTicketApi.getServiceTicketsByCommunityId(communityId)) as ServiceTicket[];
    }
  },
  Mutation: {
    serviceTicketCreate: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketCreate(input));
    },
    serviceTicketUpdate: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketUpdate(input));
    },
    serviceTicketSubmit: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketSubmit(input));
    },
    serviceTicketAssign: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketAssign(input));
    },
    serviceTicketAddUpdateActivity: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketAddUpdateActivity(input));
    },
    serviceTicketChangeStatus: async (_, { input }, {dataSources}) => {
      return ServiceTicketMutationResolver( dataSources.serviceTicketDomainAPI.serviceTicketChangeStatus(input));
    }
  }
}

export default serviceTicket;