import { useLazyQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Checkbox, Radio, Slider, Row, Col } from 'antd';
import { useState } from 'react';
import type { SliderMarks } from 'antd/lib/slider';

const FilterNames = {
  Type: 'type',
  Bedrooms: 'bedrooms',
  Amenities: 'amenities',
  AdditionalAmenitiesCategory: 'additionalAmenities/category',
  AdditionalAmenitiesAmenities: 'additionalAmenities/amenities'
};
const AdditionalAmenitiesCategories = {
  AdditionalAmenitiesFeatures: 'Features',
  AdditionalAmenitiesLocation: 'Location'
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
const AdditionalAmenitiesLocation = ['Waterfront', 'Beachfront'];
const prices: SliderMarks = {
  0: '0',
  10: '100,000+',
  20: '200,000+',
  30: '300,000+',
  40: '400,000+',
  50: '500,000+',
  60: '600,000+',
  70: '700,000+',
  80: '800,000+',
  90: '900,000+',
  100: '1,000,000+'
};
export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [bedrooms, setBedrooms] = useState<undefined | number>(undefined);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
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
    setSelectedFilter({
      ...selectedFilter,
      listingDetail: { ...selectedFilter?.listingDetail, amenities: checkedValues }
    });
  };

  const onBedroomsClicked = (e: any) => {
    setBedrooms(e.target.value);
    setSelectedFilter({
      ...selectedFilter,
      listingDetail: { ...selectedFilter?.listingDetail, bedrooms: parseInt(e.target.value) }
    });
  };

  const onAdditionalAmenitiesChange = (categoryValue: string, amenities: string[]) => {
    // get current additional amenities
    const currentAdditionalAmenities = selectedFilter?.listingDetail?.additionalAmenities ?? [];
    // find index of updated category
    const index = currentAdditionalAmenities?.findIndex((a) => a?.category === categoryValue);
    // update amenities
    if (index !== -1) {
      if (amenities.length === 0) {
        // remove category
        currentAdditionalAmenities.splice(index, 1);
      } else {
        currentAdditionalAmenities[index] = {
          category: categoryValue,
          amenities: amenities
        };
      }
    } else {
      currentAdditionalAmenities?.push({
        category: categoryValue,
        amenities: amenities
      });
    }

    setSelectedFilter({
      ...selectedFilter,
      listingDetail: {
        ...selectedFilter?.listingDetail,
        additionalAmenities: currentAdditionalAmenities
      }
    });
  };

  const onPriceChanged = (type: string, e: any) => {
    switch (type) {
      case 'min':
        setMinPrice(e.target.value * 10000);
        break;
      case 'max':
        setMaxPrice(e.target.value * 10000);
        break;
    }
  };

  const onSliderPriceChanged = (values: [number, number]) => {
    setMinPrice(values[0] * 10000);
    setMaxPrice(values[1] * 10000);
    setSelectedFilter({
      ...selectedFilter,
      listingDetail: {
        ...selectedFilter?.listingDetail,
        prices: [values[0] * 10000, values[1] * 10000]
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
      {/* Features */}
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
      <div style={{ paddingLeft: '20px' }}>
        <h2 className="font-bold">Location</h2>
        <CheckboxGroup
          key={AdditionalAmenitiesCategories.AdditionalAmenitiesLocation}
          options={AdditionalAmenitiesLocation.map((value: string) => ({
            label: value,
            value: value
          }))}
          onChange={(checkedValues) =>
            onAdditionalAmenitiesChange(
              AdditionalAmenitiesCategories.AdditionalAmenitiesLocation,
              checkedValues as string[]
            )
          }
        />
      </div>
      {/* Price */}
      <h2 className="font-bold">Price</h2>
      <Slider
        range
        marks={prices}
        defaultValue={[0, 100]}
        step={null}
        onChange={(values) => onSliderPriceChanged(values)}
        tooltipVisible={false}
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>Min price</div>
          <Input value={minPrice * 10000} onChange={(e) => onPriceChanged('min', e)} />
        </Col>
        <Col span={12}>
          <div>Max price</div>
          <Input value={maxPrice * 10000} onChange={(e) => onPriceChanged('max', e)} />
        </Col>
      </Row>
      {result()}
    </>
  );
};
