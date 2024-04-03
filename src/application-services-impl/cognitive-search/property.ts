import { AppContext } from '../../app/app-context';
import dayjs from 'dayjs';
import { CognitiveSearchApplicationServiceImpl } from './_cognitive-search.application-service';
import { FilterDetail, PropertiesSearchInput, PropertySearchResult } from '../../app/application-services/cognitive-search/property.interface';
import { SearchDocumentsResult } from '../../app/application-services/cognitive-search/_base.interface';

const PropertyFilterNames = {
  Bedrooms: 'bedrooms',
  Bathrooms: 'bathrooms',
  Type: 'type',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities',
  Price: 'price',
  SquareFeet: 'squareFeet',
  Tags: 'tags',
};
export class PropertyCognitiveSearchApplicationServiceImpl extends CognitiveSearchApplicationServiceImpl<AppContext> {

  private getFilterString(filter: FilterDetail): string {
    let filterStrings = [];

    // only show properties in the current community
    filterStrings.push(`communityId eq '${filter.communityId}'`);

    if (filter) {
      // property type
      if (filter.propertyType && filter.propertyType.length > 0) {
        filterStrings.push(`search.in(${PropertyFilterNames.Type}, '${filter.propertyType.join(',')}',',')`);
      }
      // bedrooms
      if (filter.listingDetail?.bedrooms) {
        filterStrings.push(`${PropertyFilterNames.Bedrooms} ge ${filter.listingDetail.bedrooms}`);
      }
      // bathrooms
      if (filter.listingDetail?.bathrooms) {
        filterStrings.push(`${PropertyFilterNames.Bathrooms} ge ${filter.listingDetail.bathrooms}`);
      }
      // amenities
      if (filter.listingDetail?.amenities && filter.listingDetail.amenities.length > 0) {
        filterStrings.push("amenities/any(a: a eq '" + filter.listingDetail.amenities.join("') and amenities/any(a: a eq '") + "')");
      }
      // additional amenities
      if (filter.listingDetail?.additionalAmenities && filter.listingDetail.additionalAmenities.length > 0) {
        const additionalAmenitiesFilterStrings = filter.listingDetail.additionalAmenities.map((additionalAmenity) => {
          return `additionalAmenities/any(ad: ad/category eq '${additionalAmenity.category}' and ad/amenities/any(am: am eq '${additionalAmenity.amenities.join(
            "') and ad/amenities/any(am: am eq '"
          )}'))`;
        });
        filterStrings.push(additionalAmenitiesFilterStrings.join(' and '));
      }
      // price
      if (filter.listingDetail?.prices && filter.listingDetail.prices.length > 0) {
        filterStrings.push(`${PropertyFilterNames.Price} ge ${filter.listingDetail.prices[0]} and ${PropertyFilterNames.Price} le ${filter.listingDetail.prices[1]}`);
      }
      // squareFeet
      if (filter.listingDetail?.squareFeets && filter.listingDetail.squareFeets.length > 0) {
        filterStrings.push(
          `${PropertyFilterNames.SquareFeet} ge ${filter.listingDetail.squareFeets[0]} and ${PropertyFilterNames.SquareFeet} le ${filter.listingDetail.squareFeets[1]}`
        );
      }
      // listed info (listedForSale, listedForRent, listedForLease)
      if (filter.listedInfo && filter.listedInfo.length > 0) {
        let listedInfoFilterStrings = [];
        if (filter.listedInfo.includes('listedForSale')) {
          listedInfoFilterStrings.push('listedForSale eq true');
        }
        if (filter.listedInfo.includes('listedForRent')) {
          listedInfoFilterStrings.push('listedForRent eq true');
        }
        if (filter.listedInfo.includes('listedForLease')) {
          listedInfoFilterStrings.push('listedForLease eq true');
        }
        filterStrings.push('(' + listedInfoFilterStrings.join(' or ') + ')');
      }

      // distance, lat and long
      if (filter.position && filter.distance !== undefined) {
        filterStrings.push(`geo.distance(position, geography'POINT(${filter.position.longitude} ${filter.position.latitude})') le ${filter.distance}`);
      }

      // update at
      if (filter.updatedAt) {
        const day0 = dayjs().subtract(parseInt(filter.updatedAt), 'day').toISOString();
        filterStrings.push(`updatedAt ge ${day0}`);
      }

      // created at
      if (filter.createdAt) {
        const day0 = dayjs().subtract(parseInt(filter.createdAt), 'day').toISOString();
        filterStrings.push(`createdAt ge ${day0}`);
      }

      // tags
      if (filter.tags && filter.tags.length > 0) {
        filterStrings.push("(tags/any(a: a eq '" + filter.tags.join("') or tags/any(a: a eq '") + "'))");
      }
    }

    console.log('filterStrings: ', filterStrings.join(' and '));

    return filterStrings.join(' and ');
  }

  private toggleNullResults(options: any, filterString: string) {
    if (options.hideNullResults) {
      const field = options.orderBy[0].split(' ')[0];
      filterString += filterString.length > 0 ? `and ${field} ne null` : `${field} ne null`;
    }
    return filterString;
  }

  async propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    let searchString = '';
    if (!input.options.filter?.position) {
      searchString = input.searchString.trim();
    }

    console.log(`Resolver>Query>propertiesSearch: ${searchString}`);
    let filterString = this.getFilterString(input.options.filter);
    console.log('filterString: ', filterString);

    let searchResults: SearchDocumentsResult<Pick<unknown, never>>;
    await this.withSearch(async (_passport, searchService) => {
      searchResults = await searchService.search('property-listings', searchString, {
        queryType: 'full',
        searchMode: 'all',
        includeTotalCount: true,
        filter: filterString, // `search.in(type, 'condo,townhouse',',') and bedrooms ge 2`,
        facets: input.options.facets, // ['type'],
        top: input.options.top, // 10, 15, 20
        skip: input.options.skip, // 0, skip += top
        orderBy: input.options.orderBy, // 'price', 'squareFeet', 'bedrooms', 'bathrooms'
      });
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }

  async getPropertiesSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>, input: PropertiesSearchInput): Promise<PropertySearchResult> {
    let results = [];
    for await (const result of searchResults?.results ?? []) {
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
    
          let periodInput = parseInt(input?.options?.filter?.updatedAt); // in days
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
    
          periodInput = parseInt(input.options?.filter?.createdAt); // in days
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
  }
}
