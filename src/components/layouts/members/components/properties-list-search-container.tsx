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
import {
  AdditionalAmenities,
  FilterNames,
  MaxSquareFeetOptions,
  MinSquareFeetOptions
} from '../../../../constants';
import { PropertiesListSearchFilters } from './properties-list-search-filters';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const { Search } = Input;

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
    const qssearchString = searchParams.get('search');
    const qsproperTypes = searchParams.get('type')?.split(',');
    const qsbedrooms = searchParams.get('bedrooms');
    const qsbathrooms = searchParams.get('bathrooms');
    const qsminPrice = searchParams.get('minPrice');
    const qsmaxPrice = searchParams.get('maxPrice');
    const qsminSquareFeet = searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
    const qsamenities = searchParams.get('amenities')?.split(',');
    const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');

    let filters = {} as FilterDetail;
    if (qssearchString) {
      setSearchString(qssearchString);
    }
    if (qsproperTypes) {
      setSelectedPropertyTypes(qsproperTypes);
      filters = {
        ...selectedFilter,
        propertyType: qsproperTypes
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
    handleSearch(qssearchString ?? '', filters);
  }, []);

  useEffect(() => {
    updateQueryString(searchString, selectedFilter);
  }, [selectedFilter, searchString]);

  const updateQueryString = (searchString: string, filters: FilterDetail | undefined) => {
    if (!filters) {
      setSearchParams({});
      return;
    }

    let queryStrings = [];
    if (searchString) {
      queryStrings.push(`search=${searchString}`);
    }
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

  const handleSearch = async (searchString?: string, filter?: FilterDetail) => {
    navigate(`.?` + searchParams);
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
            filter: filter
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
    setSearchString('');
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
      <Space size={0}>
        <Input
          placeholder="Search properties"
          onPressEnter={(e: any) => handleSearch(e.target.value, selectedFilter)}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <Button type="primary" onClick={() => handleSearch(searchString, selectedFilter)}>
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
      </div>

      <PropertiesListSearchFilters
        data={data}
        selectedPropertyTypes={selectedPropertyTypes}
        onPropertyTypeFilterChange={onPropertyTypeFilterChange}
        bedrooms={bedrooms}
        onBedroomsClicked={onBedroomsClicked}
        bathrooms={bathrooms}
        onBathroomsClicked={onBathroomsClicked}
        selectedAmenities={selectedAmenities}
        onAmenitiesFilterChange={onAmenitiesFilterChange}
        selectedAdditionalAmenities={selectedAdditionalAmenities}
        onAdditionalAmenitiesChange={onAdditionalAmenitiesChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChanged={onPriceChanged}
        onSliderPriceChanged={onSliderPriceChanged}
        minSquareFeet={minSquareFeet}
        maxSquareFeet={maxSquareFeet}
        onSquareFeetChanged={onSquareFeetChanged}
      />
      {result()}
    </>
  );
};
