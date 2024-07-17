import { Resolvers } from '../builder/generated';
import { getMemberForCurrentUser } from '../resolver-helper';

const payment: Resolvers = {
  Query: {
    cybersourcePublicKeyId: async (_parent, _args, context, _info) => {
      return await context.applicationServices.paymentApi.generatePublicKey();
    },
  },
  Mutation: {
   addPaymentInstrument: async (_parent, { input }, context, _info) => {
    const member = await getMemberForCurrentUser(context);
    return await context.applicationServices.paymentApi.addPaymentInstrument(input, member.id);
   }
  },
};

export default payment;