import { useLazyQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Checkbox, Radio } from 'antd';
import { useState } from 'react';

const FilterNames = {
  Type: 'type',
  Bedrooms: 'bedrooms',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities'
};
const AdditionalAmenitiesCategories = {
  AdditionalAmenitiesFeatures: 'features'
};
const CheckboxGroup = Checkbox.Group;
const BedroomsFilterOptions = [
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' }
];
const PropertyTypes = ['condo', 'single family', 'townhouse'];
const Amenities = ['Wifi', 'Pool', 'TV'];
const AdditionalAmenitiesFeatures = ['Iron', 'Washer/dryer'];
export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
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
          options: { facets: [FilterNames.Type], filter: selectedFilter }
        }
      }
    });
  };

  const onPropertyTypeFilterChange = (checkedValues: string[]) => {
    setSelectedFilter({ ...selectedFilter, propertyType: checkedValues });
  };

  const onAmenitiesFilterChange = (checkedValues: string[]) => {
    setSelectedFilter({ ...selectedFilter, listingDetail: { amenities: checkedValues } });
  };

  const onBedroomsClicked = (e: any) => {
    setBedrooms(e.target.value);
    setSelectedFilter({ ...selectedFilter, listingDetail: { bedrooms: parseInt(e.target.value) } });
  };

  const onAdditionalAmenitiesChange = (categoryValue: string, amenities: string[]) => {
    // // make a copy of selected filters
    // const newFilters = [...selectedFilter];
    // // find the filter with the same fieldName
    // const filterIndex = newFilters.findIndex((filter: FilterDetails) => {
    //   return filter.fieldName === FilterNames.AdditionalAmenitiesCategory;
    // });
    // // if the filter is found, update the fieldValues
    // if (filterIndex !== -1) {
    //   newFilters[filterIndex].fieldValues = [categoryValue];
    // }
    // // if the filter is not found, add a new filter
    // else {
    //   newFilters.push({
    //     fieldName: FilterNames.AdditionalAmenitiesCategory,
    //     fieldValues: [categoryValue]
    //   });
    // }
    // setSelectedFilter(newFilters);
    // gqlSearchProperties({
    //   variables: {
    //     input: {
    //       searchString: searchString,
    //       options: { facets: [FilterNames.Type], filters: newFilters }
    //     }
    //   }
    // });
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
          onChange={(checkedValues) => onPropertyTypeFilterChange(checkedValues as string[])}
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
        onChange={(checkedValues) => onAmenitiesFilterChange(checkedValues as string[])}
      />
      {/* Additional Amenities */}
      <h2 className="font-bold">Additional Amenities</h2>
      <div style={{ paddingLeft: '20px' }}>
        <h2 className="font-bold">Features</h2>
        <CheckboxGroup
          key={AdditionalAmenitiesCategories.AdditionalAmenitiesFeatures}
          options={AdditionalAmenitiesFeatures.map((value: string) => ({
            label: value,
            value: value
          }))}
          onChange={(checkedValues) =>
            onAdditionalAmenitiesChange(
              AdditionalAmenitiesCategories.AdditionalAmenitiesFeatures,
              checkedValues as string[]
            )
          }
        />
      </div>
      {result()}
    </>
  );
};
