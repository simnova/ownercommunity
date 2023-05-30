import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument
} from '../../../../generated';
import { Skeleton, List, Tag, theme } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom';
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
interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const {
    token: { colorText }
  } = theme.useToken();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(SearchParamKeys.SearchString) ?? '');
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const params = useParams();

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
    searchParams.set(SearchParamKeys.Page, searchParams.get(SearchParamKeys.Page) ?? '1');
    searchParams.set(SearchParamKeys.Top, searchParams.get(SearchParamKeys.Top) ?? '10');
    setSearchParams(searchParams);
    (async () => {
      await handleSearch();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleSearch();
    })();
  }, [searchParams]);

  // useEffect(() => {
  //   if (!location.search) {
  //     setSearchString('');
  //     searchParams.set(SearchParamKeys.Page, '1');
  //     setSearchParams(searchParams);
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (data && data.propertiesSearch?.count) {
  //     const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;
  //     const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');
  //     if (data.propertiesSearch?.count < top * page) {
  //       setCurrentPage(0);
  //       (async () => {
  //         await handleSearch();
  //       })();
  //     }
  //   }
  // }, [data]);

  const handleSearch = async () => {
    if (searchString.length > 0) {
      searchParams.set(SearchParamKeys.SearchString, searchString);
    } else {
      searchParams.delete(SearchParamKeys.SearchString);
    }
    setSearchParams(searchParams);
    
    // set top here to fix the issue of top/current page not being set in the url
    const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;
    const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');
    const skip = page * top;

    // get search string
    const qsSearchString = searchString;

    // get filter
    let filter: FilterDetail = GetFilterFromQueryString(searchParams, params.communityId ?? '');
    const orderBy = searchParams.get(SearchParamKeys.OrderBy) ?? '';

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
            skip: skip,
            orderBy: [orderBy],
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
    }
  };

  // const getSelectedFilters = () => {
  //   let tempList: string[] = [];
  //   const qsproperTypes = searchParams.get('type')?.split(',');
  //   const qsbedrooms = searchParams.get('bedrooms');
  //   const qsbathrooms = searchParams.get('bathrooms');
  //   const qsminPrice = searchParams.get('minPrice');
  //   const qsmaxPrice = searchParams.get('maxPrice');
  //   const qsminSquareFeet = searchParams.get('minSquareFeet');
  //   const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
  //   const qsamenities = searchParams.get('amenities')?.split(',');
  //   const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');
  //   const qsdistance = searchParams.get('distance');
  //   const qsListedInfo = searchParams.get('listedInfo')?.split(',');
  //   const qslat = searchParams.get('lat');
  //   const qslong = searchParams.get('long');
  //   const qsupdatedAt = searchParams.get(SearchParamKeys.UpdatedAt); // in days
  //   const qscreatedAt = searchParams.get(SearchParamKeys.CreatedAt); // in days
  //   const qsTags = searchParams.get(SearchParamKeys.Tags)?.split(',');

  //   if (qsproperTypes) {
  //     const propTypes = qsproperTypes.map((type) => 'Type:' + type);
  //     tempList.push(...propTypes);
  //   }

  //   if (qsbedrooms) {
  //     const bedrooms = 'Bedrooms:' + qsbedrooms;
  //     tempList.push(bedrooms);
  //   }

  //   if (qsbathrooms) {
  //     const bathrooms = 'Bathrooms:' + qsbathrooms;
  //     tempList.push(bathrooms);
  //   }

  //   if (qsminPrice) {
  //     if (qsminPrice !== MinPrice.toString()) {
  //       const minPrice = 'MinPrice:' + qsminPrice;
  //       tempList.push(minPrice);
  //     }
  //   }

  //   if (qsmaxPrice) {
  //     if (qsmaxPrice !== MaxPrice.toString()) {
  //       const maxPrice = 'MaxPrice:' + qsmaxPrice;
  //       tempList.push(maxPrice);
  //     }
  //   }

  //   if (qsminSquareFeet) {
  //     if (qsminSquareFeet !== MinSquareFeet.toString()) {
  //       const minSquareFeet = 'MinSquareFeet:' + qsminSquareFeet;
  //       tempList.push(minSquareFeet);
  //     }
  //   }

  //   if (qsmaxSquareFeet) {
  //     if (qsmaxSquareFeet !== MaxSquareFeet.toString()) {
  //       const maxSquareFeet = 'MaxSquareFeet:' + qsmaxSquareFeet;
  //       tempList.push(maxSquareFeet);
  //     }
  //   }

  //   if (qsamenities) {
  //     const amenities = qsamenities.map((amenity) => 'Amenities:' + amenity);
  //     tempList.push(...amenities);
  //   }

  //   if (qsadditionalAmenities) {
  //     console.log(qsadditionalAmenities);

  //     const additionalAmenities: string[] = [];
  //     qsadditionalAmenities.forEach((amenity) => {
  //       let category = amenity.split(':')[0];
  //       let amenities = amenity.split(':')[1].split(',');
  //       amenities.forEach((amenity) => {
  //         additionalAmenities.push('AdditionalAmenities:' + category + '-' + amenity);
  //       });
  //     });
  //     tempList.push(...additionalAmenities);
  //   }

  //   if (qsListedInfo) {
  //     const listedInfo = qsListedInfo.map((listedInfo) => 'ListedInfo:' + listedInfo);
  //     tempList.push(...listedInfo);
  //   }

  //   if (qsupdatedAt) {
  //     const updatedAt = 'UpdatedAt:' + qsupdatedAt;
  //     tempList.push(updatedAt);
  //   }

  //   if (qscreatedAt) {
  //     const createdAt = 'CreatedAt:' + qscreatedAt;
  //     tempList.push(createdAt);
  //   }

  //   if (qsdistance) {
  //     const distance = 'Distance:' + qsdistance;
  //     tempList.push(distance);
  //   }

  //   if (qsTags) {
  //     const tags = qsTags.map((tag) => 'Tags:' + tag);
  //     tempList.push(...tags);
  //   }

  //   return setSelectedFilterList(tempList);
  // };

  // const handleRemoveFilter = (filter: string) => {
  //   const tempList = selectedFilterList.filter((item) => item !== filter);
  //   setSelectedFilterList(tempList);
  //   let section = filter.split(':')[0];
  //   let value = filter.split(':')[1];

  //   if (section === 'Type') {
  //     const qsproperTypes = searchParams.get(SearchParamKeys.PropertyType)?.split(',');
  //     let newPropertyTypes = qsproperTypes?.filter((type) => type !== value);
  //     if (newPropertyTypes && newPropertyTypes.length > 0) {
  //       searchParams.set(SearchParamKeys.PropertyType, newPropertyTypes.join(','));
  //     } else {
  //       searchParams.delete(SearchParamKeys.PropertyType);
  //     }
  //   }

  //   if (section === 'Bedrooms') {
  //     searchParams.delete(SearchParamKeys.Bedrooms);
  //   }

  //   if (section === 'Bathrooms') {
  //     searchParams.delete(SearchParamKeys.Bathrooms);
  //   }

  //   if (section === 'MinPrice') {
  //     searchParams.set(SearchParamKeys.MinPrice, '0');
  //   }

  //   if (section === 'MaxPrice') {
  //     searchParams.set(SearchParamKeys.MaxPrice, '1000000');
  //   }

  //   if (section === 'MinSquareFeet') {
  //     searchParams.set(SearchParamKeys.MinSquareFeet, '0');
  //   }

  //   if (section === 'MaxSquareFeet') {
  //     searchParams.set(SearchParamKeys.MaxSquareFeet, '100000');
  //   }

  //   if (section === 'Amenities') {
  //     const qsamenities = searchParams.get(SearchParamKeys.Amenities)?.split(',');
  //     let newAmenities = qsamenities?.filter((amenity) => amenity !== value);
  //     if (newAmenities && newAmenities.length > 0) {
  //       searchParams.set(SearchParamKeys.Amenities, newAmenities.join(','));
  //     } else {
  //       searchParams.delete(SearchParamKeys.Amenities);
  //     }
  //   }

  //   if (section === 'AdditionalAmenities') {
  //     //Get the category and amenity
  //     const deletedCategory = value.split('-')[0];
  //     const deletedAmenity = value.split('-')[1];
  //     const qsadditionalAmenities = searchParams.get(SearchParamKeys.AdditionalAmenities)?.split(';'); // [Features:Iron,Washer/Dryer (Private) , Location:Oceanfront , Outdoor:Balcony]

  //     if (qsadditionalAmenities) {
  //       for (let i = 0; i < qsadditionalAmenities.length; i++) {
  //         let category = qsadditionalAmenities[i].split(':')[0];
  //         let amenities = qsadditionalAmenities[i].split(':')[1].split(',');
  //         if (category === deletedCategory) {
  //           amenities = amenities.filter((amenity) => amenity !== deletedAmenity);
  //           if (amenities.length > 0) {
  //             qsadditionalAmenities[i] = category + ':' + amenities.join(',');
  //           } else {
  //             qsadditionalAmenities.splice(i, 1);
  //           }
  //         }
  //       }
  //     }
  //     if (qsadditionalAmenities && qsadditionalAmenities.length > 0) {
  //       searchParams.set(SearchParamKeys.AdditionalAmenities, qsadditionalAmenities.join(';'));
  //     } else {
  //       searchParams.delete(SearchParamKeys.AdditionalAmenities);
  //     }
  //   }

  //   if (section === 'ListedInfo') {
  //     const qsListedInfo = searchParams.get(SearchParamKeys.ListedInfo)?.split(',');
  //     let newListedInfo = qsListedInfo?.filter((listedInfo) => listedInfo !== value);
  //     if (newListedInfo && newListedInfo.length > 0) {
  //       searchParams.set(SearchParamKeys.ListedInfo, newListedInfo.join(','));
  //     } else {
  //       searchParams.delete(SearchParamKeys.ListedInfo);
  //     }
  //   }

  //   if (section === 'UpdatedAt') {
  //     searchParams.delete(SearchParamKeys.UpdatedAt);
  //   }

  //   if (section === 'CreatedAt') {
  //     searchParams.delete(SearchParamKeys.CreatedAt);
  //   }

  //   if (section === 'Distance') {
  //     searchParams.delete(SearchParamKeys.Distance);
  //   }

  //   if (section === 'Tags') {
  //     const qsTags = searchParams.get(SearchParamKeys.Tags)?.split(',');
  //     let newTags = qsTags?.filter((tag) => tag !== value);
  //     if (newTags && newTags.length > 0) {
  //       searchParams.set(SearchParamKeys.Tags, newTags.join(','));
  //     } else {
  //       searchParams.delete(SearchParamKeys.Tags);
  //     }
  //   }

  //   // searchParams.delete(filter);
  //   setSearchParams(searchParams);
  // };

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
      const generatedPropertyData = JSON.parse(JSON.stringify(data.propertiesSearch?.propertyResults, null, 2));
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
          <pre
            style={{
              color: colorText
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
          ;
        </div>
      );
    }
    return <div>Search Please</div>;
  };

  return (
    <>
      {/* <div>
        {se.map((filter: string) => {
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
      </div> */}

      <div>{data?.propertiesSearch?.count ? '(' + data?.propertiesSearch?.count + ' records found)' : ''}</div>
      <PropertiesListSearchToolbar
        data={data}
        searchString={searchString}
        setSearchString={setSearchString}
        handleSearch={handleSearch}
        onInputAddressChanged={onInputAddressChanged}
        onInputAddressSelected={onInputAddressSelected}
        addresses={addresses}
      />

      {result()}
    </>
  );
};
