import { useLazyQuery } from '@apollo/client';
import {
  FilterDetails,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Checkbox, Radio } from 'antd';
import { useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const FilterNames = {
  Type: 'type',
  Bedrooms: 'bedrooms',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities'
};
const CheckboxGroup = Checkbox.Group;
const BedroomsFilterOptions = [
  { label: '+1', value: '1' },
  { label: '+2', value: '2' },
  { label: '+3', value: '3' },
  { label: '+4', value: '4' },
  { label: '+5', value: '5' }
];
const PropertyTypes = ['condo', 'single family', 'townhouse'];
const Amenities = ['Wifi', 'Pool', 'TV'];
const AdditionalAmenitiesFeatures = ['Iron', 'Washer/dryer'];
export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterDetails[]>([]);
  const [bedrooms, setBedrooms] = useState<undefined | number>(undefined);
  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );

  const handleSearch = (searchString: string) => {
    gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: { facets: [FilterNames.Type], filters: selectedFilters }
        }
      }
    });
  };

  const onPropertyTypeFilterChange = (filedName: string, checkedValues: CheckboxValueType[]) => {
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

  const onBedroomsClicked = (e: any) => {
    setBedrooms(e.target.value);
    // make a copy of selected filters
    const newFilters = [...selectedFilters];
    // find the filter with the same fieldName
    const filterIndex = newFilters.findIndex((filter: FilterDetails) => {
      return filter.fieldName === FilterNames.Bedrooms;
    });
    // if the filter is found, update the fieldValues
    if (filterIndex !== -1) {
      newFilters[filterIndex].fieldValues = [e.target.value.toString()];
    }
    // if the filter is not found, add a new filter
    else {
      newFilters.push({
        fieldName: FilterNames.Bedrooms,
        fieldValues: [e.target.value.toString()]
      });
    }
    setSelectedFilters(newFilters);

    gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: { facets: [FilterNames.Type], filters: newFilters }
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

        {/* Type */}
        <h2 className="font-bold">Type </h2>
        <CheckboxGroup
          key={FilterNames.Type}
          options={PropertyTypes.map((value: string) => ({
            label: value,
            value: value
          }))}
          onChange={(checkedValues) => onPropertyTypeFilterChange(FilterNames.Type, checkedValues)}
        />
        {/* Bedrooms */}
        <h2 className="font-bold">Bedrooms</h2>
        <Radio.Group
          value={bedrooms}
          onChange={onBedroomsClicked}
          buttonStyle="solid"
          optionType="button"
          options={BedroomsFilterOptions}
        />
      </div>
      {/* Amenities */}
      <h2 className="font-bold">Amenities</h2>
      <CheckboxGroup
        key={FilterNames.Amenities}
        options={Amenities.map((value: string) => ({
          label: value,
          value: value
        }))}
        onChange={(checkedValues) =>
          onPropertyTypeFilterChange(FilterNames.Amenities, checkedValues)
        }
      />
      {/* Additional Amenities */}
      {/* <h2 className="font-bold">Additional Amenities</h2>
      
      <h2 className="font-bold">Features</h2>
      <CheckboxGroup
        key={FilterNames.AdditionalAmenitiesFeatures}
        options={AdditionalAmenitiesFeatures.map((value: string) => ({
          label: value,
          value: value
        }))}
        onChange={(checkedValues) =>
          onAdditionalAmenitiesChange(FilterNames.AdditionalAmenitiesCategory, checkedValues)
        }
      /> */}
      {result()}
    </>
  );
};
