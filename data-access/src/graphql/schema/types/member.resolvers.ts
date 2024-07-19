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
        return (await context.applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    role: async (parent, _args, context) => {
      if (parent.role && isValidObjectId(parent.role.toString())) {
        return (await context.applicationServices.roleDataApi.getRoleById(parent.role.toString())) as Role;
      }
      return parent.role;
    },
    isAdmin: async (parent, _args, context) => {
      return (await context.applicationServices.memberDataApi.isAdmin(parent.id));
    },
  },
  MemberAccount: {
    user: async (parent, _args, context) => {
      // if (!context.passport.datastoreVisa.forMember(member).determineIf((permissions) => permissions.canManageMembers || member.id === .id || permissions.isSystemAccount)) {
      //   return null;
      // }
      if (parent.user && isValidObjectId(parent.user.toString())) {
        return (await context.applicationServices.userDataApi.getUserById(parent.user.toString())) as User;
      }
      return parent.user;
    },
    createdBy: async (parent, _args, context) => {
      if (parent.createdBy && isValidObjectId(parent.createdBy.toString())) {
        return (await context.applicationServices.userDataApi.getUserById(parent.createdBy.toString())) as User;
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
        return (await context.applicationServices.memberDataApi.getMemberById(id)) as Member;
      }
      return null;
    },
    members: async (_, _input, context) => {
      if (!context.passport.datastoreVisa.forMember(context.member).determineIf((permissions) => permissions.isSystemAccount)) {
        throw new Error('Unauthorized query: members');
      }
      return (await context.applicationServices.memberDataApi.getMembers()) as Member[];
    },
    membersByCommunityId: async (_, { communityId }, context) => {
      const membersToReturn = await context.applicationServices.memberDataApi.getMembersByCommunityId(communityId) as Member[];
      return applyPermissionFilter<Member>(membersToReturn, (member) => {
        return context.passport.datastoreVisa
          .forMember(context.member)
          .determineIf((permissions) => 
            // current member is admin and in the same community as queried members
            (permissions.canManageMembers && context.member?.community.toString() === member.community.toString()) || 
            // current member is in the same community as queried members and queried member's profile is public
            (member.community.toString() === context.member?.community.toString() && member.profile?.showProfile )|| 
            // for system accounts
            permissions.isSystemAccount
          );
      });
    },
    membersByUserExternalId: async (_, { userExternalId }, context) => {
      if (!context.verifiedUser) {
        throw new Error('Unauthorized query: membersByUserExternalId');
      }
      return (await context.applicationServices.memberDataApi.getMembersByUserExternalId(userExternalId)) as Member[];
    },
    membersAssignableToTickets: async (_, _input, context) => {
      const membersToReturn = await context.applicationServices.memberDataApi.getMembersAssignableToTickets() as Member[];
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
      const memberToReturn = await context.applicationServices.memberDataApi.getMemberAssignableToViolationTickets(violationTicketId) as Member;
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
    cybersourcePublicKeyId: async (parent, _args, context) => {
      return await context.applicationServices.paymentApi.generatePublicKey();
    },
  },
  Mutation: {
    memberCreate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberCreate(input));
    },
    memberUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberUpdate(input));
    },
    memberAccountAdd: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountAdd(input));
    },
    memberAccountEdit: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountEdit(input));
    },
    memberAccountRemove: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberAccountRemove(input));
    },
    memberProfileUpdate: async (_, { input }, { applicationServices }) => {
      return MemberMutationResolver(applicationServices.memberDomainApi.memberProfileUpdate(input));
    },
    memberProfileAvatarCreateAuthHeader: async (_, { input }, { applicationServices }) => {
      const result = await applicationServices.memberBlobApi.memberProfileAvatarCreateAuthHeader(input.memberId, input.fileName, input.contentType, input.contentLength);
      if (result.status.success) {
        result.member = (await applicationServices.memberDomainApi.memberProfileUpdateAvatar(input.memberId, result.authHeader.blobName)) as any;
      }
      return result;
    },
    memberProfileAvatarRemove: async (_, { memberId }, { applicationServices }) => {
      const result = {
        status: await applicationServices.memberBlobApi.memberProfileAvatarRemove(memberId),
      } as MemberMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return MemberMutationResolver(applicationServices.memberDomainApi.memberProfileUpdateAvatar(memberId, null));
      }
    },

    memberAddPaymentInstrument: async (_, {input}, context) => {
      const member = await getMemberForCurrentUser(context);
      let cyberSourceCustomerId = member?.wallet?.customerId;
      if(!cyberSourceCustomerId) {
          cyberSourceCustomerId = await context.applicationServices.paymentApi.createCybersouceCustomer(input);
          console.log('createCybersouceCustomerResponse', cyberSourceCustomerId)
          if(cyberSourceCustomerId) {
            return await MemberMutationResolver(context.applicationServices.memberDomainApi.memberAddWallet(member.id, cyberSourceCustomerId));
          }
      }

      if(cyberSourceCustomerId) {
        const paymentInstrumentPayload: CustomerProfile = {
          ...input,
          customerId: cyberSourceCustomerId,
        };
        const paymentTokenInfo: PaymentTokenInfo = {paymentToken: input.paymentToken, isDefault: input.isDefault}
        await context.applicationServices.paymentApi.addPaymentInstrument(paymentInstrumentPayload, paymentTokenInfo);
        return { status: { success: true }, member };
      }
    }
  },
};

export default member;
