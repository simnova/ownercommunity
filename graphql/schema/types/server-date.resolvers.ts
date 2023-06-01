import { Resolvers } from '../../generated';

const serverDate: Resolvers = {
  Query: {
    serverDate: async (_parent, args, context) => {
      return (new Date()).toString();
    }
  }
};

export default serverDate;