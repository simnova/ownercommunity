import { useLazyQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Checkbox, Radio, Slider, Row, Col, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { SliderMarks } from 'antd/lib/slider';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
const { Option } = Select;

interface AdditionalAmenities {
  category: string;
  amenities: string[];
}
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
const BathroomsFilterOptions = [
  { label: '1+', value: '1' },
  { label: '1.5+', value: '1.5' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' }
];
const PropertyTypes = ['condo', 'single family', 'townhouse'];
const Amenities = ['Wifi', 'Pool', 'TV'];
const AdditionalAmenitiesValues: AdditionalAmenities[] = [
  {
    category: 'Features',
    amenities: ['Iron', 'WasherDryer']
  },
  {
    category: 'Location',
    amenities: ['Waterfront', 'Beachfront']
  }
];

const prices: SliderMarks = {
  0: '0',
  100000: '100,000+',
  200000: '200,000+',
  300000: '300,000+',
  400000: '400,000+',
  500000: '500,000+',
  600000: '600,000+',
  700000: '700,000+',
  800000: '800,000+',
  900000: '900,000+',
  1000000: '1,000,000+'
};
const MinSquareFeetOptions = [
  { label: 'No min', value: 0 },
  { label: '750', value: 750 },
  { label: '1,000', value: 1000 },
  { label: '1,100', value: 1100 },
  { label: '1,200', value: 1200 },
  { label: '1,300', value: 1300 },
  { label: '1,400', value: 1400 },
  { label: '1,500', value: 1500 },
  { label: '1,600', value: 1600 },
  { label: '1,700', value: 1700 },
  { label: '1,800', value: 1800 },
  { label: '1,900', value: 1900 },
  { label: '2,000', value: 2000 }
];

const MaxSquareFeetOptions = [
  { label: 'No max', value: 100000 },
  { label: '750', value: 750 },
  { label: '1,000', value: 1000 },
  { label: '1,100', value: 1100 },
  { label: '1,200', value: 1200 },
  { label: '1,300', value: 1300 },
  { label: '1,400', value: 1400 },
  { label: '1,500', value: 1500 },
  { label: '1,600', value: 1600 },
  { label: '1,700', value: 1700 },
  { label: '1,800', value: 1800 },
  { label: '1,900', value: 1900 },
  { label: '2,000', value: 2000 }
];

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAdditionalAmenities, setSelectedAdditionalAmenities] = useState<
    AdditionalAmenities[]
  >([]);
  const [bedrooms, setBedrooms] = useState<undefined | number>(undefined);
  const [bathrooms, setBathrooms] = useState<undefined | number>(undefined);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minSquareFeet, setMinSquareFeet] = useState<number>(MinSquareFeetOptions[0].value);
  const [maxSquareFeet, setMaxSquareFeet] = useState<number>(MaxSquareFeetOptions[0].value);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );

  useEffect(() => {
    // get all search params
    const searchParams = new URLSearchParams(location.search);
    const properTypes = searchParams.get('type')?.split(',');
    const qsbedrooms = searchParams.get('bedrooms');
    const qsbathrooms = searchParams.get('bathrooms');
    const qsminPrice = searchParams.get('minPrice');
    const qsmaxPrice = searchParams.get('maxPrice');
    const qsminSquareFeet = searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
    const qsamenities = searchParams.get('amenities')?.split(',');
    const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');

    let filters = {} as FilterDetail;
    if (properTypes) {
      setSelectedPropertyTypes(properTypes);
      filters = {
        ...selectedFilter,
        propertyType: properTypes
      };
    }
    if (qsbedrooms) {
      console.log('bedrooms', qsbedrooms);
      setBedrooms(parseInt(qsbedrooms));
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bedrooms: parseInt(qsbedrooms)
        }
      };
    }
    if (qsbathrooms) {
      setBathrooms(parseFloat(qsbathrooms));
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bathrooms: parseFloat(qsbathrooms)
        }
      };
    }

    if (qsamenities) {
      setSelectedAmenities(qsamenities);
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          amenities: qsamenities
        }
      };
    }

    if (qsminPrice && qsmaxPrice) {
      setMinPrice(parseInt(qsminPrice));
      setMaxPrice(parseInt(qsmaxPrice));
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          prices: [parseInt(qsminPrice), parseInt(qsmaxPrice)]
        }
      };
    }

    if (qsminSquareFeet && qsmaxSquareFeet) {
      setMinSquareFeet(parseInt(qsminSquareFeet));
      setMaxSquareFeet(parseInt(qsmaxSquareFeet));
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          squareFeets: [parseInt(qsminSquareFeet), parseInt(qsmaxSquareFeet)]
        }
      };
    }

    // 0: "Features:Iron,Washer/Dryer"
    // 1: "Location:Beachfront"
    if (qsadditionalAmenities) {
      let temp: AdditionalAmenities[] = [];

      qsadditionalAmenities.forEach((amenity) => {
        const [cate, amen] = amenity.split(':');
        temp.push({
          category: cate,
          amenities: amen.split(',')
        });
      });
      setSelectedAdditionalAmenities(temp);
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          additionalAmenities: temp
        }
      };
    }

    setSelectedFilter(filters);
  }, []);

  useEffect(() => {
    updateQueryString(selectedFilter);
  }, [selectedFilter]);

  const updateQueryString = (filters: FilterDetail | undefined) => {
    if (!filters) {
      setSearchParams({});
      return;
    }

    let queryStrings = [];
    if (filters.propertyType && filters.propertyType.length > 0) {
      queryStrings.push(`type=${filters.propertyType}`);
    }
    if (filters.listingDetail?.bedrooms) {
      queryStrings.push(`bedrooms=${filters.listingDetail.bedrooms}`);
    }
    if (filters.listingDetail?.bathrooms) {
      queryStrings.push(`bathrooms=${filters.listingDetail.bathrooms}`);
    }
    if (filters.listingDetail?.amenities && filters.listingDetail.amenities.length > 0) {
      queryStrings.push(`amenities=${filters.listingDetail.amenities.join(',')}`);
    }
    if (
      filters.listingDetail?.additionalAmenities &&
      filters.listingDetail.additionalAmenities.length > 0
    ) {
      let additionalAmenitiesQueryStrings: string[] = [];
      filters.listingDetail.additionalAmenities.forEach((amenity) => {
        additionalAmenitiesQueryStrings.push(
          `${amenity?.category}:${amenity?.amenities?.join(',')}`
        );
      });
      queryStrings.push(`additionalAmenities=${additionalAmenitiesQueryStrings.join(';')}`);
    }
    if (filters.listingDetail?.prices && filters.listingDetail.prices.length > 0) {
      queryStrings.push(`minPrice=${filters.listingDetail.prices[0]}`);
      queryStrings.push(`maxPrice=${filters.listingDetail.prices[1]}`);
    }
    if (filters.listingDetail?.squareFeets && filters.listingDetail.squareFeets.length > 0) {
      queryStrings.push(`minSquareFeet=${filters.listingDetail.squareFeets[0]}`);
      queryStrings.push(`maxSquareFeet=${filters.listingDetail.squareFeets[1]}`);
    }

    if (queryStrings) {
      setSearchParams(new URLSearchParams(queryStrings.join('&')));
    }
  };

  const handleSearch = async (searchString: string) => {
    navigate('.?' + searchParams);
    await gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: {
            facets: [
              FilterNames.Type,
              FilterNames.AdditionalAmenitiesCategory,
              FilterNames.AdditionalAmenitiesAmenities + ',count:30',
              FilterNames.Amenities + ',count:30'
            ],
            filter: selectedFilter
          }
        }
      }
    });
  };

  const onPropertyTypeFilterChange = (checkedValues: string[]) => {
    setSelectedPropertyTypes(checkedValues);
    setSelectedFilter({ ...selectedFilter, propertyType: checkedValues });
  };

  const onAmenitiesFilterChange = (checkedValues: string[]) => {
    setSelectedAmenities(checkedValues);
    setSelectedFilter({
      ...selectedFilter,
      listingDetail: { ...selectedFilter?.listingDetail, amenities: checkedValues }
    });
  };

  const onBedroomsClicked = (e: any) => {
    setBedrooms(parseInt(e.target.value));

    setSelectedFilter({
      ...selectedFilter,
      listingDetail: { ...selectedFilter?.listingDetail, bedrooms: parseInt(e.target.value) }
    });
  };

  const onBathroomsClicked = (e: any) => {
    setBathrooms(parseFloat(e.target.value));

    setSelectedFilter({
      ...selectedFilter,
      listingDetail: { ...selectedFilter?.listingDetail, bathrooms: parseFloat(e.target.value) }
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

    setSelectedAdditionalAmenities(currentAdditionalAmenities as AdditionalAmenities[]);

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
        setMinPrice(e.target.value);
        break;
      case 'max':
        setMaxPrice(e.target.value);
        break;
    }
  };

  const onSliderPriceChanged = (values: [number, number]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setSelectedFilter({
      ...selectedFilter,
      listingDetail: {
        ...selectedFilter?.listingDetail,
        prices: [values[0], values[1]]
      }
    });
  };

  const onSquareFeetChanged = (type: string, value: any) => {
    switch (type) {
      case 'min':
        setMinSquareFeet(value);
        setSelectedFilter({
          ...selectedFilter,
          listingDetail: {
            ...selectedFilter?.listingDetail,
            squareFeets: [value, maxSquareFeet]
          }
        });
        break;
      case 'max':
        setMaxSquareFeet(value);
        setSelectedFilter({
          ...selectedFilter,
          listingDetail: {
            ...selectedFilter?.listingDetail,
            squareFeets: [minSquareFeet, value]
          }
        });
        break;
    }
  };

  const clearFilter = () => {
    setSelectedFilter(undefined);
    setBedrooms(undefined);
    setBathrooms(undefined);
    setMinPrice(0);
    setMaxPrice(1000000);
    setMinSquareFeet(MinSquareFeetOptions[0].value);
    setMaxSquareFeet(MaxSquareFeetOptions[0].value);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setSelectedAdditionalAmenities([]);
    setSearchParams('');
  };

  const result = () => {
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    } else if (loading) {
      return <Skeleton active />;
    } else if (called && data) {
      const generatedPropertyData = JSON.parse(
        JSON.stringify(data.propertiesSearch?.propertyResults, null, 2)
      );

      const properties = () => {
        return generatedPropertyData.map((property: any) => {
          return <ListingCard data={property} />;
        });
      };

      return (
        <div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{properties()}</div>
          <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
      );
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
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>

      <div>
        <Space>
          <h1>Filters</h1>
          <Button type="link" onClick={() => clearFilter()}>
            Clear filters
          </Button>
        </Space>

        {/* Type */}
        <h2 className="font-bold">Type </h2>
        <CheckboxGroup
          key={FilterNames.Type}
          options={PropertyTypes.map((value: string) => {
            const count = data?.propertiesSearch?.facets?.type?.find(
              (t) => t?.value === value
            )?.count;
            return {
              label: `${value} ${
                count !== undefined && count !== null && count > 0
                  ? `(${count})`
                  : count === 0
                  ? '(0)'
                  : ''
              }`,
              value: value
            };
          })}
          value={selectedPropertyTypes}
          onChange={(checkedValues) => onPropertyTypeFilterChange(checkedValues as string[])}
        />
        {/* Bedrooms */}
        <h2 className="font-bold">Bedrooms</h2>
        <Radio.Group
          value={bedrooms?.toString()}
          defaultValue={bedrooms?.toString()}
          onChange={onBedroomsClicked}
          buttonStyle="solid"
          optionType="button"
          options={BedroomsFilterOptions}
        />

        {/* Bathrooms */}
        <h2 className="font-bold">Bathrooms</h2>
        <Radio.Group
          value={bathrooms?.toString()}
          defaultValue={bathrooms?.toString()}
          onChange={onBathroomsClicked}
          buttonStyle="solid"
          optionType="button"
          options={BathroomsFilterOptions}
        />

        {/* Amenities */}
        <h2 className="font-bold">Amenities</h2>
        <CheckboxGroup
          key={FilterNames.Amenities}
          options={Amenities.map((value: string) => {
            const count = data?.propertiesSearch?.facets?.amenities?.find(
              (t) => t?.value === value
            )?.count;
            return {
              label: `${value} ${
                count !== undefined && count !== null && count > 0
                  ? `(${count})`
                  : count === 0
                  ? '(0)'
                  : ''
              }`,
              value: value
            };
          })}
          value={selectedAmenities}
          onChange={(checkedValues) => onAmenitiesFilterChange(checkedValues as string[])}
        />

        {/* Additional Amenities */}
        {/* Features */}
        <h2 className="font-bold">Additional Amenities</h2>
        <div style={{ paddingLeft: '20px' }}>
          {AdditionalAmenitiesValues.map((aam: AdditionalAmenities) => {
            return (
              <>
                <h2 className="font-bold">{aam.category}</h2>
                <CheckboxGroup
                  key={aam.category}
                  options={aam.amenities.map((value: string) => {
                    const count =
                      data?.propertiesSearch?.facets?.additionalAmenitiesAmenities?.find(
                        (t) => t?.value === value
                      )?.count;
                    return {
                      label: `${value} ${
                        count !== undefined && count !== null && count > 0
                          ? `(${count})`
                          : count === 0
                          ? '(0)'
                          : ''
                      }`,
                      value: value
                    };
                  })}
                  value={
                    selectedAdditionalAmenities.find((a) => a.category === aam.category)?.amenities
                  }
                  onChange={(checkedValues) =>
                    onAdditionalAmenitiesChange(aam.category, checkedValues as string[])
                  }
                />
              </>
            );
          })}
        </div>
        {/* Price */}
        <h2 className="font-bold">Price</h2>
        <Slider
          range
          marks={prices}
          defaultValue={[minPrice, maxPrice]}
          max={1000000}
          min={0}
          step={null}
          onChange={(values) => onSliderPriceChanged(values)}
          tooltipVisible={false}
          value={[minPrice, maxPrice]}
        />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div>Min price</div>
            <Input value={minPrice} onChange={(e) => onPriceChanged('min', e)} />
          </Col>
          <Col span={12}>
            <div>Max price</div>
            <Input value={maxPrice} onChange={(e) => onPriceChanged('max', e)} />
          </Col>
        </Row>

        {/* squareFeet */}
        <h2 className="font-bold">Square Feet</h2>
        <Space split="-">
          <Select
            defaultValue={minSquareFeet}
            value={minSquareFeet}
            style={{ width: 100 }}
            onChange={(value) => onSquareFeetChanged('min', value)}
          >
            {MinSquareFeetOptions.map((op) => (
              <Option key={op.value} value={op.value} disabled={op.value > maxSquareFeet}>
                {op.label}
              </Option>
            ))}
          </Select>

          <Select
            defaultValue={maxSquareFeet}
            value={maxSquareFeet}
            style={{ width: 100 }}
            onChange={(value) => onSquareFeetChanged('max', value)}
          >
            {MaxSquareFeetOptions.map((op) => (
              <Option key={op.value} value={op.value} disabled={op.value < minSquareFeet}>
                {op.label}
              </Option>
            ))}
          </Select>
        </Space>
      </div>

      {result()}
    </>
  );
};
