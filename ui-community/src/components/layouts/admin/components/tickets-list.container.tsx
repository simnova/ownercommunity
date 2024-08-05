import { useLazyQuery  } from '@apollo/client';
import { AdminServiceTicketsListContainerSearchServiceTicketsDocument } from '../../../../generated';
import { ServiceTicketsList } from './tickets-list';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ServiceTicketSearchParamKeys } from '../../../../constants';
import { Skeleton } from 'antd';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  // const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const [
    getServiceTickets,
    {
      called: searchServiceTicketsCalled,
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
  
  useEffect(() => {
    searchParams.set(ServiceTicketSearchParamKeys.Page, searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1');
    searchParams.set(ServiceTicketSearchParamKeys.Top, searchParams.get(ServiceTicketSearchParamKeys.Top) ?? '10');
    setSearchParams(searchParams);
    (async () => {
      await handleSearch();
    })();
  }, []);


  const handleSearch = async () => {
    const page = parseInt(searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1') - 1;
    const top = parseInt(searchParams.get(ServiceTicketSearchParamKeys.Top) ?? '10');
    const skip = page * top;

    await getServiceTickets({
      variables: {
        input: {
          searchString: "",
          options: {
            filter: {
              communityId: props.communityId
            },
            top: top,
            skip: skip,
          }
        }
      }
    });
  }

  if (searchServiceTicketsLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  if(searchServiceTicketsCalled && searchServiceTicketsData) {
    return (
      <ServiceTicketsList
      data={searchServiceTicketsData?.serviceTicketsSearchAdmin}
      handleSearch={handleSearch}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
    );
  }
  
};
