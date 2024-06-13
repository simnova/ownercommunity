import { Resolvers, ViolationTicketMutationResult } from '../builder/generated';
import { AdminTicket as AdminTicketDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/admin-ticket';

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
  Query: {
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
