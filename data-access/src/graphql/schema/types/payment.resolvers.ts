import { Resolvers } from '../builder/generated';

const payment: Resolvers = {
  Query: {
    paymentKey: async (_parent, _args, { applicationServices }, _info) => {
      return await applicationServices.paymentApi.generateKey();
    },
  },
  Mutation: {
    // Add mutation resolvers here
  },
};

export default payment;