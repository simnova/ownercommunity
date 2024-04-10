import { SearchDocumentsResult } from "../../external-dependencies/cognitive-search";
import { PropertiesSearchInput, PropertySearchResult } from "../../external-dependencies/graphql-api";

export interface PropertyCognitiveSearchApplicationService {
  propertiesSearch(input: PropertiesSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getPropertiesSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>, input: PropertiesSearchInput): Promise<PropertySearchResult>;
}