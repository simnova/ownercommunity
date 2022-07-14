import { ActionUnion } from '@craftjs/utils';
import { useEffect, useState } from 'react';
import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

interface SearchFilterConfigDefinition {
  filters: {
      title: string;
      searchId: string;
      searchbar?: boolean;
      values: any;
      facet: string;
      handleCount?: (t: any, value: any) => number;
      handleBuild?: (filter: ServiceTicketFilterType, value: any, count: number) => void;
  }[]
}
export interface ServiceTicketFilterType {
  title: string;
  options: { name: string; count: number; id: string }[];
  searchId: string;
  searchbar?: boolean;
}

export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {
  const [filters, setFilters] = useState<ServiceTicketFilterType[]>([]);

  const generateFilters = (config: SearchFilterConfigDefinition) => {
    const filters: ServiceTicketFilterType[] = [];
    config.filters.forEach((filter: any) => {

      let newFilter: ServiceTicketFilterType = {
        title: filter.title,
        options: [],
        searchId: filter.searchId,
        searchbar: filter.searchbar ?? false,
      }

      filter.values.forEach((value: any) => {
        const count = props.searchData.facets[filter.facet].find((t: any) => t.value === (filter.handleCount ? filter.handleCount(value) : value))?.count ?? 0;
        if (filter.handleBuild) {
          filter.handleBuild(newFilter, value, count);
        } else {
          newFilter.options.push({
            name: value,
            count: count,
            id: value,
          });
        }
      })

      filters.push(newFilter);
    });
    setFilters(filters);
  }


  useEffect(() => {

    const filterConfig: SearchFilterConfigDefinition = {
      filters: [
        // ASSIGNED TO 
        {
          title: 'Assigned To',
          searchId: 'assignedTo',
          searchbar: true,
          values: props.memberData.membersByCommunityId,
          facet: 'assignedToId',
          handleCount: (value: any) => {
            return value.id;
          },
          handleBuild: (filter: ServiceTicketFilterType, value: any, count: number) => {
            filter.options.push({
              name: value.memberName,
              count: count,
              id: value.id,
            });
          }
        },
        // PRIORITY
        {
          title: 'Priority',
          searchId: 'priority',
          values: ['1', '2', '3', '4', '5'],
          facet: 'priority',
        },
        // STATUS
        {
          title: 'Status',
          searchId: 'status',
          values: [      
            'Created',
            'Draft',
            'Submitted',
            'Assigned',
            'In Progress',
            'Completed',
            'Closed'
          ],
          facet: 'status',
          handleCount: (value: any) => {
            return value.toUpperCase();
          },
        }
      ]
    };

    generateFilters(filterConfig);
  }, []);

  console.log('props', props);

  return (
    <>
      {filters?.map((filter: ServiceTicketFilterType) => {
        return (
          <ServiceTicketsSearchFilter
            title={filter?.title}
            searchId={filter?.searchId}
            options={filter?.options}
            searchbar={filter?.searchbar ?? false}
          />
        );
      })}
    </>
  );
};
