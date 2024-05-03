import { useLazyQuery, useQuery } from '@apollo/client';
import { AdminServiceTicketsListContainerSearchServiceTicketsDocument, AdminServiceTicketsListContainerServiceTicketsOpenByCommunityDocument } from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { ServiceTicketsList } from './service-tickets-list';
import { useEffect } from 'react';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const [
    getServiceTickets,
    {
      loading: searchServiceTicketsLoading,
      data: searchServiceTicketsData,
      error: searchServiceTicketsError
    }
  ] = useLazyQuery(AdminServiceTicketsListContainerSearchServiceTicketsDocument, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    handleSearch();
  }, [props.communityId])
  


  const handleSearch = async () => {
    await getServiceTickets({
      variables: {
        input: {
          searchString: "",
          options: {
            filter: {
              communityId: props.communityId
            }
          }
        }
      }
    });
  }

  return (
    <ComponentQueryLoader
      loading={searchServiceTicketsLoading}
      hasData={searchServiceTicketsData?.serviceTicketsSearchAdmin !== null}
      hasDataComponent={<ServiceTicketsList data={searchServiceTicketsData?.serviceTicketsSearchAdmin} />}
      error={searchServiceTicketsError}
    />
  );
};
