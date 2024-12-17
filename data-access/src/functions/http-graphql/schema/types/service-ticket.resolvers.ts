import { Community, Member, Property, Resolvers, Service, ServiceTicket, Ticket, ServiceTicketMutationResult, VendorUser } from '../builder/generated';
import { getMemberForCurrentUser } from '../resolver-helper';
import { isValidObjectId } from 'mongoose';
import { ServiceTicket as ServiceTicketDo } from '../../../../infrastructure-services-impl/datastore/mongodb/models/cases/service-ticket';

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
        return (await context.applicationServices.community.dataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    property: async (parent, args, context, info) => {
      if (parent.property && isValidObjectId(parent.property.toString())) {
        return (await context.applicationServices.property.dataApi.getPropertyById(parent.property.toString())) as Property;
      }
      return parent.property;
    },
    requestor: async (parent, args, context, info) => {
      if (parent.requestor && isValidObjectId(parent.requestor.toString())) {
        return (await context.applicationServices.member.dataApi.getMemberById(parent.requestor.toString())) as Member;
      }
      return parent.requestor;
    },
    assignedTo: async (parent, args, context, info) => {
      if (parent.assignedTo && isValidObjectId(parent.assignedTo.toString())) {
        return (await context.applicationServices.member.dataApi.getMemberById(parent.assignedTo.toString())) as Member;
      }
      return parent.assignedTo;
    },
    service: async (parent, args, context, info) => {
      if (parent.service && isValidObjectId(parent.service.toString())) {
        return (await context.applicationServices.service.dataApi.getServiceById(parent.service.toString())) as Service;
      }
      return parent.service;
    },
    approvedVendor: async (parent, args, context, info) => {
      if (parent.approvedVendor && isValidObjectId(parent.approvedVendor.toString())) {
        return (await context.applicationServices.users.vendorUser.dataApi.getMemberById(parent.approvedVendor.toString())) as VendorUser;
      }
      return parent.approvedVendor;
    },
  },
  ServiceTicketActivityDetail: {
    activityBy: async (parent, args, context, info) => {
      if (parent.activityBy && isValidObjectId(parent.activityBy.toString())) {
        return (await context.applicationServices.member.dataApi.getMemberById(parent.activityBy.toString())) as Member;
      }
      return parent.activityBy;
    },
  },
  ServiceTicketV1Message: {
    initiatedBy: async (parent, args, context, info) => {
      if (parent.initiatedBy && isValidObjectId(parent.initiatedBy.toString())) {
        return (await context.applicationServices.member.dataApi.getMemberById(parent.initiatedBy.toString())) as Member;
      }
      return parent.initiatedBy;
    },
  },
  ServiceTicketV1RevisionRequest: {
    requestedBy: async (parent, args, context, info) => {
      if (parent.requestedBy && isValidObjectId(parent.requestedBy.toString())) {
        return (await context.applicationServices.member.dataApi.getMemberById(parent.requestedBy.toString())) as Member;
      }
      return parent.requestedBy;
    },
  },
  Query: {
    serviceTicket: async (_parent, args, context, _info) => {
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketById(args.id)) as ServiceTicket;
    },
    serviceTicketsOpenByCommunity: async (_parent, _args, context, _info) => {
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketsByCommunityId(context.community?.id)) as ServiceTicket[];
    },
    serviceTicketsOpenByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context);
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketsOpenByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsClosedByRequestor: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context);
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketsClosedByRequestor(member.id)) as ServiceTicket[];
    },
    serviceTicketsAssignedToCurrentUser: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context);
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketsByAssignedTo(context.community?.id, member.id)) as ServiceTicket[];
    },
    // const searchResults = await context.applicationServices.cases.serviceTicketSearchApi.serviceTicketsSearchByCommunityId(null, communityId)
    //   return await context.applicationServices.cases.serviceTicketSearchApi.getServiceTicketsSearchResults(searchResults) as ServiceTicket[]
    serviceTicketsByCommunityId: async (_parent, { communityId }, context, _info) => {
      return (await context.applicationServices.cases.serviceTicket.v1.dataApi.getServiceTicketsByCommunityId(communityId)) as Ticket[];
    },
    serviceTicketsSearchAdmin: async (_, { input }, context, info) => {
      const searchResults = await context.applicationServices.cases.serviceTicket.v1.searchApi.serviceTicketsSearchAdmin(input, context.community?.id);
      return await context.applicationServices.cases.serviceTicket.v1.searchApi.getServiceTicketsSearchResults(searchResults);
    },
    serviceTicketsSearch: async (_, { input }, context, info) => {
      const member = await getMemberForCurrentUser(context);
      const searchResults = await context.applicationServices.cases.serviceTicket.v1.searchApi.serviceTicketsSearch(input, member.id);
      return await context.applicationServices.cases.serviceTicket.v1.searchApi.getServiceTicketsSearchResults(searchResults);
    },
    serviceTicketReIndex: async (_, _args, context, info) => {
      const searchResults = await context.applicationServices.cases.serviceTicket.v1.searchApi.reIndexServiceTickets();
      return await context.applicationServices.cases.serviceTicket.v1.searchApi.getServiceTicketsSearchResults(searchResults);
    }
  },
  Mutation: {
    serviceTicketCreate: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketCreate(input));
    },
    serviceTicketUpdate: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketUpdate(input));
    },
    serviceTicketSubmit: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketSubmit(input));
    },
    serviceTicketAssign: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketAssign(input));
    },
    serviceTicketAddUpdateActivity: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketAddUpdateActivity(input));
    },
    serviceTicketChangeStatus: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketChangeStatus(input));
    },
    serviceTicketDelete: async (_, { input }, { applicationServices }) => {
      return ServiceTicketMutationResolver(applicationServices.cases.serviceTicket.v1.domainApi.serviceTicketDelete(input));
    },
    
  },
};

export default serviceTicket;
