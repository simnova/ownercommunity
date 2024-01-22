import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { useParams } from 'react-router-dom';
import { CustomViewOperation, SearchType } from '../../../../constants';
import {
    CustomViewInput,
    MemberMutationResult,
    MemberNameServiceTicketContainerQuery,
    MemberPropertiesGetAllTagsQuery,
    PropertySearchFacets,
    SearchDrawerContainerCustomViewsDocument,
    SearchDrawerContainerCustomViewsUpdateDocument
} from '../../../../generated';
import { ServiceTicketsSearchFilters } from '../../members/components/service-tickets-search-filters';
import { SearchToolbar } from './search-toolbar';
import PropertiesListSearchFilters from '../../members/components/properties-list-search-filters';

interface SearchDrawerContainerProps {
  type: SearchType;
  searchData: any;
  customData: {
    data: any;
    loading: boolean;
    error: any;
  };
  clearFilter: () => void;
}

export const SearchDrawerContainer: React.FC<SearchDrawerContainerProps> = (props) => {
  const params = useParams();
  const [updateCustomViews] = useMutation(SearchDrawerContainerCustomViewsUpdateDocument, {
    update(cache, { data }) {
      // update the list of custom views
      const newCustomViews = data?.memberUpdate.member?.customViews;
      const memberForCurrentUser = cache.readQuery({
        query: SearchDrawerContainerCustomViewsDocument,
        variables: { communityId: params.communityId ?? '' }
      })?.memberForCurrentUser;
      if (newCustomViews && memberForCurrentUser) {
        cache.writeQuery({
          query: SearchDrawerContainerCustomViewsDocument,
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

  const {
    data: customViewsData,
    loading: customViewsLoading,
    error: customViewsError
  } = useQuery(SearchDrawerContainerCustomViewsDocument, {
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

  if (customViewsError || props.customData.error) {
    return (
      <div>
        <div>{JSON.stringify(props.customData.error)}</div>
        <div>{JSON.stringify(customViewsError)}</div>
      </div>
    );
  }
  if (customViewsLoading || props.customData.loading) {
    return <Skeleton active />;
  }
  if (customViewsData && props.customData.data) {
    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <SearchToolbar
            type={props.type}
            customViewData={customViewsData}
            customData={props.customData.data}
            handleUpdateCustomView={handleUpdateCustomView}
            clearFilter={props.clearFilter}
          />
        </div>
        {props.type === SearchType.Property ? (
          <PropertiesListSearchFilters
            facets={props.searchData?.facets as PropertySearchFacets}
            searchData={props.searchData}
            tagData={props.customData.data.getAllPropertyTags as string[]}
          />
        ) : (
          <ServiceTicketsSearchFilters searchData={props.searchData} memberData={props.customData.data as MemberNameServiceTicketContainerQuery | MemberPropertiesGetAllTagsQuery} />
        )}
      </>
    );
  }
  return <></>;
};
