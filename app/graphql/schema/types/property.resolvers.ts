import { Resolvers, Community, Member, Property, PropertyMutationResult, PropertyUpdateInput } from '../builder/generated';
import { isValidObjectId } from 'mongoose';
import { Property as PropertyDo } from '../../../infrastructure-services-impl/datastore/mongodb/models/property';
import { getMemberForCurrentUser } from '../resolver-helper';
import { trace } from "@opentelemetry/api";

const PropertyMutationResolver = async (getProperty: Promise<PropertyDo>): Promise<PropertyMutationResult> => {
  try {
    const temp: PropertyMutationResult = {
      status: { success: true },
      property: await getProperty,
    } as PropertyMutationResult;
    console.log(temp);
    return temp;
  } catch (error) {
    console.error('Property > Mutation  : ', error);
    return {
      status: { success: false, errorMessage: error.message },
      property: null,
    } as PropertyMutationResult;
  }
};

const property: Resolvers = {
  Property: {
    mapSASToken: async (_parent, _args, {dataSources}, _info) => {
      return await dataSources.propertyMapApi.getSasToken();
    },
    community: async (parent, _args, {dataSources}, _info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await dataSources.communityCosmosdbApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, _args, {dataSources}, _info) => {
      if (parent.owner && isValidObjectId(parent.owner.toString())) {
        return (await dataSources.memberCosmosdbApi.findOneById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    },
  },
  Query: {
    property: async (_parent, args, {dataSources}, _info) => {
      if (args.id && isValidObjectId(args.id)) {
        return (await dataSources.propertyCosmosdbApi.findOneById(args.id)) as Property;
      }
      return null;
    },
    properties: async (_parent, _args, {dataSources,community}, _info) => {
      return (await dataSources.propertyCosmosdbApi.getPropertiesByCommunityId(community)) as Property[];
    },
    propertiesByCommunityId: async (_, { communityId }, context) => {
      return (await context.dataSources.propertyCosmosdbApi.getPropertiesByCommunityId(communityId)) as Property[];
    },
    propertiesForCurrentUserByCommunityId: async (_, _args, context) => {
      const user = await context.dataSources.userCosmosdbApi.getByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.dataSources.propertyCosmosdbApi.getPropertiesForCurrentUserByCommunityId(context.community, user.id)) as Property[];
    },
    getAllPropertyTags: async (_, _args, context) => {
      const properties = (await context.dataSources.propertyCosmosdbApi.getAllProperties()) as Property[];
      const tags = properties.map((p) => p.tags).flat();
      return [...new Set(tags)];
    },

    propertiesSearch: async (_, { input }, context, info) => {
      const searchResults = await context.dataSources.propertySearchApi.propertiesSearch(input);
      return await context.dataSources.propertySearchApi.getPropertiesSearchResults(searchResults, input);
    },
    getMapSasToken: async (_, _args, {dataSources}) => {
      return await dataSources.propertyMapApi.getSasToken();
    },
  },

  Mutation: {
    propertyAdd: async (_, { input }, { dataSources }) => {
      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyAdd(input));
    },
    propertyUpdate: async (_, { input }, { dataSources }) => {
    let spanId = trace.getActiveSpan().spanContext().spanId;
    let traceId = trace.getActiveSpan().spanContext().traceId;
    let traceFlags = trace.getActiveSpan().spanContext().traceFlags;
    let traceState = trace.getActiveSpan().spanContext().traceState;
    
    let isRemote = trace.getActiveSpan().spanContext().isRemote;
    
    console.log(`spanId: ${spanId}`);
    console.log(`traceId: ${traceId}`);
    console.log(`traceFlags: ${traceFlags}`);
    console.log(`traceState: ${traceState}`);
    console.log(`isRemote: ${isRemote}`);


      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyUpdate(input));
    },
    propertyDelete: async (_, { input }, { dataSources }) => {
      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyDelete(input));
    },
    propertyAssignOwner: async (_, { input }, { dataSources }) => {
      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyAssignOwner(input));
    },
    propertyRemoveOwner: async (_, { input }, { dataSources }) => {
      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyRemoveOwner(input));
    },
    propertyListingImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      const result = await context.dataSources.propertyBlobAPI.propertyListingImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = (await (await context.dataSources.propertyCosmosdbApi.findOneById(input.propertyId)).populate('owner')) as PropertyUpdateInput;
        propertyDbObj.listingDetail.images.push(result.authHeader.blobName);
        result.property = (await context.dataSources.propertyDomainAPI.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyListingImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyFloorPlanImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context, context.community);
      const result = await context.dataSources.propertyBlobAPI.propertyFloorPlanImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = (await (await context.dataSources.propertyCosmosdbApi.findOneById(input.propertyId)).populate('owner')) as PropertyUpdateInput;
        propertyDbObj.listingDetail.floorPlanImages.push(result.authHeader.blobName);
        result.property = (await context.dataSources.propertyDomainAPI.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyFloorPlanImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyListingImageRemove: async (_, { input }, { dataSources }) => {
      const result = {
        status: await dataSources.propertyBlobAPI.propertyListingImageRemove(input.propertyId, input.memberId, input.blobName),
      } as PropertyMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyImageRemove(input.propertyId, input.blobName));
      }
    }
  },
};

export default property;
