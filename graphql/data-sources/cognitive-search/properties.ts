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
};
export class Properties extends CognitiveSearchDataSource<Context> {
  private getFilterString(filter: FilterDetail): string {
    let filterStrings = [];
    if (filter) {
      if (filter.propertyType && filter.propertyType.length > 0) {
        filterStrings.push(`search.in(${PropertyFilterNames.Type}, '${filter.propertyType.join(',')}',',')`);
      }
      if (filter.listingDetail?.bedrooms) {
        filterStrings.push(`${PropertyFilterNames.Bedrooms} ge ${filter.listingDetail.bedrooms}`);
      }
      if (filter.listingDetail?.amenities && filter.listingDetail.amenities.length > 0) {
        filterStrings.push("amenities/any(a: a eq '" + filter.listingDetail.amenities.join("') and amenities/any(a: a eq '") + "')");
      }
      // if (filter.listingDetail.additionalAmenities) {
      //   filterStrings.push("additionalAmenities/any(a: a/category eq '" + filter.listingDetail.additionalAmenities.join("') and additionalAmenities/any(a: a/amenities eq '") + "')");
      // }
    }

    return filterStrings.join(' and ');

    // const filterQueries = filters.map((filter) => {
    //   if (filter.fieldName === PropertyFilterNames.Bedrooms) {
    //     return `${PropertyFilterNames.Bedrooms} ge ${filter.fieldValues[0]}`;
    //   }
    //   if (filter.fieldName === PropertyFilterNames.Amenities) {
    //     return "amenities/any(t: t eq '" + filter.fieldValues?.join("') and amenities/any(t: t eq '") + "')";
    //   }
    //   return `search.in(${filter.fieldName}, '${filter.fieldValues.join(',')}',',')`;
    // });

    // return filterQueries.join(' and ');
  }

  async propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    console.log(`Resolver>Query>propertiesSearch ${input.searchString}`);
    let filterString = this.getFilterString(input.options.filter);
    console.log('filterString: ', filterString);
    const searchResults = await searchService.search('property-listings', input.searchString.trim(), {
      queryType: 'full',
      searchMode: 'all',
      filter: filterString, // `search.in(type, 'condo,townhouse',',') and bedrooms ge 2`,
      facets: input.options.facets, // ['type'],
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
