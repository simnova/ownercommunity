import { Community, Member, Property, Resolvers, ServiceTicket, ServiceTicketMutationResult } from '../../generated';
import { getMemberForCurrentUser } from './helpers';
import { isValidObjectId } from 'mongoose';
import { ServiceTicket as ServiceTicketDo } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';


const ServiceTicketMutationResolver = async (getServiceTicket:Promise<ServiceTicketDo>): Promise<ServiceTicketMutationResult> => {
  try {
    return {
      status : { success: true },
      community: (await getServiceTicket) 
    } as ServiceTicketMutationResult;
  }
  catch(error){
    console.error("ServiceTicket > Mutation  : ",error);
    return  {
      status : { success: false, error: JSON.stringify(error) },
      community: null
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
      if(parent.property && isValidObjectId(parent.requestor.toString())){
        return (await context.dataSources.propertyApi.findOneById(parent.requestor.toString())) as Property;
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
    serviceTicketsOpenByCommunity: async (parent, args, context, info) => {
      return (await context.dataSources.serviceTicketApi.getServiceTicketsByCommunityId(args.communityId)) as ServiceTicket[];
    },
    serviceTicketsOpenByRequestor: async (_, { propertyId }, { dataSources }) => {
      return (await dataSources.serviceTicketApi.getServiceTicketsOpenByRequestor(propertyId)) as ServiceTicket[];
    },
    serviceTicketsClosedByRequestor: async (_, { propertyId }, { dataSources }) => {
      return (await dataSources.serviceTicketApi.getServiceTicketsClosedByRequestor(propertyId)) as ServiceTicket[];
    },
    serviceTicketsAssignedCurrentUser: async (_, { communityId }, context) => {
      const member = await getMemberForCurrentUser(context, communityId);
      return (await context.dataSources.serviceTicketApi.getServiceTicketsByAssignedTo(communityId, member.id)) as ServiceTicket[];
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