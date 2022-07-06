import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, List, Tag, Form } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  addressQuery,
  FilterNames,
  SearchParamKeys,
  GetFilterFromQueryString,
  MinSquareFeet,
  MaxSquareFeet,
  MinPrice,
  MaxPrice
} from '../../../../constants';
import { PropertiesListSearchToolbar } from './properties-list-search-toolbar';
import { FormTags } from '../../../ui/organisms/form-tags';
interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);
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
  const [hideNullResults, setHideNullResults] = useState(false);
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
    getSelectedFilters();
  }, [searchParams]);

  useEffect(() => {
    // get current page
    const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;

    // get top
    const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');

    // get order by
    const orderBy = searchParams.get(SearchParamKeys.OrderBy) ?? '';
    if (orderBy !== '') setOrderBy([orderBy]);

    // get hide null results
    if (searchParams.get(SearchParamKeys.HideNullResults)) setHideNullResults(true);

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
  }, [orderBy, hideNullResults]);

  useEffect(() => {
    if (data && data.propertiesSearch?.count) {
      const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;
      const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');
      if (data.propertiesSearch?.count < top * page) {
        setCurrentPage(0);
        handleSearch(0, top);
      }
    }
  }, [data]);

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
              FilterNames.Type + ',count:1000',
              FilterNames.AdditionalAmenitiesCategory,
              FilterNames.AdditionalAmenitiesAmenities + ',count:1000',
              FilterNames.Amenities + ',count:1000',
              FilterNames.ListedForLease + ',count:1000',
              FilterNames.ListedForSale + ',count:1000',
              FilterNames.ListedForRent + ',count:1000',
              FilterNames.Bedrooms + ',count:1000',
              FilterNames.Bathrooms + ',count:1000',
              FilterNames.UpdatedAt + ',count:1000',
              FilterNames.CreatedAt + ',count:1000',
              FilterNames.Tags + ',count:1000'
            ],
            filter: filter,
            top: top,
            skip: tempSkip,
            orderBy: orderBy,
            hideNullResults: hideNullResults
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
    // setSearchParams(searchParams);
    setSearchString(value);
    setSelectedFilter({
      ...selectedFilter,
      position: undefined
    });

    let tmp: AddressDataType[] = [];
    if (mapSasTokenData?.getMapSasToken) {
      if (value.length >= 3) {
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
      searchParams.set(SearchParamKeys.SearchString, selectedAddress.value);
      searchParams.set(SearchParamKeys.Latitude, lat.toString());
      searchParams.set(SearchParamKeys.Longitude, long.toString());
      setSearchParams(searchParams);
      setSelectedFilter({
        ...selectedFilter,
        position: {
          latitude: lat,
          longitude: long
        }
      });
    }
  };

  const getSelectedFilters = () => {
    let tempList: string[] = [];
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
    const qsupdatedAt = searchParams.get(SearchParamKeys.UpdatedAt); // in days
    const qscreatedAt = searchParams.get(SearchParamKeys.CreatedAt); // in days
    const qsTags = searchParams.get(SearchParamKeys.Tags)?.split(',');

    if (qsproperTypes) {
      const propTypes = qsproperTypes.map((type) => 'Type:' + type);
      tempList.push(...propTypes);
    }

    if (qsbedrooms) {
      const bedrooms = 'Bedrooms:' + qsbedrooms;
      tempList.push(bedrooms);
    }

    if (qsbathrooms) {
      const bathrooms = 'Bathrooms:' + qsbathrooms;
      tempList.push(bathrooms);
    }

    if (qsminPrice) {
      if (qsminPrice !== MinPrice.toString()) {
        const minPrice = 'MinPrice:' + qsminPrice;
        tempList.push(minPrice);
      }
    }

    if (qsmaxPrice) {
      if (qsmaxPrice !== MaxPrice.toString()) {
        const maxPrice = 'MaxPrice:' + qsmaxPrice;
        tempList.push(maxPrice);
      }
    }

    if (qsminSquareFeet) {
      if (qsminSquareFeet !== MinSquareFeet.toString()) {
        const minSquareFeet = 'MinSquareFeet:' + qsminSquareFeet;
        tempList.push(minSquareFeet);
      }
    }

    if (qsmaxSquareFeet) {
      if (qsmaxSquareFeet !== MaxSquareFeet.toString()) {
        const maxSquareFeet = 'MaxSquareFeet:' + qsmaxSquareFeet;
        tempList.push(maxSquareFeet);
      }
    }

    if (qsamenities) {
      const amenities = qsamenities.map((amenity) => 'Amenities:' + amenity);
      tempList.push(...amenities);
    }

    // if (qsadditionalAmenities) {
    //   const additionalAmenities = qsadditionalAmenities.map((amenity) => 'AdditionalAmenities:' + amenity);
    //   tempList.push(...additionalAmenities);
    // }

    if (qsListedInfo) {
      const listedInfo = qsListedInfo.map((listedInfo) => 'ListedInfo:' + listedInfo);
      tempList.push(...listedInfo);
    }

    if (qsupdatedAt) {
      const updatedAt = 'UpdatedAt:' + qsupdatedAt;
      tempList.push(updatedAt);
    }

    if (qscreatedAt) {
      const createdAt = 'CreatedAt:' + qscreatedAt;
      tempList.push(createdAt);
    }

    if (qsdistance) {
      const distance = 'Distance:' + qsdistance;
      tempList.push(distance);
    }

    if (qsTags) {
      const tags = qsTags.map((tag) => 'Tags:' + tag);
      tempList.push(...tags);
    }

    return setSelectedFilterList(tempList);
  };

  const handleRemoveFilter = (filter: string) => {
    const tempList = selectedFilterList.filter((item) => item !== filter);
    setSelectedFilterList(tempList);
    let section = filter.split(':')[0];
    let value = filter.split(':')[1];

    if (section === 'Type') {
      const qsproperTypes = searchParams.get(SearchParamKeys.PropertyType)?.split(',');
      let newPropertyTypes = qsproperTypes?.filter((type) => type !== value);
      if (newPropertyTypes && newPropertyTypes.length > 0) {
        searchParams.set(SearchParamKeys.PropertyType, newPropertyTypes.join(','));
      } else {
        searchParams.delete(SearchParamKeys.PropertyType);
      }
    }

    if (section === 'Bedrooms') {
      searchParams.delete(SearchParamKeys.Bedrooms);
    }

    if (section === 'Bathrooms') {
      searchParams.delete(SearchParamKeys.Bathrooms);
    }

    if (section === 'MinPrice') {
      searchParams.set(SearchParamKeys.MinPrice, '0');
    }

    if (section === 'MaxPrice') {
      searchParams.set(SearchParamKeys.MaxPrice, '1000000');
    }

    if (section === 'MinSquareFeet') {
      searchParams.set(SearchParamKeys.MinSquareFeet, '0');
    }

    if (section === 'MaxSquareFeet') {
      searchParams.set(SearchParamKeys.MaxSquareFeet, '100000');
    }

    if (section === 'Amenities') {
      const qsamenities = searchParams.get(SearchParamKeys.Amenities)?.split(',');
      let newAmenities = qsamenities?.filter((amenity) => amenity !== value);
      if (newAmenities && newAmenities.length > 0) {
        searchParams.set(SearchParamKeys.Amenities, newAmenities.join(','));
      } else {
        searchParams.delete(SearchParamKeys.Amenities);
      }
    }

    // if (section === 'AdditionalAmenities') {
    //   const qsadditionalAmenities = searchParams.get(SearchParamKeys.AdditionalAmenities)?.split(';');
    //   let newAdditionalAmenities = qsadditionalAmenities?.filter((amenity) => amenity !== value);
    //   if (newAdditionalAmenities && newAdditionalAmenities.length > 0) {
    //     searchParams.set(SearchParamKeys.AdditionalAmenities, newAdditionalAmenities.join(';'));
    //   } else {
    //     searchParams.delete(SearchParamKeys.AdditionalAmenities);
    //   }
    // }

    if (section === 'ListedInfo') {
      const qsListedInfo = searchParams.get(SearchParamKeys.ListedInfo)?.split(',');
      let newListedInfo = qsListedInfo?.filter((listedInfo) => listedInfo !== value);
      if (newListedInfo && newListedInfo.length > 0) {
        searchParams.set(SearchParamKeys.ListedInfo, newListedInfo.join(','));
      } else {
        searchParams.delete(SearchParamKeys.ListedInfo);
      }
    }

    if (section === 'UpdatedAt') {
      searchParams.delete(SearchParamKeys.UpdatedAt);
    }

    if (section === 'CreatedAt') {
      searchParams.delete(SearchParamKeys.CreatedAt);
    }

    if (section === 'Distance') {
      searchParams.delete(SearchParamKeys.Distance);
    }

    if (section === 'Tags') {
      const qsTags = searchParams.get(SearchParamKeys.Tags)?.split(',');
      let newTags = qsTags?.filter((tag) => tag !== value);
      if (newTags && newTags.length > 0) {
        searchParams.set(SearchParamKeys.Tags, newTags.join(','));
      } else {
        searchParams.delete(SearchParamKeys.Tags);
      }
    }

    // searchParams.delete(filter);
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
      return (
        <div>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4
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
        setSearchString={setSearchString}
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
        setHideNullResults={setHideNullResults}
      />

      <div>
        {/* <Tag closable onClose={(e) => console.log(e.target)}>
          test
        </Tag> */}
        {/* <FormTags value={selectedFilterList} onChange={setSelectedFilterList} /> */}
        {selectedFilterList.map((filter: string) => {
          return (
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilter(filter);
              }}
            >
              {filter}
            </Tag>
          );
        })}
      </div>

      <div>
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>
      {result()}
    </>
  );
};
