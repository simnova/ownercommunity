/** @format */

import { Resolvers, Community, Member, Property, PropertyMutationResult, PropertySearchResult, PropertiesSearchInput, PropertyUpdateInput } from '../../generated';
import { isValidObjectId } from 'mongoose';
import { Property as PropertyDo } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { getMemberForCurrentUser } from '../resolver-helper';
import { ContentModeratorClientContext } from '@azure/cognitiveservices-contentmoderator';
import dayjs from 'dayjs';

const PropertyMutationResolver = async (getProperty: Promise<PropertyDo>): Promise<PropertyMutationResult> => {
  try {
    const temp = {
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
    mapSASToken: async (parent, args, context) => {
      return await context.dataSources.propertyMapApi.getSasToken();
    },
    community: async (parent, args, context, info) => {
      if (parent.community && isValidObjectId(parent.community.toString())) {
        return (await context.dataSources.communityCosmosdbApi.findOneById(parent.community.toString())) as Community;
      }
      return parent.community;
    },
    owner: async (parent, args, context, info) => {
      if (parent.owner && isValidObjectId(parent.owner.toString())) {
        return (await context.dataSources.memberCosmosdbApi.findOneById(parent.owner.toString())) as Member;
      }
      return parent.owner;
    },
  },
  Query: {
    property: async (_parent, args, context, info) => {
      if (args.id && isValidObjectId(args.id)) {
        return (await context.dataSources.propertyCosmosdbApi.findOneById(args.id)) as Property;
      }
      return null;
    },
    properties: async (_, _args, context) => {
      return (await context.dataSources.propertyCosmosdbApi.getPropertiesByCommunityId(context.community)) as Property[];
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

    propertiesSearch: async (_, _args, context, info) => {
      // info.cacheControl.setCacheHint({ maxAge: 60, scope: CacheScope.Public });
      const searchInput = {
        searchString: _args.input.searchString.trim(),
        options: {
          filter: _args.input?.options?.filter ?? null,
          facets: _args.input?.options?.facets ?? [],
          top: _args.input?.options?.top ?? 10,
          skip: _args.input?.options?.skip ?? 0,
          orderBy: _args.input?.options?.orderBy ?? [],
          hideNullResults: _args.input?.options?.hideNullResults ?? false,
        },
      } as PropertiesSearchInput;

      const searchResults = await context.dataSources.propertySearchApi.propertiesSearch(searchInput);
      let results = [];
      for await (const result of searchResults?.results) {
        results.push(result.document);
      }

      // calculate bedrooms facets
      const bedroomsOptions = [1, 2, 3, 4, 5];
      let bedroomsFacet = bedroomsOptions.map((option) => {
        const found = searchResults?.facets?.bedrooms?.filter((facet) => facet.value >= option);
        let count = 0;
        found.forEach((f) => {
          count += f.count;
        });
        return {
          value: option + '+',
          count: count,
        };
      });

      // calculate bathrooms facets
      const bathroomsOptions = [1, 1.5, 2, 3, 4, 5];
      let bathroomsFacet = bathroomsOptions.map((option) => {
        const found = searchResults?.facets?.bathrooms?.filter((facet) => facet.value >= option);
        let count = 0;
        found.forEach((f) => {
          count += f.count;
        });
        return {
          value: option + '+',
          count: count,
        };
      });

      // calculate update date facets
      const periods = [7, 14, 30, 90];
      const periodTextMaps = {
        7: '1 week ago',
        14: '2 weeks ago',
        30: '1 month ago',
        90: '3 months ago',
      };

      let periodInput = parseInt(_args.input?.options?.filter?.updatedAt); // in days
      let updatedAtFacet = periods.map((option) => {
        const day0 = option === periodInput ? dayjs().subtract(periodInput, 'day') : dayjs().subtract(option, 'day');
        const found = searchResults?.facets?.updatedAt?.filter((facet) => {
          let temp = dayjs(facet.value).diff(day0, 'day', true);
          return temp >= 0;
        });
        let count = 0;
        found.forEach((f) => {
          count += f.count;
        });
        return {
          value: periodTextMaps[option],
          count: count,
        };
      });

      periodInput = parseInt(_args.input?.options?.filter?.createdAt); // in days
      let createdAtFacet = periods.map((option) => {
        const day0 = option === periodInput ? dayjs().subtract(periodInput, 'day') : dayjs().subtract(option, 'day');
        const found = searchResults?.facets?.createdAt?.filter((facet) => {
          let temp = dayjs(facet.value).diff(day0, 'day', true);
          return temp >= 0;
        });
        let count = 0;
        found.forEach((f) => {
          count += f.count;
        });

        return {
          value: periodTextMaps[option],
          count: count,
        };
      });

      return {
        propertyResults: results,
        count: searchResults.count,
        facets: {
          type: searchResults.facets?.type,
          amenities: searchResults.facets?.amenities,
          additionalAmenitiesCategory: searchResults.facets?.['additionalAmenities/category'],
          additionalAmenitiesAmenities: searchResults.facets?.['additionalAmenities/amenities'],
          listedForSale: searchResults.facets?.listedForSale,
          listedForRent: searchResults.facets?.listedForRent,
          listedForLease: searchResults.facets?.listedForLease,
          bedrooms: bedroomsFacet,
          bathrooms: bathroomsFacet,
          updatedAt: updatedAtFacet,
          createdAt: createdAtFacet,
          tags: searchResults.facets?.tags,
        },
      } as PropertySearchResult;
    },
    getMapSasToken: async (_, _args, context) => {
      return await context.dataSources.propertyMapApi.getSasToken();
    },
  },

  Mutation: {
    propertyAdd: async (_, { input }, { dataSources }) => {
      return PropertyMutationResolver(dataSources.propertyDomainAPI.propertyAdd(input));
    },
    propertyUpdate: async (_, { input }, { dataSources }) => {
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
      var result = await context.dataSources.propertyBlobAPI.propertyListingImageCreateAuthHeader(input.propertyId, member.id, input.contentType, input.contentLength);
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
      var result = await context.dataSources.propertyBlobAPI.propertyFloorPlanImageCreateAuthHeader(input.propertyId, member.id, input.contentType, input.contentLength);
      if (result.status.success) {
        let propertyDbObj = (await (await context.dataSources.propertyCosmosdbApi.findOneById(input.propertyId)).populate('owner')) as PropertyUpdateInput;
        propertyDbObj.listingDetail.images.push(result.authHeader.blobName);
        result.property = (await context.dataSources.propertyDomainAPI.propertyUpdate(propertyDbObj)) as Property;
      }
      console.log(`propertyFloorPlanImageCreateAuthHeader: ${JSON.stringify(result)}`);
      return result;
    },
  },
};

export default property;
