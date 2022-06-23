import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, Button, Space, AutoComplete, Pagination, List, Select } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AdditionalAmenities,
  addressQuery,
  FilterNames,
  SearchParamKeys
} from '../../../../constants';
import { PropertiesListSearchFilters } from './properties-list-search-filters';
const { Option } = Select;
interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(
    searchParams.get(SearchParamKeys.SearchString) ?? ''
  );
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [top, setTop] = useState<number | undefined>(
    searchParams.get(SearchParamKeys.Top)
      ? parseInt(searchParams.get(SearchParamKeys.Top)!)
      : undefined
  );
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState<number | undefined>(
    searchParams.get(SearchParamKeys.Page)
      ? parseInt(searchParams.get(SearchParamKeys.Page)!) - 1
      : undefined
  );
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: mapSasTokenData,
    loading: mapSasTokenLoading,
    error: mapSasTokenError
  } = useQuery(MemberPropertiesListSearchContainerMapSasTokenDocument);

  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );

  useEffect(() => {
    // get all info for the search
    const filter = getFilterFromQueryString();
    handleSearch(currentPage);
  }, []);

  useEffect(() => {
    if (!location.search) {
      setSearchString('');
    }
  }, [location]);

  const getFilterFromQueryString = (): FilterDetail => {
    // get all search params
    // const searchParams = new URLSearchParams(location.search);
    const qsproperTypes = searchParams.get('type')?.split(',');
    const qsbedrooms = searchParams.get('bedrooms');
    const qsbathrooms = searchParams.get('bathrooms');
    const qsminPrice = searchParams.get('minPrice');
    const qsmaxPrice = searchParams.get('maxPrice');
    const qsminSquareFeet = searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
    const qsamenities = searchParams.get('amenities')?.split(',');
    const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');
    const qsdistance = searchParams.get('distance');
    const qsListedInfo = searchParams.get('listedInfo')?.split(',');
    const qslat = searchParams.get('lat');
    const qslong = searchParams.get('long');

    let filters = {} as FilterDetail;

    // proper type
    if (qsproperTypes) {
      filters = {
        ...selectedFilter,
        propertyType: qsproperTypes
      };
    }

    // bedrooms
    if (qsbedrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bedrooms: parseInt(qsbedrooms)
        }
      };
    }

    // bathrooms
    if (qsbathrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bathrooms: parseFloat(qsbathrooms)
        }
      };
    }

    // amenities
    if (qsamenities) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          amenities: qsamenities
        }
      };
    }

    // price
    if (qsminPrice && qsmaxPrice) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          prices: [parseInt(qsminPrice), parseInt(qsmaxPrice)]
        }
      };
    }

    // square feet
    if (qsminSquareFeet && qsmaxSquareFeet) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          squareFeets: [parseInt(qsminSquareFeet), parseInt(qsmaxSquareFeet)]
        }
      };
    }

    // additional amenities
    if (qsadditionalAmenities) {
      let temp: AdditionalAmenities[] = [];

      qsadditionalAmenities.forEach((amenity) => {
        const [cate, amen] = amenity.split(':');
        temp.push({
          category: cate,
          amenities: amen.split(',')
        });
      });
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          additionalAmenities: temp
        }
      };
    }

    // listed info
    if (qsListedInfo) {
      filters = {
        ...filters,
        listedInfo: qsListedInfo
      };
    }

    // distance
    if (qsdistance) {
      filters = {
        ...filters,
        distance: parseInt(qsdistance)
      };
    } else {
      filters = {
        ...filters,
        distance: 0
      };
    }

    // lat and long
    if (qslat && qslong) {
      filters = {
        ...filters,
        position: {
          latitude: parseFloat(qslat),
          longitude: parseFloat(qslong)
        }
      };
    }

    return filters;
  };

  const handleSearch = async (page: number = 0) => {
    navigate(`.?` + searchParams);

    // get search string
    const qsSearchString = searchParams.get(SearchParamKeys.SearchString) ?? '';

    // get top
    const qsTop = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');

    // get filter
    const filter = getFilterFromQueryString();

    let tempSkip = page * qsTop;
    setSkip(tempSkip);

    await gqlSearchProperties({
      variables: {
        input: {
          searchString: qsSearchString,
          options: {
            facets: [
              FilterNames.Type,
              FilterNames.AdditionalAmenitiesCategory,
              FilterNames.AdditionalAmenitiesAmenities + ',count:30',
              FilterNames.Amenities + ',count:30',
              FilterNames.ListedForLease + ',count:30',
              FilterNames.ListedForSale + ',count:30',
              FilterNames.ListedForRent + ',count:30'
            ],
            filter: filter,
            top: qsTop,
            skip: tempSkip
          }
        }
      }
    });
  };

  const onInputAddressChanged = (value: string) => {
    if (!value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', value);
    }

    searchParams.delete('lat');
    searchParams.delete('long');
    setSearchParams(searchParams);
    setSearchString(value);
    setSelectedFilter({
      ...selectedFilter,
      position: undefined
    });

    let tmp: AddressDataType[] = [];
    if (mapSasTokenData?.getMapSasToken) {
      if (value.length >= 4) {
        addressQuery(value, mapSasTokenData?.getMapSasToken).then((addressData) => {
          addressData.filter((address: any) => {
            if (address.address.streetNumber && address.address.streetName) {
              tmp.push({
                label: address.address.freeformAddress,
                value: address.address.freeformAddress,
                key: address.id,
                address: address.address,
                lat: address.position.lat,
                long: address.position.lon
              });
            }
          });
          setAddresses(tmp);
        });
      }
    }
  };

  const onInputAddressSelected = (value: string) => {
    setSearchString(value);
    // find selected address in addresses
    const selectedAddress = addresses.find((address: any) => {
      return address.label === value;
    });
    if (selectedAddress) {
      const lat = selectedAddress.lat;
      const long = selectedAddress.long;
      setSearchParams('search=' + selectedAddress.value + '&lat=' + lat + '&long=' + long);
      setSelectedFilter({
        ...selectedFilter,
        position: {
          latitude: lat,
          longitude: long
        }
      });
    }
  };

  const handlePagination = (newPage: number) => {
    const current = newPage - 1;
    setSkip(current * (top ?? 10));
    setCurrentPage(current);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    const filter = getFilterFromQueryString();
    handleSearch(current);
  };

  const result = () => {
    if (error || mapSasTokenError) {
      if (error) {
        return <div>{JSON.stringify(error)}</div>;
      } else {
        return <div>{JSON.stringify(mapSasTokenError)}</div>;
      }
    } else if (loading || mapSasTokenLoading) {
      return <Skeleton active />;
    } else if (called && data) {
      const generatedPropertyData = JSON.parse(
        JSON.stringify(data.propertiesSearch?.propertyResults, null, 2)
      );

      return (
        <div>
          {/* <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{properties()}</div> */}
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3
            }}
            dataSource={generatedPropertyData}
            renderItem={(item) => (
              <List.Item>
                <ListingCard data={item}></ListingCard>
              </List.Item>
            )}
          ></List>
          <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
      );
    }
    return <div>Search Please</div>;
  };

  return (
    <>
      <Space size="large">
        <Space size={0}>
          <AutoComplete
            options={addresses}
            style={{
              width: '400px'
            }}
            placeholder="Enter an address or a property name"
            filterOption={false}
            value={searchString}
            onChange={(value: string) => onInputAddressChanged(value)}
            onSelect={(value: string) => onInputAddressSelected(value)}
          ></AutoComplete>

          <Button type="primary" onClick={() => handleSearch(0)}>
            Search
          </Button>
        </Space>
        <Pagination
          current={(currentPage ?? 0) + 1}
          total={data?.propertiesSearch?.count ?? 10}
          pageSize={top ?? 10}
          onChange={(page) => handlePagination(page)}
        />
      </Space>
      <div>
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>

      <PropertiesListSearchFilters
        facets={data?.propertiesSearch?.facets as PropertySearchFacets}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        handleSearch={handleSearch}
        searchString={searchString}
        setTop={setTop}
        setCurrentPage={setCurrentPage}
      />
      {result()}
    </>
  );
};
