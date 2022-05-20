/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { Property, PropertySearchResult } from '../../generated';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';

export class Properties extends CognitiveSearchDataSource<Context> {
  async propertiesSearch(searchString: string): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    console.log(`Resolver>Query>propertiesSearch ${searchString}`);
    const searchResults = await searchService.search('property-listings', searchString.trim() + '*', {
      queryType: 'full',
      searchMode: 'all',
      // filter: tagFilter, // ???: don't understand
      facets: [], // ???: don't understand
    });

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
