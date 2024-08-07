import { SearchIndex } from "../../../../../seedwork/services-seedwork-cognitive-search-interfaces";

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
      name: 'ticketType',
      type: 'Edm.String',
      facetable: true,
      searchable: true,
      filterable: true,
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
  ticketType: string;
  status: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}
