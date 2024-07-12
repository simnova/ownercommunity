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
      return await applicationServices.propertyMapApi.getSasToken();
    },
    community: async (parent, _args, {applicationServices}, _info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await applicationServices.communityDataApi.getCommunityById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, _args, {applicationServices}, _info) => {
      if (parent.owner && isValidObjectId(parent.owner.toString())) {
        return (await applicationServices.memberDataApi.getMemberById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    },
  },
  Query: {
    property: async (_parent, args, {applicationServices}, _info) => {
      if (args.id && isValidObjectId(args.id)) {
        return (await applicationServices.propertyDataApi.getPropertyById(args.id)) as Property;
      }
      return null;
    },
    properties: async (_parent, _args, {applicationServices,communityId}, _info) => {
      return (await applicationServices.propertyDataApi.getPropertiesByCommunityId(communityId)) as Property[];
    },
    propertiesByCommunityId: async (_, { communityId }, context) => {
      return (await context.applicationServices.propertyDataApi.getPropertiesByCommunityId(communityId)) as Property[];
    },
    propertiesForCurrentUserByCommunityId: async (_, _args, context) => {
      const user = await context.applicationServices.userDataApi.getUserByExternalId(context.verifiedUser.verifiedJWT.sub);
      return (await context.applicationServices.propertyDataApi.getPropertiesForCurrentUserByCommunityId(context.communityId, user.id)) as Property[];
    },
    getAllPropertyTags: async (_, _args, context) => {
      const properties = (await context.applicationServices.propertyDataApi.getAllProperties()) as Property[];
      const tags = properties.map((p) => p.tags).flat();
      return [...new Set(tags)];
    },

    propertiesSearch: async (_, { input }, context, info) => {
      const searchResults = await context.applicationServices.propertySearchApi.propertiesSearch(input);
      return await context.applicationServices.propertySearchApi.getPropertiesSearchResults(searchResults, input);
    },
    getMapSasToken: async (_, _args, {applicationServices}) => {
      return await applicationServices.propertyMapApi.getSasToken();
    },
  },

  Mutation: {
    propertyAdd: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyAdd(input));
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


      return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyUpdate(input));
    },
    propertyDelete: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyDelete(input));
    },
    propertyAssignOwner: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyAssignOwner(input));
    },
    propertyRemoveOwner: async (_, { input }, { applicationServices }) => {
      return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyRemoveOwner(input));
    },
    propertyListingImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context);
      const result = await context.applicationServices.propertyBlobApi.propertyListingImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = await context.applicationServices.propertyDataApi.getPropertyByIdWithCommunityOwner(input.propertyId) as PropertyUpdateInput;
        propertyDbObj.listingDetail.images.push(result.authHeader.blobName);
        result.property = (await context.applicationServices.propertyDomainApi.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyListingImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyFloorPlanImageCreateAuthHeader: async (_, { input }, context) => {
      const member = await getMemberForCurrentUser(context);
      const result = await context.applicationServices.propertyBlobApi.propertyFloorPlanImageCreateAuthHeader(input.propertyId, input.fileName, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = await context.applicationServices.propertyDataApi.getPropertyByIdWithCommunityOwner(input.propertyId) as PropertyUpdateInput;
        propertyDbObj.listingDetail.floorPlanImages.push(result.authHeader.blobName);
        result.property = (await context.applicationServices.propertyDomainApi.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyFloorPlanImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
    propertyListingImageRemove: async (_, { input }, { applicationServices }) => {
      const result = {
        status: await applicationServices.propertyBlobApi.propertyListingImageRemove(input.propertyId, input.memberId, input.blobName),
      } as PropertyMutationResult;

      if (!result.status.success) {
        return result;
      } else {
        return PropertyMutationResolver(applicationServices.propertyDomainApi.propertyImageRemove(input.propertyId, input.blobName));
      }
    }
  },
};

export default property;
