import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
} from '../../../../generated';
import { Skeleton, List } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  addressQuery,
  FilterNames,
  SearchParamKeys,
  GetFilterFromQueryString
} from '../../../../constants';
import { PropertiesListSearchToolbar } from './properties-list-search-toolbar';
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
  const [currentPage, setCurrentPage] = useState<number | undefined>(
    searchParams.get(SearchParamKeys.Page)
      ? parseInt(searchParams.get(SearchParamKeys.Page)!) - 1
      : undefined
  );
  const [orderBy, setOrderBy] = useState<string[]>(['']);
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
    // get current page
    const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;

    // get top
    const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');

    // get order by
    const orderBy = searchParams.get(SearchParamKeys.OrderBy) ?? '';
    if (orderBy !== '') setOrderBy([orderBy]);

    handleSearch(page, top);
  }, []);

  useEffect(() => {
    if (!location.search) {
      setSearchString('');
      searchParams.set(SearchParamKeys.Page, '1');
      setSearchParams(searchParams);
    }
  }, [location]);

  useEffect(() => {
    const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;
    const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');
    handleSearch(page, top);
  }, [orderBy]);

  const handleSearch = async (page: number, top: number) => {
    // set top here to fix the issue of top/current page not being set in the url
    searchParams.set(SearchParamKeys.Top, top.toString());
    searchParams.set(SearchParamKeys.Page, (page + 1).toString());
    setSearchParams(searchParams);
    navigate(`.?` + searchParams);

    // get search string
    const qsSearchString = searchParams.get(SearchParamKeys.SearchString) ?? '';

    // get filter
    const filter = GetFilterFromQueryString(searchParams, selectedFilter ?? {});

    let tempSkip = page * top;

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
            top: top,
            skip: tempSkip,
            orderBy: orderBy
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
        top={top}
        setTop={setTop}
        addresses={addresses}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
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
