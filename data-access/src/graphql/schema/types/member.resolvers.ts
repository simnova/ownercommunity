import { Resolvers, Member, Community, Role, User, MemberMutationResult } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { applyPermission, applyPermissionFilter, getMemberForCurrentUser } from '../resolver-helper';
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
      if (parent.role && isValidObjectId(parent.role.id)) {
        const roleToReturn = await context.applicationServices.role.dataApi.getRoleById(parent.role.id) as Role;
        return applyPermission<Role>(roleToReturn, (_role) => {
          return context.passport.datastoreVisa.forRole(context.member.role).determineIf((permissions) => 
            (permissions.canManageRolesAndPermissions && parent.community.toString() === context.member.community.toString()) ||
            parent.id === context.member.id || 
            permissions.isSystemAccount);
        });
      }
    },
    isAdmin: async (parent, _args, context) => {
      return await context.applicationServices.member.dataApi.isAdmin(parent.id);
    },
  },
  MemberAccount: {
    user: async (parent, _args, context) => {
      // if (!context.passport.datastoreVisa.forMember(member).determineIf((permissions) => permissions.canManageMembers || member.id === .id || permissions.isSystemAccount)) {
      //   return null;
      // }
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
    member: async (_parent, {id}, context) => {
      if (!context.verifiedUser) {
        throw new Error('Unauthorized query: member');
      }
      if (id && isValidObjectId(id)) {
        const memberToReturn = await context.applicationServices.member.dataApi.getMemberById(id) as Member;
        return applyPermission<Member>(memberToReturn, (member) => {
          return context.passport.datastoreVisa.forMember(context.member).determineIf((permissions) =>
            (permissions.canManageMembers && context.member?.community.toString() === member.community.toString()) ||
            (context.member.community.toString() === member?.community.toString()) ||  // unsure about this condition for members
            permissions.isSystemAccount
          );
        });
      }
      return null;
    },
    members: async (_, _input, context) => {
      if (!context.passport.datastoreVisa.forMember(context.member).determineIf((permissions) => permissions.isSystemAccount)) {
        throw new Error('Unauthorized query: members');
      }
      return (await context.applicationServices.member.dataApi.getMembers()) as Member[];
    },
    membersByCommunityId: async (_, { communityId }, context) => {
      const membersToReturn = await context.applicationServices.member.dataApi.getMembersByCommunityId(communityId) as Member[];
      return applyPermissionFilter<Member>(membersToReturn, (member) => {
        return context.passport.datastoreVisa
          .forMember(context.member)
          .determineIf((permissions) => 
            // current member is admin and in the same community as queried members
            (permissions.canManageMembers && context.member?.community.toString() === member?.community.toString()) || 
            // current member is in the same community as queried members and queried member's profile is public
            (member.community.toString() === context.member?.community.toString() && member?.profile?.showProfile )|| 
            // for system accounts
            permissions.isSystemAccount
          );
      });
    },
    membersByUserExternalId: async (_, { userExternalId }, context) => {
      if (!context.verifiedUser) {
        throw new Error('Unauthorized query: membersByUserExternalId');
      }
      return (await context.applicationServices.member.dataApi.getMembersByUserExternalId(userExternalId)) as Member[];
    },
    membersAssignableToTickets: async (_, _input, context) => {
      const membersToReturn = await context.applicationServices.member.dataApi.getMembersAssignableToTickets() as Member[];
      return applyPermissionFilter<Member>(membersToReturn, (member) => {
        return context.passport.datastoreVisa
          .forMember(context.member)
          .determineIf((permissions) => 
            (permissions.canManageMembers &&  context.member?.community.toString() === member.community.toString())|| 
            (context.member.community?.id === member?.community?.id) ||  // unsure about this condition for members
            permissions.isSystemAccount
          );
      });
    },
    memberAssignableToViolationTickets: async (_, { violationTicketId }, context) => {
      const memberToReturn = await context.applicationServices.member.dataApi.getMemberAssignableToViolationTickets(violationTicketId) as Member;
      return applyPermission<Member>(memberToReturn, (member) => {
        return context.passport.datastoreVisa
          .forMember(context.member)
          .determineIf((permissions) => 
            (permissions.canManageMembers &&  context.member?.community.toString() === member.community.toString())|| 
            (context.member.community?.id === member?.community?.id) ||  // unsure about this condition for members
            permissions.isSystemAccount
          );
      });

    },
    memberForCurrentUser: async (_, _input, context) => {
      const memberToReturn = await getMemberForCurrentUser(context);
      return applyPermission<Member>(memberToReturn, (member) => {
        return context.passport.datastoreVisa
          .forMember(context.member)
          .determineIf((permissions) => 
            (context.member?.id === member?.id) ||
            permissions.isSystemAccount
          );
      });
    },
    cybersourcePublicKeyId: async (parent, _args, { applicationServices }) => {
      return await applicationServices.payment.cybersourceApi.generatePublicKey();
    },
    memberPaymentInstruments: async (_, _args, context) => {
      const member = await getMemberForCurrentUser(context);
      if (member?.cybersourceCustomerId) {
        const paymentInstruments = await context.applicationServices.payment.cybersourceApi.getPaymentInstruments(member.cybersourceCustomerId);
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
      let cybersourceCustomerId = member?.cybersourceCustomerId;
      if (!cybersourceCustomerId) {
        cybersourceCustomerId = await context.applicationServices.payment.cybersourceApi.createCybersouceCustomer(input);
        console.log('createCybersouceCustomerResponse', cybersourceCustomerId);
        if (cybersourceCustomerId) {
          return await MemberMutationResolver(context.applicationServices.member.domainApi.memberUpdate({id: member.id, cybersourceCustomerId}));
        }
      }

      if (cybersourceCustomerId) {
        const paymentInstrumentPayload: CustomerProfile = {
          ...input,
          customerId: cybersourceCustomerId,
        };
        const paymentTokenInfo: PaymentTokenInfo = { paymentToken: input.paymentToken, isDefault: input.isDefault };
        await context.applicationServices.payment.cybersourceApi.addPaymentInstrument(paymentInstrumentPayload, paymentTokenInfo);
        return { status: { success: true }, member };
      }
    },

    memberSetDefaultPaymentInstrument: async (_, { paymentInstrumentId }, context) => {
      let status: boolean;
      const member = await getMemberForCurrentUser(context);
      const cybersourceCustomerId = member?.cybersourceCustomerId;
      if (cybersourceCustomerId) {
        status = await context.applicationServices.payment.cybersourceApi.setDefaultPaymentInstrument(cybersourceCustomerId, paymentInstrumentId);
        return { success: status, errorMessage: '' };
      }
    },

    memberDeletePaymentInstrument: async (_, { paymentInstrumentId }, context) => {
      const member = await getMemberForCurrentUser(context);
      let response: boolean;
      try {
        const cybersourceCustomerId = member?.cybersourceCustomerId;
        if (cybersourceCustomerId) {
          response = await context.applicationServices.payment.cybersourceApi.deletePaymentInstrument(cybersourceCustomerId, paymentInstrumentId);
          return { success: response };
        }
      } catch (error) {
        return { success: false, errorMessage: error.message };
      }
    },
  },
};

export default member;
