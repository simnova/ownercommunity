import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, Input, Button, Space, AutoComplete, Pagination, List, Modal, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AdditionalAmenities,
  addressQuery,
  FilterNames,
  SearchParamKeys
} from '../../../../constants';
import { PropertiesListSearchToolbar } from './properties-list-search-toolbar';
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
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [top, setTop] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    const qspage = searchParams.get('page');

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

    // page - for pagination
    if (qspage) {
      console.log('PAGE IS: ', qspage);
      setCurrentPage(parseInt(qspage) - 1);
    }

    setSelectedFilter(filters);
    // setSkip(currentPage * top);
    handleSearch(qssearchString ?? '', filters);
  }, []);

  useEffect(() => {
    setSkip(currentPage * top);
    if (mapSasTokenData) {
      handleSearch(searchString, selectedFilter);
    }
  }, [top, currentPage]);

  const handleSearch = async (searchString?: string, filter?: FilterDetail) => {
    navigate(`.?` + searchParams);
    setSkip(currentPage * top);
    console.log('TOP< SKIP, CURRENT PAGE: ', top, skip, currentPage);
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
            filter: filter,
            top: top,
            skip: currentPage !== 0 && skip === 0 ? currentPage * top : skip
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

  const handlePagination = (newPage: number) => {
    const current = newPage - 1;
    setSkip(current * top);
    setCurrentPage(current);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
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
      <PropertiesListSearchToolbar 
        data={data}
        searchString={searchString}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        handleSearch={handleSearch}
        onInputAddressChanged={onInputAddressChanged}
        onInputAddressSelected={onInputAddressSelected}
        handlePagination={handlePagination}
        addresses={addresses}
        top={top}
        setTop={setTop}
        currentPage={currentPage}
        setSearchParams={setSearchParams}
      />
      <div>
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>
      {result()}
    </>
  );
};
