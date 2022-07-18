import { Community, Member, Property, Resolvers, ServiceTicket, ServiceTicketMutationResult, ServiceTicketsSearchInput } from '../../generated';
import { getMemberForCurrentUser } from '../resolver-helper';
import { isValidObjectId } from 'mongoose';
import { ServiceTicket as ServiceTicketDo } from '../../../infrastructure/data-sources/cosmos-db/models/service-ticket';

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
    serviceTicketsSearch: async (_, _args, context, info) => {
      const member = await getMemberForCurrentUser(context, context.community);
      const searchInput = {
        searchString: _args.input.searchString.trim(),
        options: {
          filter: _args.input?.options?.filter ?? null,
          facets: _args.input?.options?.facets ?? [],
          top: _args.input?.options?.top ?? 10,
          skip: _args.input?.options?.skip ?? 0,
          orderBy: _args.input?.options?.orderBy ?? [],
        },
      } as ServiceTicketsSearchInput;

      const searchResults = await context.dataSources.serviceTicketsSearchApi.serviceTicketsSearch(searchInput, member.id);
      let results = [];
      for await (const result of searchResults?.results) {
        results.push(result.document);
      }

      return {
        serviceTicketsResults: results,
        count: searchResults?.count,
        facets: {
          requestor: searchResults?.facets?.requestor,
          assignedTo: searchResults?.facets?.assignedTo,
          priority: searchResults?.facets?.priority,
          status: searchResults?.facets?.status,
          requestorId: searchResults?.facets?.requestorId,
          assignedToId: searchResults?.facets?.assignedToId,
        },
      };
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
