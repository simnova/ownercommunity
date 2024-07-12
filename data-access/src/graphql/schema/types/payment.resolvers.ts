import { Resolvers } from '../builder/generated';

const payment: Resolvers = {
  Query: {
    paymentKey: async (_parent, _args, context, _info) => {
      return await context.applicationServices.paymentApi.generateKey();
    },
  },
  Mutation: {
    // Add mutation resolvers here
  },
};

export default payment;