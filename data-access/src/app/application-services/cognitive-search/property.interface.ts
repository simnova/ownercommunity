import { PropertiesSearchInput, PropertySearchResult } from "../../external-dependencies/graphql-api";
import { SearchDocumentsResult } from '../../../../seedwork/services-seedwork-cognitive-search-interfaces';

export interface PropertyCognitiveSearchApplicationService {
  propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getPropertiesSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>, input: PropertiesSearchInput): Promise<PropertySearchResult>;
}