import { Button, Select } from 'antd';
import { SearchParamKeys, ServiceTicketSearchParamKeys, ServiceTicketSortOptions } from '../../../../constants';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export interface SearchHelperProps {
  clearFilter: () => void
}

export const ServiceTicketSearchHelpers: React.FC<SearchHelperProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columnsToDisplay, setColumnsToDisplay] = useState<string[] | undefined>(
    searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? []
  );
  const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Updated', 'Created'];
  const { Option } = Select;

  const onSelectColumnChanged = (columnName: string) => {
    const originalSearchParams = searchParams.get(ServiceTicketSearchParamKeys.Column) ?? '';
    searchParams.set(
      ServiceTicketSearchParamKeys.Column,
      originalSearchParams.length > 0
        ? searchParams.get(ServiceTicketSearchParamKeys.Column) + ',' + columnName
        : columnName
    );
    setSearchParams(searchParams);
    setColumnsToDisplay([...(columnsToDisplay ?? []), columnName]);
  };

  const onColumnDelete = (columnName: string) => {
    const searchParamsString = searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');
    const newSearchParamsArray: string[] = [];
    searchParamsString?.forEach((searchParam) => {
      if (searchParam !== columnName) {
        newSearchParamsArray.push(searchParam);
      }
    });

    if (newSearchParamsArray.length > 0) {
      searchParams.set(ServiceTicketSearchParamKeys.Column, newSearchParamsArray.join(','));
    } else {
      searchParams.delete(ServiceTicketSearchParamKeys.Column);
    }
    setSearchParams(searchParams);
    setColumnsToDisplay(columnsToDisplay?.filter((column) => column !== columnName));
  };

  const onSortChanged = (value: string) => {
    if (value) {
      searchParams.set(SearchParamKeys.Sort, value);
    } else {
      searchParams.delete(SearchParamKeys.Sort);
    }

    setSearchParams(searchParams);
  };

  return (
    <div style={{ paddingBottom: '10px' }}>
      <Select
        style={{ width: '225px', marginRight: '10px' }}
        placeholder="Sort By"
        allowClear
        onChange={(value) => onSortChanged(value)}
        defaultValue={searchParams.get('sort') ? searchParams.get('sort') : null}
      >
        {ServiceTicketSortOptions.map((option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
      <Select
        style={{ width: '175px', marginRight: '10px' }}
        mode="multiple"
        placeholder="Select Column"
        allowClear
        onSelect={(e: any) => onSelectColumnChanged(e)}
        defaultValue={columnsToDisplay}
        onClear={() => {
          searchParams.delete(ServiceTicketSearchParamKeys.Column);
          setSearchParams(searchParams);
          setColumnsToDisplay(undefined);
        }}
        onDeselect={(value: any) => onColumnDelete(value)}
      >
        {columnOptions.map((option: string) => {
          return <Option key={option}>{option}</Option>;
        })}
      </Select>
      <Button type="primary" danger onClick={() => props.clearFilter()}>
        Clear
      </Button>
    </div>
  );
};
