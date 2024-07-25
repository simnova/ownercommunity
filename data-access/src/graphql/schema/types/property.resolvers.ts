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
    mapSASToken: async (_parent, _args, {applicationServices}, _info) => {
      return await applicationServices.property.mapApi.getSasToken();
    },
    community: async (parent, _args, {applicationServices}, _info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await applicationServices.community.dataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, _args, {applicationServices}, _info) => {
      if (parent.owner && isValidObjectId(parent.owner.toString())) {
        return (await applicationServices.member.dataApi.getMemberById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    },
  },
  Query: {
    property: async (_parent, args, {applicationServices}, _info) => {
      if (args.id && isValidObjectId(args.id)) {
        return (await applicationServices.property.dataApi.getPropertyById(args.id)) as Property;
      }
      return null;
    },
    properties: async (_parent, _args, {applicationServices,communityId}, _info) => {
      return (await applicationServices.property.dataApi.getPropertiesByCommunityId(communityId)) as Property[];
    },
    propertiesByCommunityId: async (_, { communityId }, context) => {
      return (await context.applicationServices.property.dataApi.getPropertiesByCommunityId(communityId)) as Property[];
    },
    propertiesForCurrentUserByCommunityId: async (_, _args, context) => {
      const user = await context.applicationServices.user.dataApi.getUserByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.applicationServices.property.dataApi.getPropertiesForCurrentUserByCommunityId(context.communityId, user.id)) as Property[];
    },
    getAllPropertyTags: async (_, _args, context) => {
      const properties = (await context.applicationServices.property.dataApi.getAllProperties()) as Property[];
      const tags = properties.map((p) => p.tags).flat();
      return [...new Set(tags)];
    },

    propertiesSearch: async (_, { input }, context, info) => {
      const searchResults = await context.applicationServices.property.searchApi.propertiesSearch(input);
      return await context.applicationServices.property.searchApi.getPropertiesSearchResults(searchResults, input);
    },
    getMapSasToken: async (_, _args, {applicationServices}) => {
      return await applicationServices.property.mapApi.getSasToken();
    },
  },

  Mutation: {
    propertyAdd: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.property.domainApi.propertyAdd(input));
    },
    propertyUpdate: async (_, { input }, { applicationServices }) => {
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


      return PropertyMutationResolver(applicationServices.property.domainApi.propertyUpdate(input));
    },
    propertyDelete: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.property.domainApi.propertyDelete(input));
    },
    propertyAssignOwner: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.property.domainApi.propertyAssignOwner(input));
    },
    propertyRemoveOwner: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.property.domainApi.propertyRemoveOwner(input));
    },
    propertyListingImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context);
      const result = await context.applicationServices.property.blobApi.propertyListingImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = await context.applicationServices.property.dataApi.getPropertyByIdWithCommunityOwner(input.propertyId) as PropertyUpdateInput;
        propertyDbObj.listingDetail.images.push(result.authHeader.blobName);
        result.property = (await context.applicationServices.property.domainApi.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyListingImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyFloorPlanImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context);
      const result = await context.applicationServices.property.blobApi.propertyFloorPlanImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = await context.applicationServices.property.dataApi.getPropertyByIdWithCommunityOwner(input.propertyId) as PropertyUpdateInput;
        propertyDbObj.listingDetail.floorPlanImages.push(result.authHeader.blobName);
        result.property = (await context.applicationServices.property.domainApi.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyFloorPlanImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyListingImageRemove: async (_, { input }, { applicationServices }) => {
      const result = {
        status: await applicationServices.property.blobApi.propertyListingImageRemove(input.propertyId, input.memberId, input.blobName),
      } as PropertyMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return PropertyMutationResolver(applicationServices.property.domainApi.propertyImageRemove(input.propertyId, input.blobName));
      }
    }
  },
};

export default property;
