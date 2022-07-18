import { useQuery } from '@apollo/client';
import { Skeleton } from 'antd';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MemberNameServiceTicketContainerDocument } from '../../../../generated';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { ServiceTicketsSearchToolbar } from './service-tickets-search-toolbar';

export const ServiceTicketsSearchContainer: FC<any> = (props) => {
  const params = useParams();

  const { data, loading, error } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  } else if (loading) {
    return <Skeleton active />;
  } else if (data) {
    return (
        <>
          <ServiceTicketsSearchToolbar memberData={data}/>
          <ServiceTicketsSearchFilters memberData={data} searchData={props.searchData} />
        </>
    );
  }
  return null;
};
