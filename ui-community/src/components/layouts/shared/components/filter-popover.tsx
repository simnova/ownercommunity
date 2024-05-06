import { Button, Popover, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FacetDetail } from '../../../../generated';
import { SearchFilterConfigDefinition, SearchFilterProps } from './search-filter';
import { ServiceTicketSearchParamKeys } from '../../../../constants';

interface FilterPopoverProps {
  searchData: any;
  memberData: any;
  clearFilter: () => void;
}

export const FilterPopover: React.FC<FilterPopoverProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterProps[]>([]);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: any) => {
    setOpen(newOpen);
  };
  const generateFilters = (config: SearchFilterConfigDefinition) => {
    const filters: SearchFilterProps[] = [];
    config.filters.forEach((filter: any) => {
      let newFilter: SearchFilterProps = {
        title: filter.title,
        options: [],
        searchId: filter.searchId,
        searchbar: filter.searchbar ?? false
      };

      filter.values.forEach((value: any) => {
        const count =
          props.searchData.facets[filter.facet[0]].find((facet: FacetDetail) =>
            filter.handleCount ? filter.handleCount(facet, value) : facet.value === value
          )?.count ?? 0;
        if (filter.handleBuild) {
          filter.handleBuild(newFilter, value, count);
        } else {
          newFilter.options.push({
            name: value,
            count: count,
            id: value
          });
        }
      });

      filters.push(newFilter);
    });
    setFilters(filters);
    console.log('yoyo', filters);
  };

  const popoverContent = filters.map((filter) => {
    const tagContent = filter.options.map((option) => {
      return (
        <Tag.CheckableTag key={10} checked={true} style={{borderRadius: '5px'}}>
          {option.name}
        </Tag.CheckableTag>
      );
    });
    return (
      <div
        style={{
          display: 'grid',
          maxWidth: 'max-content',
        }}
      >
        {filter.title}
        {tagContent}
      </div>
    );
  });
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
              id: value.id
            });
          }
        },
        // PRIORITY
        {
          title: 'Priority',
          searchId: [ServiceTicketSearchParamKeys.Priority],
          values: ['1', '2', '3', '4', '5'],
          facet: ['priority']
        },
        // STATUS
        {
          title: 'Status',
          searchId: [ServiceTicketSearchParamKeys.Status],
          values: ['Created', 'Draft', 'Submitted', 'Assigned', 'In Progress', 'Completed', 'Closed'],
          facet: ['status'],
          handleCount: (facet: FacetDetail, value: any) => {
            return facet.value === value.toUpperCase();
          }
        }
      ]
    };

    generateFilters(filterConfig);
  }, []);

  return (
    <div>
      <Popover
        title="Filters"
        placement="bottom"
        content={popoverContent}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary">Filter</Button>
      </Popover>
    </div>
  );
};
