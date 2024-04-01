import { Community, Member, Property, Resolvers,Service, ServiceTicket, ServiceTicketMutationResult } from '../builder/generated';
import { getMemberForCurrentUser } from '../resolver-helper';
import { isValidObjectId } from 'mongoose';
import { ServiceTicket as ServiceTicketDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/service-ticket';

const ServiceTicketMutationResolver = async (getServiceTicket: Promise<ServiceTicketDo>): Promise<ServiceTicketMutationResult> => {
  try {
    return {
      status: { success: true },
      serviceTicket: await getServiceTicket,
    } as ServiceTicketMutationResult;
  } catch (error) {
    console.error('ServiceTicket > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      serviceTicket: null,
    } as ServiceTicketMutationResult;
  }
};

const serviceTicket: Resolvers = {
  ServiceTicket: {
    community: async (parent, args, context, info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await context.dataSources.communityCosmosdbApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    property: async (parent, args, context, info) => {
      if (parent.property && isValidObjectId(parent.property.toString())) {
        return (await context.dataSources.propertyCosmosdbApi.findOneById(parent.property.toString())) as Property;
      }
      return parent.property;
    },
    requestor: async (parent, args, context, info) => {
      if (parent.requestor && isValidObjectId(parent.requestor.toString())) {
        return (await context.dataSources.memberCosmosdbApi.findOneById(parent.requestor.toString())) as Member;
      }
      return parent.requestor;
    },
    assignedTo: async (parent, args, context, info) => {
      if (parent.assignedTo && isValidObjectId(parent.assignedTo.toString())) {
        return (await context.dataSources.memberCosmosdbApi.findOneById(parent.assignedTo.toString())) as Member;
      }
      return parent.assignedTo;
    },
    service: async (parent, args, context, info) => {
      if(parent.service && isValidObjectId(parent.service.toString())){
        return (await context.dataSources.serviceCosmosdbApi.findOneById(parent.service.toString())) as Service;
      }
      return parent.service;
    }
  },
  ServiceTicketActivityDetail: {
    activityBy: async (parent, args, context, info) => {
      if (parent.activityBy && isValidObjectId(parent.activityBy.toString())) {
        return (await context.dataSources.memberCosmosdbApi.findOneById(parent.activityBy.toString())) as Member;
      }
      return parent.activityBy;
    },
  },
  Query: {
    serviceTicket: async (_parent, args, context, _info) => {
      return (await context.dataSources.serviceTicketCosmosdbApi.findOneById(args.id)) as ServiceTicket;
    },
    serviceTicketsOpenByCommunity: async (_parent, _args, context, _info) => {
      return (await context.dataSources.serviceTicketCosmosdbApi.getServiceTicketsByCommunityId(context.community)) as ServiceTicket[];
    },
    serviceTicketsOpenByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      return (await context.dataSources.serviceTicketCosmosdbApi.getServiceTicketsOpenByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsClosedByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      return (await context.dataSources.serviceTicketCosmosdbApi.getServiceTicketsClosedByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsAssignedToCurrentUser: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      return (await context.dataSources.serviceTicketCosmosdbApi.getServiceTicketsByAssignedTo(context.community, member.id)) as ServiceTicket[];
    },
    serviceTicketsByCommunityId: async (_parent, { communityId }, context, _info) => {
      return (await context.dataSources.serviceTicketCosmosdbApi.getServiceTicketsByCommunityId(communityId)) as ServiceTicket[];
    },
    serviceTicketsSearch: async (_, { input }, context, info) => {
      const member = await getMemberForCurrentUser(context, context.community);
      const searchResults = await context.dataSources.serviceTicketsSearchApi.serviceTicketsSearch(input, member.id);
      return await context.dataSources.serviceTicketsSearchApi.getServiceTicketsSearchResults(searchResults);
    },
  },
  Mutation: {
    serviceTicketCreate: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketCreate(input));
    },
    serviceTicketUpdate: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketUpdate(input));
    },
    serviceTicketSubmit: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketSubmit(input));
    },
    serviceTicketAssign: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketAssign(input));
    },
    serviceTicketAddUpdateActivity: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketAddUpdateActivity(input));
    },
    serviceTicketChangeStatus: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketChangeStatus(input));
    },
    serviceTicketDelete: async (_, { input }, { dataSources }) => {
      return ServiceTicketMutationResolver(dataSources.serviceTicketDomainAPI.serviceTicketDelete(input));
    },
  },
};

export default serviceTicket;
