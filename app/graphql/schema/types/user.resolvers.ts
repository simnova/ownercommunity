import { Resolvers, User, CurrentUser } from '../builder/generated';
import { cacheControlFromInfo } from '@apollo/cache-control-types';

const user: Resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      if (context.verifiedUser) {
        console.log(`user found in context with JWT: ${JSON.stringify(context.verifiedUser.verifiedJWT)}`);
      }
      console.log(`Resolver>Query>user ${args.id}`);
      return (await context.dataSources.userCosmosdbApi.getUser(args.id)) as User;
    },
    users: async (parent, args, context, info) => {
      cacheControlFromInfo(info).setCacheHint({ maxAge: 60, scope: 'PUBLIC' }); //this works, but doesn't work when setting it with a directive
      console.log(`Resolver>Query>users`);
      console.log(`Context VerifiedUser value: ${JSON.stringify(context.verifiedUser)}`);
      return (await context.dataSources.userCosmosdbApi.getUsers()) as User[];
    },
    userCurrent: async (parent, args, context, info) => {
      console.log(`Resolver>Query>userCurrent`);
      return (await context.dataSources.userDomainAPI.addUser()) as CurrentUser;
    },
  },
  Mutation: {
    userCreate: async (parent, args, context, info) => {
      return null;
      //return (await context.dataSources.userDomainAPI.addUser()) as User;
    },
    userUpdate: async (parent, args, context, info) => {
      return null;
      // return (await context.dataSources.userDomainAPI.updateUser(args.input)) as User;
    },
    /*
    createAuthHeaderForProfilePhoto: async (parent, args, context, info) => {
      const maxSizeMb = 10;
      const maxSizeBytes = maxSizeMb * 1024 * 1024;
      const permittedContentTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
      ];
      if (!permittedContentTypes.includes(args.input.contentType)) {
        return {success:false, errorMessage:'Content type not permitted.'} as CreateAuthHeaderForProfilePhotoOutput;
      }
      if (args.input.contentLength > maxSizeBytes) {
        return {success:false, errorMessage:'Content length exceeds permitted limit.'} as CreateAuthHeaderForProfilePhotoOutput;
      }
      var blobName = nanoid();
      var requestDate = new Date().toUTCString();
      var authHeader = new BlobStorage().generateSharedKey(blobName, args.input.contentLength, requestDate ,args.input.contentType);
      return {success:true, authHeader:authHeader, requestDate:requestDate, blobName:blobName} as CreateAuthHeaderForProfilePhotoOutput;
    }
    */
  },
};

export default user;
