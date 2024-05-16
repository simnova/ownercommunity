import { ServiceTicketsSearchInput, ServiceTicketsSearchResult } from "../../external-dependencies/graphql-api";
import { SearchDocumentsResult } from '../../../../seedwork/services-seedwork-cognitive-search-interfaces';

export interface ServiceTicketCognitiveSearchApplicationService {
  serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  serviceTicketsSearchAdmin(input: ServiceTicketsSearchInput, communityId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult>;
}