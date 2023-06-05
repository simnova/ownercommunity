import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CustomViewOperation, SearchType, ServiceTicketSearchParamKeys } from '../../../../constants';
import {
  CustomViewInput,
  MemberMutationResult,
  MemberNameServiceTicketContainerDocument,
  MemberServiceTicketCustomViewsDocument,
  MemberServiceTicketSearchContainerCustomViewsUpdateDocument
} from '../../../../generated';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { SearchToolbar } from '../../shared/components/search-toolbar';

export const ServiceTicketsSearchContainer: FC<any> = (props) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [updateCustomViews] = useMutation(MemberServiceTicketSearchContainerCustomViewsUpdateDocument, {
    update(cache, { data }) {
      // update the list of custom views
      const newCustomViews = data?.memberUpdate.member?.customViews;
      const memberForCurrentUser = cache.readQuery({
        query: MemberServiceTicketCustomViewsDocument,
        variables: { communityId: params.communityId ?? '' }
      })?.memberForCurrentUser;
      if (newCustomViews && memberForCurrentUser) {
        cache.writeQuery({
          query: MemberServiceTicketCustomViewsDocument,
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
    data: membersData,
    loading,
    error
  } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
    // fetchPolicy: 'cache-and-network'
  });

  const {
    data: customViewsData,
    loading: customViewsLoading,
    error: customViewsError
  } = useQuery(MemberServiceTicketCustomViewsDocument, {
    variables: { communityId: params.communityId ?? '' }
    // fetchPolicy: 'cache-and-network'
  });

  const handleUpdateCustomView = async (
    memberId: string,
    customViews: CustomViewInput[],
    operation: CustomViewOperation
  ) => {
    
    let data: MemberMutationResult|undefined
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
    searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    searchParams.delete(ServiceTicketSearchParamKeys.AssignedTo);
    searchParams.delete(ServiceTicketSearchParamKeys.Status);
    searchParams.delete(ServiceTicketSearchParamKeys.Priority);
    searchParams.delete(ServiceTicketSearchParamKeys.Column);
    searchParams.delete(ServiceTicketSearchParamKeys.Sort);

    setSearchParams(searchParams);
  }

  if (error || customViewsError) {
    return (
      <div>
        <div>{JSON.stringify(error)}</div>
        <div>{JSON.stringify(customViewsError)}</div>
      </div>
    );
  } else if (loading || customViewsLoading) {
    return <Skeleton active />;
  } else if (membersData && customViewsData) {
    return (
      <>
        <SearchToolbar
          type={SearchType.ServiceTicket}
          memberData={membersData}
          customViewData={customViewsData}
          handleUpdateCustomView={handleUpdateCustomView}
          clearFilter={clearFilter}
        />
        <ServiceTicketsSearchFilters memberData={membersData} searchData={props.searchData} />
      </>
    );
  }
  return null;
};
