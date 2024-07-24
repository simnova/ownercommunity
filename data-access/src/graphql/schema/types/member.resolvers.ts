import { Resolvers, Member, Community, Role, User, MemberMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { getMemberForCurrentUser } from '../resolver-helper';
import { Member as MemberDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { CustomerProfile, PaymentTokenInfo } from '../../../../seedwork/services-seedwork-payment-cybersource-interfaces';

const MemberMutationResolver = async (getMember: Promise<MemberDo>): Promise<MemberMutationResult> => {
  try {
    const temp = { status: { success: true }, member: await getMember } as MemberMutationResult;
    return temp;
  } catch (error) {
    console.error('Community > Mutation  : ', error, error.stack);
    return {
      status: { success: false, errorMessage: error.message },
      member: null,
    } as MemberMutationResult;
  }
};

const member: Resolvers = {
  Member: {
    community: async (parent, _args, context) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await context.applicationServices.community.dataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    role: async (parent, _args, context) => {
      if (parent.role && isValidObjectId(parent.role.toString())) {
        return (await context.applicationServices.role.dataApi.getRoleById(parent.role.toString())) as Role;
      }
      return parent.role;
    },
    isAdmin: async (parent, _args, context) => {
      return await context.applicationServices.member.dataApi.isAdmin(parent.id);
    },
  },
  MemberAccount: {
    user: async (parent, _args, context) => {
      if (parent.user && isValidObjectId(parent.user.toString())) {
        return (await context.applicationServices.user.dataApi.getUserById(parent.user.toString())) as User;
      }
      return parent.user;
    },
    createdBy: async (parent, _args, context) => {
      if (parent.createdBy && isValidObjectId(parent.createdBy.toString())) {
        return (await context.applicationServices.user.dataApi.getUserById(parent.createdBy.toString())) as User;
      }
      return parent.createdBy;
    },
  },
  Query: {
    member: async (_parent, { id }, context) => {
      if (id && isValidObjectId(id)) {
        return (await context.applicationServices.member.dataApi.getMemberById(id)) as Member;
      }
      return null;
    },
    members: async (_, _input, { applicationServices }) => {
      return (await applicationServices.member.dataApi.getMembers()) as Member[];
    },
    membersByCommunityId: async (_, { communityId }, { applicationServices }) => {
      return (await applicationServices.member.dataApi.getMembersByCommunityId(communityId)) as Member[];
    },
    membersByUserExternalId: async (_, { userExternalId }, { applicationServices }) => {
      return (await applicationServices.member.dataApi.getMembersByUserExternalId(userExternalId)) as Member[];
    },
    membersAssignableToTickets: async (_, _input, { applicationServices }) => {
      return (await applicationServices.member.dataApi.getMembersAssignableToTickets()) as Member[];
    },
    memberAssignableToViolationTickets: async (_, { violationTicketId }, { applicationServices }) => {
      return (await applicationServices.member.dataApi.getMemberAssignableToViolationTickets(violationTicketId)) as Member;
    },
    memberForCurrentUser: async (_, _input, context) => {
      return getMemberForCurrentUser(context);
    },
    cybersourcePublicKeyId: async (parent, _args, { applicationServices }) => {
      return await applicationServices.payment.cybersourceApi.generatePublicKey();
    },
    memberPaymentInstruments: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context);
      if (member?.wallet?.customerId) {
        const paymentInstruments = await context.applicationServices.payment.cybersourceApi.getPaymentInstruments(member.wallet.customerId);
        return { status: { success: true }, paymentInstruments };
      }
      return { status: { success: false }, paymentInstruments: [] };
    },
  },
  Mutation: {
    memberCreate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberCreate(input));
    },
    memberUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberUpdate(input));
    },
    memberAccountAdd: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberAccountAdd(input));
    },
    memberAccountEdit: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberAccountEdit(input));
    },
    memberAccountRemove: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberAccountRemove(input));
    },
    memberProfileUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.member.domainApi.memberProfileUpdate(input));
    },
    memberProfileAvatarCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      const result = await applicationServices.member.blobApi.memberProfileAvatarCreateAuthHeader(input.memberId, input.fileName, input.contentType, input.contentLength);
      if (result.status.success) {
        result.member = (await applicationServices.member.domainApi.memberProfileUpdateAvatar(input.memberId, result.authHeader.blobName)) as any;
      }
      return result;
    },
    memberProfileAvatarRemove: async (_, { memberId }, { applicationServices }) => {
      const result = {
        status: await applicationServices.member.blobApi.memberProfileAvatarRemove(memberId),
      } as MemberMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return MemberMutationResolver(applicationServices.member.domainApi.memberProfileUpdateAvatar(memberId, null));
      }
    },

    memberAddPaymentInstrument: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context);
      let cyberSourceCustomerId = member?.wallet?.customerId;
      if (!cyberSourceCustomerId) {
        cyberSourceCustomerId = await context.applicationServices.payment.cybersourceApi.createCybersouceCustomer(input);
        console.log('createCybersouceCustomerResponse', cyberSourceCustomerId);
        if (cyberSourceCustomerId) {
          return await MemberMutationResolver(context.applicationServices.member.domainApi.memberAddWallet(member.id, cyberSourceCustomerId));
        }
      }

      if (cyberSourceCustomerId) {
        const paymentInstrumentPayload: CustomerProfile = {
          ...input,
          customerId: cyberSourceCustomerId,
        };
        const paymentTokenInfo: PaymentTokenInfo = { paymentToken: input.paymentToken, isDefault: input.isDefault };
        await context.applicationServices.payment.cybersourceApi.addPaymentInstrument(paymentInstrumentPayload, paymentTokenInfo);
        return { status: { success: true }, member };
      }
    },

    memberSetDefaultPaymentInstrument: async (_, { paymentInstrumentId }, context) => {
      let status: boolean;
      const member = await getMemberForCurrentUser(context);
      const cyberSourceCustomerId = member?.wallet?.customerId;
      if (cyberSourceCustomerId) {
        status = await context.applicationServices.payment.cybersourceApi.setDefaultPaymentInstrument(cyberSourceCustomerId, paymentInstrumentId);
        return { success: status, errorMessage: '' };
      }
    },

    memberDeletePaymentInstrument: async (_, { paymentInstrumentId }, context) => {
      const member = await getMemberForCurrentUser(context);
      let response: boolean;
      try {
        const cyberSourceCustomerId = member?.wallet?.customerId;
        if (cyberSourceCustomerId) {
          response = await context.applicationServices.payment.cybersourceApi.deletePaymentInstrument(cyberSourceCustomerId, paymentInstrumentId);
          return { success: response };
        }
      } catch (error) {
        return { success: false, errorMessage: error.message };
      }
    },
  },
};

export default member;
