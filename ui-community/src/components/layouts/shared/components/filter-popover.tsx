import { Button, Popover, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FacetDetail } from '../../../../generated';
import { SearchFilterConfigDefinition, SearchFilterProps } from './search-filter';
import { ServiceTicketSearchParamKeys } from '../../../../constants';
import { FilterOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';

interface FilterPopoverProps {
  searchData: any;
  memberData: any;
  clearFilter: () => void;
}

export const FilterPopover: React.FC<FilterPopoverProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
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

  const getSearchId = (key: string) => {
    return filters.filter((filter: any) => filter.options.some((option: any) => option.id === key))[0].searchId[0]
  }

  const onSelectCheckbox = (checked: any, key: string) => {
    const searchId = getSearchId(key)
    if (checked) {
      const originalSearchParams = searchParams.get(searchId) ?? '';
      searchParams.set(searchId, originalSearchParams.length > 0 ? searchParams.get(searchId) + ',' + key : key);
      setSearchParams(searchParams);
    } else {
      const searchParamsString = searchParams.get(searchId)?.split(',');
      const newSearchParamsArray: any = [];
      searchParamsString?.forEach((searchParam) => {
        if (searchParam !== key) {
          newSearchParamsArray.push(searchParam);
        }
      });
      searchParams.set(searchId, newSearchParamsArray.join(','));
      if (searchParams.get(searchId) === '') {
        searchParams.delete(searchId);
      }
      setSearchParams(searchParams);
    }
  };

  const isChecked = (id: string) => {
    return searchParams.get(getSearchId(id))?.split(',').includes(id) ? true : false
  };

  const popoverContent = filters.map((filter) => {
    const tagContent = filter.options.map((option) => {
      return (
        <Tag.CheckableTag
          checked={isChecked(option.id)}
          onChange={(e) => onSelectCheckbox(e, option.id)}
          style={{ borderRadius: '10px', border: '1px solid #4096ff', marginBottom: '5px', fontFamily: 'sans-serif', fontWeight: '100px'}}
        >
          {option.name + " (" + option.count + ")"}
        </Tag.CheckableTag>
      );
    });
    return (
      <div
        style={{
          display: 'grid',
          maxWidth: 'max-content',
          marginBottom: '10px'
        }}
      >
        {filter.title}
        {tagContent}
      </div>
    );
  });

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
        <Button type="primary">
          <FilterOutlined />
          Filter
        </Button>
      </Popover>
    </div>
  );
};
