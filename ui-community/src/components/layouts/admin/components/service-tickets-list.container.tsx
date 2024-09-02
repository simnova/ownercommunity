import { useLazyQuery, useQuery } from '@apollo/client';
import {
  MemberNameServiceTicketContainerDocument,
  MemberServiceTicketsListContainerSearchServiceTicketsDocument
} from '../../../../generated';
import { ServiceTicketsList } from './service-tickets-list';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchType, ServiceTicketSearchParamKeys } from '../../../../constants';
import { Button, Drawer, Empty, Skeleton } from 'antd';
import Search from 'antd/es/input/Search';
import { SearchDrawerContainer } from '../../shared/components/search-drawer.container';
import { FilterOutlined } from '@ant-design/icons';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState<string>(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const [visible, setVisible] = useState<boolean>(false);

  const {
    data: membersData,
    loading: memberLoading,
    error: memberError
  } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
    // fetchPolicy: 'cache-and-network'
  });

  const [
    getServiceTickets,
    {
      called: searchServiceTicketsCalled,
      loading: searchServiceTicketsLoading,
      data: searchServiceTicketsData,
      error: searchServiceTicketsError
    }
  ] = useLazyQuery(MemberServiceTicketsListContainerSearchServiceTicketsDocument, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    handleSearch();
  }, [props.communityId]);

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
          searchString: '',
          options: {
            filter: {
              communityId: props.communityId
            },
            top: top,
            skip: skip
          }
        }
      }
    });
  };

  const clearFilter = () => {
    searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    searchParams.delete(ServiceTicketSearchParamKeys.AssignedTo);
    searchParams.delete(ServiceTicketSearchParamKeys.Status);
    searchParams.delete(ServiceTicketSearchParamKeys.Priority);
    searchParams.delete(ServiceTicketSearchParamKeys.Column);
    searchParams.delete(ServiceTicketSearchParamKeys.Sort);
    searchParams.delete(ServiceTicketSearchParamKeys.SavedFilter);

    setSearchParams(searchParams);
  };

  const onChange = (e: any) => {
    setSearchString(e.target.value);
  };

  if (searchServiceTicketsError) {
    return <div>{JSON.stringify(searchServiceTicketsError)}</div>;
  }

  if (searchServiceTicketsLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }

  if (searchServiceTicketsCalled && searchServiceTicketsData) {
    return (
      <>
        <div className="py-4">
          <Search
            allowClear
            style={{ width: '40%' }}
            placeholder="input search text"
            onSearch={() => handleSearch()}
            value={searchString}
            onChange={(e) => onChange(e)}
            enterButton
          />
          <Drawer title="Search Filters" placement="left" onClose={() => setVisible(false)} open={visible} width={445}>
            <SearchDrawerContainer
              searchData={searchServiceTicketsData?.serviceTicketsSearch}
              customData={{ data: membersData, loading: memberLoading, error: memberError }}
              type={SearchType.ServiceTicket}
              clearFilter={clearFilter}
            />
          </Drawer>
          <Button type="default" onClick={() => setVisible(true)} className="ml-4">
            <FilterOutlined />
          </Button>
        </div>
        <ServiceTicketsList
          data={searchServiceTicketsData?.serviceTicketsSearch}
          handleSearch={handleSearch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  }

  return (
    <>
      <Search
        style={{ width: '40%' }}
        placeholder="input search text"
        onSearch={() => handleSearch()}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        enterButton
      />
      <Empty />
    </>
  );
};
