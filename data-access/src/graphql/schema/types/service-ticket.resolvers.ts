import { Community, Member, Property, Resolvers,Service, ServiceTicket, AdminTicket, ServiceTicketMutationResult } from '../builder/generated';
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
        return (await context.applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    property: async (parent, args, context, info) => {
      if (parent.property && isValidObjectId(parent.property.toString())) {
        return (await context.applicationServices.propertyDataApi.getPropertyById(parent.property.toString())) as Property;
      }
      return parent.property;
    },
    requestor: async (parent, args, context, info) => {
      if (parent.requestor && isValidObjectId(parent.requestor.toString())) {
        return (await context.applicationServices.memberDataApi.getMemberById(parent.requestor.toString())) as Member;
      }
      return parent.requestor;
    },
    assignedTo: async (parent, args, context, info) => {
      if (parent.assignedTo && isValidObjectId(parent.assignedTo.toString())) {
        return (await context.applicationServices.memberDataApi.getMemberById(parent.assignedTo.toString())) as Member;
      }
      return parent.assignedTo;
    },
    service: async (parent, args, context, info) => {
      if(parent.service && isValidObjectId(parent.service.toString())){
        return (await context.applicationServices.serviceDataApi.getServiceById(parent.service.toString())) as Service;
      }
      return parent.service;
    }
  },
  ServiceTicketActivityDetail: {
    activityBy: async (parent, args, context, info) => {
      if (parent.activityBy && isValidObjectId(parent.activityBy.toString())) {
        return (await context.applicationServices.memberDataApi.getMemberById(parent.activityBy.toString())) as Member;
      }
      return parent.activityBy;
    },
  },
  TicketType: {
    __resolveType: (parent, context, info) => {
      if (parent.ticketType === 'ServiceTicketType') {
        return 'ServiceTicket';
      }
        return 'AdminTicket';
  },
},
  Query: {
    serviceTicket: async (_parent, args, context, _info) => {
      if (args.ticketType === 'ServiceTicketType') {
        return (await context.applicationServices.serviceTicketDataApi.getServiceTicketById(args.id)) as ServiceTicket;
      }
      if (args.ticketType === 'ViolationTicketType') {
        return (await context.applicationServices.violationTicketDataApi.getViolationTicketById(args.id)) as AdminTicket;
      }
    },
    serviceTicketsOpenByCommunity: async (_parent, _args, context, _info) => {
      return (await context.applicationServices.serviceTicketDataApi.getServiceTicketsByCommunityId(context.communityId)) as ServiceTicket[];
    },
    serviceTicketsOpenByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.communityId);
      return (await context.applicationServices.serviceTicketDataApi.getServiceTicketsOpenByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsClosedByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.communityId);
      return (await context.applicationServices.serviceTicketDataApi.getServiceTicketsClosedByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsAssignedToCurrentUser: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context, context.communityId);
      return (await context.applicationServices.serviceTicketDataApi.getServiceTicketsByAssignedTo(context.communityId, member.id)) as ServiceTicket[];
    },
    // const searchResults = await context.applicationServices.serviceTicketSearchApi.serviceTicketsSearchByCommunityId(null, communityId)
    //   return await context.applicationServices.serviceTicketSearchApi.getServiceTicketsSearchResults(searchResults) as ServiceTicket[]
    serviceTicketsByCommunityId: async (_parent, { communityId }, context, _info) => {
      return (await context.applicationServices.serviceTicketDataApi.getServiceTicketsByCommunityId(communityId)) as ServiceTicket[] | AdminTicket[];
    },
    serviceTicketsSearchAdmin: async (_, { input }, context, info) => {
      const searchResults = await context.applicationServices.serviceTicketSearchApi.serviceTicketsSearchAdmin(input, context.communityId);
      return await context.applicationServices.serviceTicketSearchApi.getServiceTicketsSearchResults(searchResults);
    },
    serviceTicketsSearch: async (_, { input }, context, info) => {
      const member = await getMemberForCurrentUser(context, context.communityId);
      const searchResults = await context.applicationServices.serviceTicketSearchApi.serviceTicketsSearch(input, member.id);
      return await context.applicationServices.serviceTicketSearchApi.getServiceTicketsSearchResults(searchResults);
    },
  },
  Mutation: {
    serviceTicketCreate: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketCreate(input));
    },
    serviceTicketUpdate: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketUpdate(input));
    },
    serviceTicketSubmit: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketSubmit(input));
    },
    serviceTicketAssign: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketAssign(input));
    },
    serviceTicketAddUpdateActivity: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketAddUpdateActivity(input));
    },
    serviceTicketChangeStatus: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketChangeStatus(input));
    },
    serviceTicketDelete: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.serviceTicketDomainApi.serviceTicketDelete(input));
    },
  },
};


export default serviceTicket;
