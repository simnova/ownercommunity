import { SearchDocumentsResult } from "../../external-dependencies/cognitive-search";
import { ServiceTicketsSearchInput, ServiceTicketsSearchResult } from "../../external-dependencies/graphql-api";

export interface ServiceTicketCognitiveSearchApplicationService {
  serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult>;
}