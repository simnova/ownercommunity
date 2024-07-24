import { ServiceTicketsSearchFilterDetail, ServiceTicketsSearchInput, ServiceTicketsSearchResult } from "../../../external-dependencies/graphql-api";
import { SearchDocumentsResult } from '../../../../../seedwork/services-seedwork-cognitive-search-interfaces';
import { CognitiveSearchDataSource } from "../../../data-sources/cognitive-search-data-source";
import { AppContext } from "../../../init/app-context-builder";

export interface ServiceTicketSearchApi {
  serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  serviceTicketsSearchAdmin(input: ServiceTicketsSearchInput, communityId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult>;
}

const ServiceTicketFilterNames = {
  RequestorId: 'requestorId',
  AssignedToId: 'assignedToId',
  Status: 'status',
  Priority: 'priority',
  CommunityId: 'communityId',
};
export class ServiceTicketSearchApiImpl extends CognitiveSearchDataSource<AppContext> implements ServiceTicketSearchApi {
  private getFilterString(filter: ServiceTicketsSearchFilterDetail, memberId: string): string {
    let filterStrings = [];
    filterStrings.push(`(requestorId eq '${memberId}') or (assignedToId eq '${memberId}')`);
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

  private getFilterStringAdmin(filter: ServiceTicketsSearchFilterDetail, communityId: string): string {
    let filterStrings = [];
    filterStrings.push(`(communityId eq '${communityId}')`);
    if (filter) {
      // community
      if (filter.communityId && filter.communityId.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.CommunityId}, '${filter.communityId.join(',')}',',')`);
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

  async serviceTicketsSearch(input: ServiceTicketsSearchInput, memberId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    let searchString = input.searchString.trim();

    console.log(`Resolver>Query>serviceTicketsSearch: ${searchString}`);
    let filterString = this.getFilterString(input.options.filter, memberId);
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

  async serviceTicketsSearchAdmin(input: ServiceTicketsSearchInput, communityId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    let searchString = '';
    if (input !== null) {
      searchString = input.searchString.trim();
    }

    console.log(`Resolver>Query>serviceTicketsSearchAdmin: ${searchString}`);
    let filterString = this.getFilterStringAdmin(input ? input.options.filter : null, communityId);
    console.log('filterString: ', filterString);

    let searchResults: SearchDocumentsResult<Pick<unknown, never>>;
    await this.withSearch(async (_passport, search) => {
      searchResults = await search.search('service-ticket-index', searchString, {
        queryType: 'full',
        searchMode: 'all',
        includeTotalCount: true,
        filter: filterString,
      });
    });

    console.log(`Resolver>Query>serviceTicketsSearchAdmin ${JSON.stringify(searchResults)}`);
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
        requestor: searchResults?.facets?.requestor,
        assignedTo: searchResults?.facets?.assignedTo,
        priority: searchResults?.facets?.priority,
        status: searchResults?.facets?.status,
        requestorId: searchResults?.facets?.requestorId,
        assignedToId: searchResults?.facets?.assignedToId,
      },
    };
  }
}
