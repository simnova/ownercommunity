import { FilterOutlined } from '@ant-design/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Drawer, Input, Skeleton, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
    GetFilterFromServiceTicketQueryString,
    SearchType,
    ServiceTicketFilterNames,
    ServiceTicketSearchParamKeys
} from '../../../../constants';
import {
    MemberNameServiceTicketContainerDocument,
    MemberServiceTicketsListContainerSearchServiceTicketsDocument,
    ServiceTicketsSearchFilterDetail
} from '../../../../generated';
import { SearchDrawerContainer } from '../../shared/components/search-drawer.container';
import { ServiceTicketsList } from './service-tickets-list';

const { Search } = Input;

export const ServiceTicketsListContainer: React.FC<any> = () => {
  const {
    token: { colorText }
  } = theme.useToken();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const [visible, setVisible] = useState(false);

  const {
    data: membersData,
    loading: memberLoading,
    error: memberError
  } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
    // fetchPolicy: 'cache-and-network'
  });

  const [
    gqlSearchServiceTickets,
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
    searchParams.set(ServiceTicketSearchParamKeys.Page, searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1');
    searchParams.set(ServiceTicketSearchParamKeys.Top, searchParams.get(ServiceTicketSearchParamKeys.Top) ?? '10');
    setSearchParams(searchParams);
    (async () => {
      await handleSearch();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleSearch();
    })();
  }, [searchParams]);

  const handleSearch = async () => {
    if (searchString.length > 0) {
      searchParams.set(ServiceTicketSearchParamKeys.SearchString, searchString);
    } else {
      searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    }
    setSearchParams(searchParams);

    const page = parseInt(searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1') - 1;
    const top = parseInt(searchParams.get(ServiceTicketSearchParamKeys.Top) ?? '10');
    const skip = page * top;

    const qsSearchString = searchString;

    let filters: ServiceTicketsSearchFilterDetail = GetFilterFromServiceTicketQueryString(searchParams);
    const orderBy = searchParams.get(ServiceTicketSearchParamKeys.Sort) ?? '';

    await gqlSearchServiceTickets({
      variables: {
        input: {
          searchString: qsSearchString,
          options: {
            facets: [
              ServiceTicketFilterNames.Requestor + ',count:1000',
              ServiceTicketFilterNames.AssignedTo + ',count:1000',
              ServiceTicketFilterNames.Status + ',count:1000',
              ServiceTicketFilterNames.Priority + ',count:1000',
              ServiceTicketFilterNames.RequestorId + ',count:1000',
              ServiceTicketFilterNames.AssignedToId + ',count:1000'
            ],
            filter: filters,
            top: top,
            skip: skip,
            orderBy: [orderBy]
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
    let SearchResult = null;
    SearchResult = (
      <pre
        className=" mt-2 p-2"
        style={{
          color: colorText
        }}
      >
        {JSON.stringify(searchServiceTicketsData, null, 2)}
      </pre>
    );
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
        {SearchResult}
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
      <div>No Data...</div>
    </>
  );
};
