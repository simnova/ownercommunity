import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, message } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { CustomViewOperation } from '../../../../constants';
import {
  CustomViewInput,
  MemberNameServiceTicketContainerDocument,
  MemberServiceTicketCustomViewsDocument,
  MemberServiceTicketSearchContainerCustomViewsUpdateDocument
} from '../../../../generated';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { ServiceTicketsSearchToolbar } from './service-tickets-search-toolbar';

export const ServiceTicketsSearchContainer: FC<any> = (props) => {
  const params = useParams();
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
    await updateCustomViews({
      variables: {
        input: {
          id: memberId,
          customViews: customViews
        }
      }
    }).then(() => {
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
    });
  };

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
        <ServiceTicketsSearchToolbar
          memberData={membersData}
          customViewsData={customViewsData}
          handleUpdateCustomView={handleUpdateCustomView}
        />
        <ServiceTicketsSearchFilters memberData={membersData} searchData={props.searchData} />
      </>
    );
  }
  return null;
};
