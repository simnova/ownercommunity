import { useQuery } from '@apollo/client';
import { AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { ServiceTicketsList } from './service-tickets-list';

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
      hasData={serviceTicketData?.serviceTicketsByCommunityId}
      hasDataComponent={<ServiceTicketsList data={serviceTicketData?.serviceTicketsByCommunityId} />}
      error={serviceTicketError}
    />
  );
};
