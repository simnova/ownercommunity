import { useQuery } from '@apollo/client';
import { AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument } from '../../../../generated';
import { ServiceTicketsList } from './service-tickets-list';
import { Skeleton } from 'antd';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const {
    data: serviceTicketData,
    loading: serviceTicketLoading,
    error: serviceTicketError
  } = useQuery(AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument, {
    variables: { communityId: props.data.communityId }
  });

  return (
    <ComponentQueryLoader
      loading={serviceTicketLoading}
      hasData={serviceTicketData && serviceTicketData.serviceTicketsByCommunityId}
      hasDataComponent={<ServiceTicketsList data={serviceTicketData?.serviceTicketsByCommunityId} />}
      error={serviceTicketError}
    />
  );
};
