import {Community, Member, Property, Service, Resolvers, ViolationTicketMutationResult, ViolationTicket, PaymentTransactionsResult } from '../builder/generated';
import { ViolationTicket as ViolationTicketDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/cases/violation-ticket';
import { isValidObjectId } from 'mongoose';
import { getMemberForCurrentUser } from '../resolver-helper';

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
      if(parent.service && isValidObjectId(parent.service.toString())){
        return (await context.applicationServices.service.dataApi.getServiceById(parent.service.toString())) as Service;
      }
      return parent.service;
    }
  },
  ViolationTicketV1Message: {
    initiatedBy: async (parent, args, context, info) => {
      if(parent.initiatedBy && isValidObjectId(parent.initiatedBy.toString())){
        return (await context.applicationServices.member.dataApi.getMemberById(parent.initiatedBy.toString())) as Member;
      }
      return parent.initiatedBy;
    }
  },
  Query: {
    violationTicket: async (_parent, args, context, _info) => {
      return (await context.applicationServices.cases.violationTicket.v1.dataApi.getViolationTicketById(args.id)) as ViolationTicket;
    },
    violationTicketPaymentTransactions: async (_parent, _, context, _info) => {
      const member = await getMemberForCurrentUser(context);
      return (await context.applicationServices.cases.violationTicket.v1.dataApi.getMemberPaymentTransactions(member.id)) as PaymentTransactionsResult[];
    }
  },
  Mutation: {
    violationTicketCreate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketCreate(input));
    },
    violationTicketUpdate: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketUpdate(input));
    },
    violationTicketDelete: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketDelete(input));
    },
    violationTicketAssign: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketAssign(input));
    },
    violationTicketChangeStatus: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketChangeStatus(input));
    },
    violationTicketAddUpdateActivity: async (_, { input }, { applicationServices }) => {
      return  ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketAddUpdateActivity(input));
    },
    violationTicketProcessPayment: async (_, { input }, { applicationServices }) => {
      return ViolationTicketMutationResolver(applicationServices.cases.violationTicket.v1.domainApi.violationTicketProcessPayment(input));
    }
  },
};

export default serviceTicket;
