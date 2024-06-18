import {Community, Member, Property, Service, Resolvers, ViolationTicketMutationResult, AdminTicket } from '../builder/generated';
import { AdminTicket as AdminTicketDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/violation-ticket';
import { isValidObjectId } from 'mongoose';

const ViolationTicketMutationResolver = async (getAdminTicket: Promise<AdminTicketDo>): Promise<ViolationTicketMutationResult> => {
  try {
    return {
      status: { success: true },
      violationTicket: await getAdminTicket,
    } as ViolationTicketMutationResult;
  } catch (error) {
    console.error('AdminTicket > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      violationTicket: null,
    } as ViolationTicketMutationResult;
  }
};

const serviceTicket: Resolvers = {
  AdminTicket: {
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
  Query: {
    violationTicket: async (_parent, args, context, _info) => {
      return (await context.applicationServices.violationTicketDataApi.getViolationTicketById(args.id)) as AdminTicket;
    },
  },
  Mutation: {
    adminTicketCreate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.adminTicketDomainApi.adminTicketCreate(input));
    },
    violationTicketUpdate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.adminTicketDomainApi.violationTicketUpdate(input));
    },
  },
};

export default serviceTicket;
