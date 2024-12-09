// vendor-user.resolvers.js
import { isValidObjectId } from 'mongoose';
import { Resolvers } from '../builder/generated';

const vendorUserResolvers: Resolvers = {
  VendorUser: {
    personalInformation: (parent) => parent.personalInformation,
  },
  Query: {
    vendorUser: async (parent, args, context, info) => {
      if (!isValidObjectId(args.id)) throw new Error('Invalid User ID');
      return await context.applicationServices.users.vendorUser.dataApi.getUserById(args.id);
    },
    vendorUsers: async (parent, args, context, info) => {
      return await context.applicationServices.users.vendorUser.dataApi.getUsers();
    },
  },
  Mutation: {
    vendorUserCreate: async (parent, args, context, info) => {
      const user = await context.applicationServices.users.vendorUser.domainApi.addUser();
      return { user };
    },
    vendorUserUpdate: async (parent, args, context, info) => {
      const user = await context.applicationServices.users.vendorUser.domainApi.updateUser(args.input);
      return { user };
    },
  },
};

export default vendorUserResolvers;
