import { useMutation, useQuery } from '@apollo/client';
import {
  CustomViewInput,
  MemberMutationResult,
  MemberPropertiesGetAllTagsDocument,
  MemberPropertiesListSearchContainerCustomViewsUpdateDocument,
  MemberPropertiesListSearchCustomViewsDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, message, theme } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropertiesListSearchToolbar } from './properties-list-search-toolbar';
import { PropertiesListSearchFilters } from './properties-list-search-filters';
import { CustomViewOperation } from '../../../../constants';
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

  const [updateCustomViews] = useMutation(MemberPropertiesListSearchContainerCustomViewsUpdateDocument, {
    update(cache, { data }) {
      // update the list of custom views
      const newCustomViews = data?.memberUpdate.member?.customViews;
      const memberForCurrentUser = cache.readQuery({
        query: MemberPropertiesListSearchCustomViewsDocument,
        variables: { communityId: params.communityId ?? '' }
      })?.memberForCurrentUser;
      if (newCustomViews && memberForCurrentUser) {
        cache.writeQuery({
          query: MemberPropertiesListSearchCustomViewsDocument,
          variables: { communityId: params.communityId ?? '' },
          data: {
            memberForCurrentUser: {
              id: memberForCurrentUser?.id,
              customViews: newCustomViews
            }
          }
        });
      }
    }
  });

  const { data: tagData, loading: tagLoading, error: tagError } = useQuery(MemberPropertiesGetAllTagsDocument);

  const {
    data: customViewsData,
    loading: customViewsLoading,
    error: customViewsError
  } = useQuery(MemberPropertiesListSearchCustomViewsDocument, {
    variables: { communityId: params.communityId ?? '' }
    // fetchPolicy: 'cache-and-network'
  });

  const handleUpdateCustomView = async (
    memberId: string,
    customViews: CustomViewInput[],
    operation: CustomViewOperation
  ) => {
    let data: MemberMutationResult | undefined;
    await updateCustomViews({
      variables: {
        input: {
          id: memberId,
          customViews: customViews
        }
      }
    }).then((result) => {
      switch (operation) {
        case CustomViewOperation.Create:
          message.destroy('save-custom-view-loading');
          message.success('Custom view created');
          break;
        case CustomViewOperation.Update:
          message.destroy('save-custom-view-loading');
          message.success('Custom view updated');
          break;
        case CustomViewOperation.Delete:
          message.destroy('delete-custom-view-loading');
          message.success('Custom view deleted');
          break;
      }
      data = result as MemberMutationResult;
    });
    return data;
  };

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

  if (tagError || customViewsError) {
    return (
      <div>
        <div>{JSON.stringify(tagError)}</div>
        <div>{JSON.stringify(customViewsError)}</div>
      </div>
    );
  }
  if (tagLoading || customViewsLoading) {
    return <Skeleton active />;
  }
  if (tagData && customViewsData) {
    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <PropertiesListSearchToolbar
            searchData={props.searchData}
            tagData={tagData.getAllPropertyTags as string[]}
            customViewsData={customViewsData}
            handleUpdateCustomView={handleUpdateCustomView}
          />
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
