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
import { useParams, useSearchParams } from 'react-router-dom';
import { PropertiesListSearchFilters } from './properties-list-search-filters';
import { CustomViewOperation, SearchParamKeys, SearchType } from '../../../../constants';
import { SearchToolbar } from '../../shared/components/search-toolbar';
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
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const clearFilter = () => {
    searchParams.delete(SearchParamKeys.AdditionalAmenities);
    searchParams.delete(SearchParamKeys.Amenities);
    searchParams.delete(SearchParamKeys.Bathrooms);
    searchParams.delete(SearchParamKeys.Bedrooms);
    searchParams.delete(SearchParamKeys.ListedInfo);
    searchParams.delete(SearchParamKeys.MaxPrice);
    searchParams.delete(SearchParamKeys.MinPrice);
    searchParams.delete(SearchParamKeys.Type);
    searchParams.delete(SearchParamKeys.MaxSquareFeet);
    searchParams.delete(SearchParamKeys.MinSquareFeet);
    searchParams.delete(SearchParamKeys.Distance);
    searchParams.delete(SearchParamKeys.UpdatedAt);
    searchParams.delete(SearchParamKeys.CreatedAt);
    searchParams.delete(SearchParamKeys.SearchString);
    searchParams.delete(SearchParamKeys.Latitude);
    searchParams.delete(SearchParamKeys.Longitude);
    searchParams.delete(SearchParamKeys.SavedFilter);
    searchParams.delete(SearchParamKeys.Tags);
    setSearchParams(searchParams);
  };

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
          <SearchToolbar
            type={SearchType.Property}
            tagData={tagData.getAllPropertyTags as string[]}
            customViewData={customViewsData}
            handleUpdateCustomView={handleUpdateCustomView}
            clearFilter={clearFilter}
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
