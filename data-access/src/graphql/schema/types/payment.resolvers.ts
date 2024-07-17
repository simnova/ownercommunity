import { Resolvers } from '../builder/generated';

const payment: Resolvers = {
  Query: {
    cybersourcePublicKeyId: async (_parent, _args, context, _info) => {
      return await context.applicationServices.paymentApi.generatePublicKey();
    },
  },
  Mutation: {
    // const member = await getMemberForCurrentUser(context);
    // addPaymentInstrument: async (_parent, args, context, _info) => {

    // }
  },
};

export default payment;