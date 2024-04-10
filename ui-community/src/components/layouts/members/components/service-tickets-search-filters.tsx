import { useEffect, useState } from 'react';
import { ServiceTicketSearchParamKeys } from '../../../../constants';
import { FacetDetail } from '../../../../generated';
import { SearchFilter, SearchFilterConfigDefinition, SearchFilterProps } from '../../shared/components/search-filter';


export const ServiceTicketsSearchFilters: React.FC<any> = (props) => {
  const [filters, setFilters] = useState<SearchFilterProps[]>([]);

  const generateFilters = (config: SearchFilterConfigDefinition) => {
    const filters: SearchFilterProps[] = [];
    config.filters.forEach((filter: any) => {

      let newFilter: SearchFilterProps = {
        title: filter.title,
        options: [],
        searchId: filter.searchId,
        searchbar: filter.searchbar ?? false,
      }

      filter.values.forEach((value: any) => {
        const count = props.searchData.facets[filter.facet[0]].find((facet: FacetDetail) => (filter.handleCount ? filter.handleCount(facet, value) : facet.value === value))?.count ?? 0;
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
          searchId: [ServiceTicketSearchParamKeys.AssignedTo],
          searchbar: true,
          values: props.memberData.membersByCommunityId,
          facet: ['assignedToId'],
          handleCount: (facet: FacetDetail, value: any) => {
            return facet.value === value.id;
          },
          handleBuild: (filter: SearchFilterProps, value: any, count: number) => {
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
          searchId: [ServiceTicketSearchParamKeys.Priority],
          values: ['1', '2', '3', '4', '5'],
          facet: ['priority'],
        },
        // STATUS
        {
          title: 'Status',
          searchId: [ServiceTicketSearchParamKeys.Status],
          values: [      
            'Created',
            'Draft',
            'Submitted',
            'Assigned',
            'In Progress',
            'Completed',
            'Closed'
          ],
          facet: ['status'],
          handleCount: (facet: FacetDetail, value: any) => {
            return facet.value === value.toUpperCase();
          },
        }
      ]
    };

    generateFilters(filterConfig);
  }, []);

  console.log('props', props);

  return (
    <>
      {filters?.map((filter: SearchFilterProps) => {
        return (
          <SearchFilter
            key={filter?.searchId[0]}
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
