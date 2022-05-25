/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';

export interface FilterDetails {
  fieldName: string;
  fieldValues: string[];
}
export interface SearchInput {
  searchString: string;
  options: {
    filters: FilterDetails[];
    facets: string[];
  };
}

const PropertyFilterNames = {
  Bedrooms: 'bedrooms',
  Type: 'type',
};
export class Properties extends CognitiveSearchDataSource<Context> {
  private getFilterString(filters: FilterDetails[]): string {
    const filterQueries = filters.map((filter) => {
      if (filter.fieldName === PropertyFilterNames.Bedrooms) {
        return `${PropertyFilterNames.Bedrooms} ge ${filter.fieldValues[0]}`;
      }
      return `search.in(${filter.fieldName}, '${filter.fieldValues.join(',')}',',')`;
    });

    return filterQueries.join(' and ');
  }

  async propertiesSearch(input: SearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    console.log(`Resolver>Query>propertiesSearch ${input.searchString}`);
    let filterString = this.getFilterString(input.options.filters);
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
