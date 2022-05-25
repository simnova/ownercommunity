import { useLazyQuery } from '@apollo/client';
import {
  FilterDetails,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Checkbox } from 'antd';
import { useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterDetails[]>([]);
  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );

  const handleSearch = (searchString: string) => {
    gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: { facets: ['type'], filters: selectedFilters }
        }
      }
    });
  };

  const onFilterChange = (filedName: string, checkedValues: CheckboxValueType[]) => {
    // make a copy of selected filters
    const newFilters = [...selectedFilters];

    // if no values are selected, remove the filter
    if (checkedValues.length === 0) {
      setSelectedFilters(
        newFilters.filter((filter: FilterDetails) => filter.fieldName !== filedName)
      );
      return;
    }
    if (newFilters.length === 0) {
      setSelectedFilters([{ fieldName: filedName, fieldValues: checkedValues as string[] }]);
    } else {
      // find the filter with the same fieldName
      const filterIndex = newFilters.findIndex((filter: FilterDetails) => {
        return filter.fieldName === filedName;
      });
      // if the filter is found, update the fieldValues
      if (filterIndex !== -1) {
        newFilters[filterIndex].fieldValues = checkedValues as string[];
      }
      // if the filter is not found, add a new filter
      else {
        newFilters.push({ fieldName: filedName, fieldValues: checkedValues as string[] });
      }
      setSelectedFilters(newFilters);
    }
  };

  const onBedroomsClicked = (bedRooms: number) => {
    // make a copy of selected filters
    const newFilters = [...selectedFilters];
    // find the filter with the same fieldName
    const filterIndex = newFilters.findIndex((filter: FilterDetails) => {
      return filter.fieldName === 'bedrooms';
    });
    // if the filter is found, update the fieldValues
    if (filterIndex !== -1) {
      newFilters[filterIndex].fieldValues = [bedRooms.toString()];
    }
    // if the filter is not found, add a new filter
    else {
      newFilters.push({ fieldName: 'bedrooms', fieldValues: [bedRooms.toString()] });
    }
    setSelectedFilters(newFilters);

    gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: { facets: ['type'], filters: newFilters }
        }
      }
    });
  };

  var result = () => {
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    } else if (loading) {
      return <Skeleton active />;
    } else if (called && data) {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
    return <div>Search Please</div>;
  };

  return (
    <>
      <Space>
        <Input
          placeholder="Search properties"
          onPressEnter={(e: any) => handleSearch(e.target.value)}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <Button type="primary" onClick={() => handleSearch(searchString)}>
          Search
        </Button>
      </Space>

      <div>
        <h1>Filters</h1>

        <h2 className="font-bold">Type </h2>
        <CheckboxGroup
          key="type"
          options={['condo', 'single family', 'townhouse'].map((value: string) => ({
            label: value,
            value: value
          }))}
          onChange={(checkedValues) => onFilterChange('type', checkedValues)}
        />

        <h2 className="font-bold">Bed Rooms</h2>
        <Space direction="horizontal">
          <Button onClick={() => onBedroomsClicked(1)}>1+</Button>
          <Button onClick={() => onBedroomsClicked(2)}>2+</Button>
          <Button onClick={() => onBedroomsClicked(3)}>3+</Button>
          <Button onClick={() => onBedroomsClicked(4)}>4+</Button>
          <Button onClick={() => onBedroomsClicked(5)}>5+</Button>
        </Space>
      </div>
      {result()}
    </>
  );
};
