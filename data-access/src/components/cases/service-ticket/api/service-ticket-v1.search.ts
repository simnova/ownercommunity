import dayjs from 'dayjs';
import { SearchDocumentsResult } from '../../../../../../framework/seedwork/services-seedwork-cognitive-search-interfaces';
import { CognitiveSearchDataSource } from '../../../../data-sources/cognitive-search-data-source';
import { ReadOnlyContext } from '../../../../../../framework/domain/domain-execution-context';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../search/service-ticket-search-index-format';
import { ServiceTicketV1UnitOfWork } from '../../../external-dependencies/domain';
import { ServiceTicketsSearchFilterDetail, ServiceTicketsSearchInput, ServiceTicketsSearchResult } from '../../../external-dependencies/graphql-api';
import { AppContext } from '../../../../../../framework/app/app-context-builder';

export interface ServiceTicketV1SearchApi {
  serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  serviceTicketsSearchAdmin(input: ServiceTicketsSearchInput, communityId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult>;
  reIndexServiceTickets(): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
}

const ServiceTicketFilterNames = {
  RequestorId: 'requestorId',
  AssignedToId: 'assignedToId',
  Status: 'status',
  Priority: 'priority',
  CommunityId: 'communityId',
};
export class ServiceTicketV1SearchApiImpl extends CognitiveSearchDataSource<AppContext> implements ServiceTicketV1SearchApi {
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
        top: input.options.top,
        skip: input.options.skip,
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

  async reIndexServiceTickets():Promise<SearchDocumentsResult<Pick<unknown, never>>> {
    // drop index, create a brand new index
    await this.withSearch(async (_passport, searchService) => {
      await searchService.deleteIndex(ServiceTicketIndexSpec.name);
      await searchService.createIndexIfNotExists(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
    });

    const context = await ReadOnlyContext();
    const ids = await this.context.applicationServices.service.dataApi.getAllIds();

    await ServiceTicketV1UnitOfWork.withTransaction(context, async (repo) => {
      const searchDocs: Partial<ServiceTicketIndexDocument>[] = [];

      // loop through ids, get objects, convert to domain objects, convert to index document, update search index
      for await (const id of ids) {
        const doc = await repo.getById(id.id.toString());

        const updatedDate = dayjs(doc.updatedAt.toISOString().split('T')[0]).toISOString();

        const createdDate = dayjs(doc.createdAt.toISOString().split('T')[0]).toISOString();

        let serviceTicketIndexDoc: Partial<ServiceTicketIndexDocument> = {
          id: doc.id,
          communityId: doc.community.id,
          propertyId: doc.property.id,
          title: doc.title,
          requestor: doc.requestor.memberName,
          requestorId: doc.requestor.id,
          assignedTo: doc.assignedTo?.memberName ?? '',
          assignedToId: doc.assignedTo?.id ?? '',
          description: doc.description,
          ticketType: doc.ticketType,
          status: doc.status,
          priority: doc.priority,
          createdAt: createdDate,
          updatedAt: updatedDate,
        };

        searchDocs.push(serviceTicketIndexDoc);
        await this.withSearch(async (_passport, searchService) => {
          await searchService.indexDocument(ServiceTicketIndexSpec.name, serviceTicketIndexDoc);
        });
      }
    });

    const searchInput = {
      searchString: '',
      options: {
        filter: null,
        facets: [],
        // top: input.options?.top ?? 10,
        // skip: input.options?.skip ?? 0,
        // orderBy: input?.options?.orderBy ?? [],
        // hideNullResults: input?.options?.hideNullResults ?? false,
      },
    } as ServiceTicketsSearchInput;

    return this.serviceTicketsSearch(searchInput, '');
  }
}
