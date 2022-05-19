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
    const searchResults = await searchService.search(
      'properties', // ???: not sure if this is "property" or "properties"
      searchString.trim() + '*',
      {
        queryType: 'full',
        searchMode: 'all',
        // filter: tagFilter, // ???: don't understand
        // facets: ['tags', 'primaryCategory'], // ???: don't understand
      }
    );

    console.log(`Resolver>Query>propertiesSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
