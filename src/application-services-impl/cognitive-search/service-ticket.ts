import { FacetDetail, SearchDocumentsResult } from '../../app/application-services/cognitive-search/_base.interface';
import { ServiceTicketsSearchFilterDetail, ServiceTicketsSearchInput, ServiceTicketsSearchResult } from '../../app/application-services/cognitive-search/service-ticket.interface';
import { AppContext } from '../../app/app-context';
import { CognitiveSearchApplicationServiceImpl } from './_cognitive-search.application-service';

const ServiceTicketFilterNames = {
  RequestorId: 'requestorId',
  AssignedToId: 'assignedToId',
  Status: 'status',
  Priority: 'priority',
};

export class ServiceTicketCognitiveSearchApplicationServiceImpl extends CognitiveSearchApplicationServiceImpl<AppContext> {

  private getFilterString(filter: ServiceTicketsSearchFilterDetail, requestorId: string): string {
    let filterStrings = [];
    filterStrings.push(`(requestorId eq '${requestorId}')`);
    if (filter) {
      // requestor
      if (filter.requestorId && filter.requestorId.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.RequestorId}, '${filter.requestorId.join(',')}',',')`);
      }
      // assignedTo
      if (filter.assignedToId && filter.assignedToId.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.AssignedToId}, '${filter.assignedToId.join(',')}',',')`);
      }
      // status
      if (filter.status && filter.status.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.Status}, '${filter.status.join(',')}',',')`);
      }
      // priority (number)
      if (filter.priority && filter.priority.length > 0) {
        let priorityFilter = [];
        filter.priority.forEach((priority) => {
          priorityFilter.push(`${ServiceTicketFilterNames.Priority} eq ${priority}`);
        });
        filterStrings.push(`(${priorityFilter.join(' or ')})`);
      }
    }

    return filterStrings.join(' and ');
  }

  async serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>> {

    let searchString = input.searchString.trim();

    console.log(`Resolver>Query>serviceTicketsSearch: ${searchString}`);
    let filterString = this.getFilterString(input.options.filter, requestorId);
    console.log('filterString: ', filterString);

    let searchResults: SearchDocumentsResult<Pick<unknown, never>>;
    await this.withSearch(async (_passport, search) => {
      searchResults = await search.search('service-ticket-index', searchString, {
        queryType: 'full',
        searchMode: 'all',
        includeTotalCount: true,
        filter: filterString,
        facets: input.options.facets,
        top: input.options.top,
        skip: input.options.skip,
        orderBy: input.options.orderBy,
      });
    });
    
    console.log(`Resolver>Query>serviceTicketsSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }

  async getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult> {
    let results = [];
    for await (const result of searchResults?.results ?? []) {
      results.push(result.document);
    }

    return {
      serviceTicketsResults: results,
      count: searchResults?.count,
      facets: {
        requestor: searchResults?.facets?.requestor as FacetDetail,
        assignedTo: searchResults?.facets?.assignedTo as FacetDetail[],
        priority: searchResults?.facets?.priority as FacetDetail,
        status: searchResults?.facets?.status as FacetDetail,
        requestorId: searchResults?.facets?.requestorId as FacetDetail,
        assignedToId: searchResults?.facets?.assignedToId as FacetDetail,
      },
    };
  }
}
