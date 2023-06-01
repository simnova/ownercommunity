import { useLazyQuery, useQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesGetAllTagsDocument,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
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
import { PropertiesListSearchFilters } from './properties-list-search-filters';
interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

interface PropertiesListSearchDrawerContainerProps {
  searchData: any;
}

export const PropertiesListSearchDrawerContainer: React.FC<PropertiesListSearchDrawerContainerProps> = (props) => {
  const {
    token: { colorText }
  } = theme.useToken();
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const params = useParams();

  const { data: tagData, loading: tagLoading, error: tagError } = useQuery(MemberPropertiesGetAllTagsDocument);

  // const onInputAddressChanged = (value: string) => {
  //   if (!value) {
  //     searchParams.delete('search');
  //   } else {
  //     searchParams.set('search', value);
  //   }

  //   searchParams.delete('lat');
  //   searchParams.delete('long');
  //   // setSearchParams(searchParams);
  //   setSearchString(value);

  //   let tmp: AddressDataType[] = [];
  //   if (mapSasTokenData?.getMapSasToken) {
  //     if (value.length >= 3) {
  //       addressQuery(value, mapSasTokenData?.getMapSasToken).then((addressData) => {
  //         addressData.filter((address: any) => {
  //           if (address.address.streetNumber && address.address.streetName) {
  //             tmp.push({
  //               label: address.address.freeformAddress,
  //               value: address.address.freeformAddress,
  //               key: address.id,
  //               address: address.address,
  //               lat: address.position.lat,
  //               long: address.position.lon
  //             });
  //           }
  //         });
  //         setAddresses(tmp);
  //       });
  //     }
  //   }
  // };

  // const onInputAddressSelected = (value: string) => {
  //   setSearchString(value);
  //   // find selected address in addresses
  //   const selectedAddress = addresses.find((address: any) => {
  //     return address.label === value;
  //   });
  //   if (selectedAddress) {
  //     const lat = selectedAddress.lat;
  //     const long = selectedAddress.long;
  //     searchParams.set(SearchParamKeys.SearchString, selectedAddress.value);
  //     searchParams.set(SearchParamKeys.Latitude, lat.toString());
  //     searchParams.set(SearchParamKeys.Longitude, long.toString());
  //     setSearchParams(searchParams);
  //   }
  // };

  if (tagError) {
    return <div>{JSON.stringify(tagError)}</div>;
  }
  if (tagLoading) {
    return <Skeleton active />;
  }
  if (tagData) {
    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <PropertiesListSearchToolbar searchData={props.searchData} tagData={tagData.getAllPropertyTags as string[]} />
        </div>
        <PropertiesListSearchFilters
          facets={props.searchData?.facets as PropertySearchFacets}
          searchData={props.searchData}
          tagData={tagData.getAllPropertyTags as string[]}
        />
      </>
    );
  }
  return null;
};
