import { useMutation, useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
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
  const [updateCustomViews] = useMutation(MemberServiceTicketSearchContainerCustomViewsUpdateDocument);

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

  const handleUpdateCustomView = async (memberId: string, customViews: CustomViewInput[]) => {
    await updateCustomViews({
      variables: {
        input: {
          id: memberId,
          customViews: customViews
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
          handleUpdateCustomView={handleUpdateCustomView}
        />
        <ServiceTicketsSearchFilters memberData={membersData} searchData={props.searchData} />
      </>
    );
  }
  return null;
};
