import { ActionUnion } from '@craftjs/utils';
import { useEffect, useState } from 'react';
import { ServiceTicketsSearchFilter } from './service-tickets-search-filter';

interface SearchFilterConfigDefinition {
  filters: {
      title: string;
      id: string;
      searchbar?: boolean;
      values: any;
      facet: string;
      handleCount?: (t: any, value: any) => number;
      handleBuild?: (filter: FilterType, value: any, count: number) => void;
  }[]
}
interface FilterType {
  title: string;
  options: { name: string; count: number; id: string }[];
  id?: string;
  searchbar?: boolean;
}

export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {
  const [filters, setFilters] = useState<FilterType[]>([]);

  const generateFilters = (config: SearchFilterConfigDefinition) => {
    const filters: FilterType[] = [];
    config.filters.forEach((filter: any) => {

      let newFilter: FilterType = {
        title: filter.title,
        options: [],
        id: filter.id,
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
          id: 'assignedTo',
          searchbar: true,
          values: props.memberData.membersByCommunityId,
          facet: 'assignedToId',
          handleCount: (value: any) => {
            return value.id;
          },
          handleBuild: (filter: FilterType, value: any, count: number) => {
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
          id: 'priority',
          values: ['1', '2', '3', '4', '5'],
          facet: 'priority',
        },
        // STATUS
        {
          title: 'Status',
          id: 'status',
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
      {filters?.map((filter: any) => {
        return (
          <ServiceTicketsSearchFilter
            title={filter?.title}
            id={filter?.id}
            options={filter?.options}
            searchbar={filter?.searchbar ?? false}
          />
        );
      })}
    </>
  );
};
