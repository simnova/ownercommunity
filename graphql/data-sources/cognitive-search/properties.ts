/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';
import { FilterDetail, PropertiesSearchInput } from '../../generated';

const PropertyFilterNames = {
  Bedrooms: 'bedrooms',
  Bathrooms: 'bathrooms',
  Type: 'type',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities',
  Price: 'price',
  SquareFeet: 'squareFeet',
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
        filterStrings.push(`${PropertyFilterNames.SquareFeet} ge ${filter.listingDetail.squareFeets[0]} and ${PropertyFilterNames.SquareFeet} le ${filter.listingDetail.squareFeets[1]}`);
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
        filterStrings.push(listedInfoFilterStrings.join(' or '));
      }

      // distance, lat and long
      if (filter.position && filter.distance) {
        filterStrings.push(`geo.distance(position, geography'POINT(${filter.position.longitude} ${filter.position.latitude})') le ${filter.distance}`);
      }
    }

    console.log('filterStrings: ', filterStrings);

    return filterStrings.join(' and ');
  }

  private toggleNullResults(options: any, filterString: string) {
    if (options.hideNullResults) {
      const field = options.orderBy[0].split(' ')[0];
      filterString += filterString.length > 0 ? `and ${field} ne null` : `${field} ne null`
    }
    return filterString;
  }

  async propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    let searchString = '';
    if (!input.options.filter?.position) {
      searchString = input.searchString;
    }

    console.log(`Resolver>Query>propertiesSearch: ${searchString}`);
    let filterString = this.getFilterString(input.options.filter);
    if (input.options.orderBy[0] !== '') filterString = this.toggleNullResults(input.options, filterString);
    console.log('filterString: ', filterString);

    const searchResults = await searchService.search('property-listings', searchString, {
      queryType: 'full',
      searchMode: 'all',
      includeTotalCount: true,
      filter: filterString, // `search.in(type, 'condo,townhouse',',') and bedrooms ge 2`,
      facets: input.options.facets, // ['type'],
      top: input.options.top, // 10, 15, 20
      skip: input.options.skip, // 0, skip += top
      orderBy: input.options.orderBy, // 'price', 'squareFeet', 'bedrooms', 'bathrooms'
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
