/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';
import { FilterDetail, PropertiesSearchInput } from '../../generated';

const PropertyFilterNames = {
  Bedrooms: 'bedrooms',
  Type: 'type',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities',
  Price: 'price',
};
export class Properties extends CognitiveSearchDataSource<Context> {
  private getFilterString(filter: FilterDetail): string {
    let filterStrings = [];
    if (filter) {
      // property type
      if (filter.propertyType && filter.propertyType.length > 0) {
        filterStrings.push(`search.in(${PropertyFilterNames.Type}, '${filter.propertyType.join(',')}',',')`);
      }
      // bedrooms
      if (filter.listingDetail?.bedrooms) {
        filterStrings.push(`${PropertyFilterNames.Bedrooms} ge ${filter.listingDetail.bedrooms}`);
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
      if (filter.listingDetail?.prices) {
        filterStrings.push(`${PropertyFilterNames.Price} ge ${filter.listingDetail.prices[0]} and ${PropertyFilterNames.Price} le ${filter.listingDetail.prices[1]}`);
      }
    }

    return filterStrings.join(' and ');
  }

  async propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    console.log(`Resolver>Query>propertiesSearch ${input.searchString}`);
    let filterString = this.getFilterString(input.options.filter);
    console.log('filterString: ', filterString);
    const searchResults = await searchService.search('property-listings', input.searchString.trim(), {
      queryType: 'full',
      searchMode: 'all',
      includeTotalCount: true,
      filter: filterString, // `search.in(type, 'condo,townhouse',',') and bedrooms ge 2`,
      facets: input.options.facets, // ['type'],
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
