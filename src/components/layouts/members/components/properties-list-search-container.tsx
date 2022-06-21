import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, Space, Button, AutoComplete, Input } from 'antd';
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

interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
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
    if (!location.search) {
      setSearchString('');
    }
  }, [location]);

  // get selected filters from query string (when page is loaded)
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
      filters = {
        ...selectedFilter,
        propertyType: qsproperTypes
      };
    }
    if (qsbedrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bedrooms: parseInt(qsbedrooms)
        }
      };
    }
    if (qsbathrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bathrooms: parseFloat(qsbathrooms)
        }
      };
    }

    if (qsamenities) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          amenities: qsamenities
        }
      };
    }

    if (qsminPrice && qsmaxPrice) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          prices: [parseInt(qsminPrice), parseInt(qsmaxPrice)]
        }
      };
    }

    if (qsminSquareFeet && qsmaxSquareFeet) {
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
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          additionalAmenities: temp
        }
      };
    }

    // distance
    const qsdistance = searchParams.get('distance');
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
    const qslat = searchParams.get('lat');
    const qslong = searchParams.get('long');
    if (qslat && qslong) {
      filters = {
        ...filters,
        position: {
          latitude: parseFloat(qslat),
          longitude: parseFloat(qslong)
        }
      };
    }

    setSelectedFilter(filters);
    handleSearch(qssearchString ?? '', filters);
  }, []);

  useEffect(() => {
    if (mapSasTokenData) {
      console.log('mapSasTokenData', mapSasTokenData);
    }
  }, [mapSasTokenData]);

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
              FilterNames.Amenities + ',count:30',
              FilterNames.ListedForLease + ',count:30',
              FilterNames.ListedForSale + ',count:30',
              FilterNames.ListedForRent + ',count:30'
            ],
            filter: filter
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
              // return address
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
        {/* <Input
          placeholder="Enter an address"
          onPressEnter={(e: any) => handleSearch(e.target.value, selectedFilter)}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        /> */}
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

        <Button type="primary" onClick={() => handleSearch(searchString, selectedFilter)}>
          Search
        </Button>
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
      />
      {result()}
    </>
  );
};
