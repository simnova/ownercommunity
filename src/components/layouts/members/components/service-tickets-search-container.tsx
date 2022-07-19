import { useMutation, useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  CustomView,
  CustomViewCreateInput,
  MemberNameServiceTicketContainerDocument,
  MemberServiceTicketCustomViewsDocument,
  MembersServiceTicketSearchContainerCustomViewAddDocument,
  MembersServiceTicketSearchContainerCustomViewAddResultFieldsFragmentDoc
} from '../../../../generated';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { ServiceTicketsSearchToolbar } from './service-tickets-search-toolbar';

export const ServiceTicketsSearchContainer: FC<any> = (props) => {
  const params = useParams();

  const {
    data: membersData,
    loading,
    error
  } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

  const {
    data: customViewsData,
    loading: customViewsLoading,
    error: customViewsError
  } = useQuery(MemberServiceTicketCustomViewsDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

  const [gqlCustomViewAdd] = useMutation(MembersServiceTicketSearchContainerCustomViewAddDocument, {
    update(cache, { data }) {
      // update the list with the new item
      const customViews = data?.memberCustomViewAdd.member?.customViews;
      if (customViews) {
        cache.writeQuery({
          query: MemberServiceTicketCustomViewsDocument,
          variables: { communityId: params.communityId ?? '' },
          data: {
            memberForCurrentUser: {
              id: data?.memberCustomViewAdd.member?.id,
              customViews: customViews
            }
          }
        });
      }
    }
  });

  const handleAddNewCustomView = async (memberId: string, customView: CustomViewCreateInput) => {
    await gqlCustomViewAdd({
      variables: {
        input: {
          memberId: memberId,
          customView: customView
        }
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
          addNewCustomViewCb={(memberId, customView) => handleAddNewCustomView(memberId, customView)}
        />
        <ServiceTicketsSearchFilters memberData={membersData} searchData={props.searchData} />
      </>
    );
  }
  return null;
};
