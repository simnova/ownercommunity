/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';

export interface SearchInput {
  searchString: string;
  options: {
    filters: string[];
    facets: string[];
  };
}
export class Properties extends CognitiveSearchDataSource<Context> {
  async propertiesSearch(input: SearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    console.log(`Resolver>Query>propertiesSearch ${input.searchString}`);
    let filterString = input.options.filters.join(',');
    filterString = filterString ? `search.in(type, '${filterString}',',')` : '';
    const searchResults = await searchService.search('property-listings', input.searchString.trim(), {
      queryType: 'full',
      searchMode: 'all',
      filter: filterString, // `search.in(type, 'condo,townhouse',',') and search.in(bedrooms, '2,3,4',',')`,
      facets: input.options.facets, // ['type'],
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
