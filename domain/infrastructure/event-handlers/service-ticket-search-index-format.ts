/** @format */

import { SearchIndex } from '@azure/search-documents';

export const ServiceTicketIndexSpec = {
  name: 'service-ticket-index',
  fields: [
    { name: 'id', type: 'Edm.String', searchable: false, key: true },
    {
      name: 'communityId',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
    },
    {
      name: 'propertyId',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
    },
    {
      name: 'title',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      sortable: true,
      facetable: false,
    },
    {
      name: 'requestor',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'assignedTo',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'description',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      sortable: false,
      facetable: false,
    },
    {
      name: 'status',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
    {
      name: 'priority',
      type: 'Edm.Int32',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
  ],
} as SearchIndex;

export interface ServiceTicketIndexDocument {
  id: string;
  communityId: string;
  propertyId: string;
  title: string;
  requestor: string;
  assignedTo: string;
  description: string;
  status: string;
  priority: number;
}
