import { Resolvers } from '../builder/generated';

const payment: Resolvers = {
  Query: {
    paymentKeyId: async (_parent, _args, context, _info) => {
      return await context.applicationServices.paymentApi.generatePublicKey();
    },
  },
  Mutation: {
    // Add mutation resolvers here
  },
};

export default payment;