/** @format */

import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { CognitiveSearchDataSource } from './cognitive-search-data-source';
import { Context } from '../../context';
import { SearchDocumentsResult } from '@azure/search-documents';
import { ServiceTicketsSearchFilterDetail, ServiceTicketsSearchInput } from '../../generated';

const ServiceTicketFilterNames = {
  Requestor: 'requestor',
  AssignedTo: 'assignedTo',
  Status: 'status',
  Priority: 'priority',
};
export class ServiceTickets extends CognitiveSearchDataSource<Context> {
  private getFilterString(filter: ServiceTicketsSearchFilterDetail): string {
    let filterStrings = [];
    if (filter) {
      // requestor
      if (filter.requestor && filter.requestor.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.Requestor}, '${filter.requestor.join(',')}',',')`);
      }
      // assignedTo
      if (filter.assignedTo && filter.assignedTo.length > 0) {
        filterStrings.push(`search.in(${ServiceTicketFilterNames.AssignedTo}, '${filter.assignedTo.join(',')}',',')`);
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

  async serviceTicketsSearch(input: ServiceTicketsSearchInput): Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    const searchService = new CognitiveSearch();

    let searchString = input.searchString;

    console.log(`Resolver>Query>serviceTicketsSearch: ${searchString}`);
    let filterString = this.getFilterString(input.options.filter);
    console.log('filterString: ', filterString);

    const searchResults = await searchService.search('service-ticket-index', searchString, {
      queryType: 'full',
      searchMode: 'all',
      includeTotalCount: true,
      filter: filterString,
      facets: input.options.facets,
    });

    console.log(`Resolver>Query>serviceTicketsSearch ${JSON.stringify(searchResults)}`);
    return searchResults;
  }
}
