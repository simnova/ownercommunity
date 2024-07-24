import {Community, Member, Property, Service, Resolvers, ViolationTicketMutationResult, ViolationTicket } from '../builder/generated';
import { ViolationTicket as ViolationTicketDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/violation-ticket';
import { isValidObjectId } from 'mongoose';

const ViolationTicketMutationResolver = async (getViolationTicket: Promise<ViolationTicketDo>): Promise<ViolationTicketMutationResult> => {
  try {
    return {
      status: { success: true },
      violationTicket: await getViolationTicket,
    } as ViolationTicketMutationResult;
  } catch (error) {
    console.error('ViolationTicket > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      violationTicket: null,
    } as ViolationTicketMutationResult;
  }
};

const serviceTicket: Resolvers = {
  ViolationTicket: {
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
      return (await context.applicationServices.violationTicketDataApi.getViolationTicketById(args.id)) as ViolationTicket;
    },
  },
  Mutation: {
    violationTicketCreate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketCreate(input));
    },
    violationTicketUpdate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketUpdate(input));
    },
    violationTicketDelete: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketDelete(input));
    },
    violationTicketAssign: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketAssign(input));
    },
    violationTicketChangeStatus: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketChangeStatus(input));
    },
    violationTicketAddUpdateActivity: async (_, { input }, { applicationServices }) => {
      return  ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketAddUpdateActivity(input));
    },
    violationTicketProcessPayment: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.violationTicketDomainApi.violationTicketProcessPayment(input));
    }
  },
};

export default serviceTicket;
