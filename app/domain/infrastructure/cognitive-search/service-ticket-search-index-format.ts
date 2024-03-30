import { SearchIndex } from './base-types';

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
      name: 'requestorId',
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
      name: 'assignedToId',
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
    {
      name: 'updatedAt',
      type: 'Edm.DateTimeOffset',
      facetable: true,
      filterable: true,
      retrievable: true,
      sortable: true,
    },
    {
      name: 'createdAt',
      type: 'Edm.DateTimeOffset',
      facetable: true,
      filterable: true,
      retrievable: true,
      sortable: true,
    },
  ],
} as SearchIndex;

export interface ServiceTicketIndexDocument {
  id: string;
  communityId: string;
  propertyId: string;
  title: string;
  requestor: string;
  requestorId: string;
  assignedTo: string;
  assignedToId: string;
  description: string;
  status: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}
