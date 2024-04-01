import { FacetDetail, SearchDocumentsResult } from './_base.interface';

export interface ServiceTicketCognitiveSearchApplicationService {
  serviceTicketsSearch(input: ServiceTicketsSearchInput, requestorId: string): Promise<SearchDocumentsResult<Pick<unknown, never>>>;
  getServiceTicketsSearchResults(searchResults: SearchDocumentsResult<Pick<unknown, never>>): Promise<ServiceTicketsSearchResult>;
}

export type ServiceTicketsSearchInput = {
  options?: ServiceTicketsSearchOptions;
  searchString?: string;
};

export type ServiceTicketsSearchOptions = {
  facets?: string[];
  filter?: ServiceTicketsSearchFilterDetail;
  orderBy?: string[];
  skip?: number;
  top?: number;
};

export type ServiceTicketsSearchFilterDetail = {
  assignedToId?: string[];
  priority?: number[];
  requestorId?: string[];
  status?: string[];
};

export type ServiceTicketsSearchResult = {
  count?: number;
  facets?: ServiceTicketsSearchFacets;
  serviceTicketsResults?: ServiceTicketsResult[];
};

export type ServiceTicketsSearchFacets = {
  assignedTo?: FacetDetail[];
  assignedToId?: FacetDetail;
  priority?: FacetDetail;
  requestor?: FacetDetail;
  requestorId?: FacetDetail;
  status?: FacetDetail;
};

export type ServiceTicketsResult = {
  assignedTo?: string;
  assignedToId?: string;
  communityId?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  priority?: number;
  propertyId?: string;
  requestor?: string;
  requestorId?: string;
  status?: string;
  title?: string;
  updatedAt?: Date;
};