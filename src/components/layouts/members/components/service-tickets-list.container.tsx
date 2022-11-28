import { useLazyQuery } from '@apollo/client';
import {
  MemberServiceTicketsListContainerSearchServiceTicketsDocument,
  ServiceTicketsSearchFilterDetail
} from '../../../../generated';
import { ServiceTicketsList } from './service-tickets-list';
import { Skeleton, Input, Drawer, Button } from 'antd';
import {
  ServiceTicketFilterNames,
  GetFilterFromServiceTicketQueryString,
  ServiceTicketSearchParamKeys
} from '../../../../constants';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchContainer } from './service-tickets-search-container';
import { orderBy } from 'lodash';

const { Search } = Input;

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const [visible, setVisible] = useState(false);

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

  const onChange = (e: any) => {
    setSearchString(e.target.value);
    // if (e.target.value.length > 0) {
    //   searchParams.set(ServiceTicketSearchParamKeys.SearchString, e.target.value);
    //   setSearchParams(searchParams);
    // } else {
    //   searchParams.delete(ServiceTicketSearchParamKeys.SearchString);
    //   setSearchParams(searchParams);
    // }
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
    SearchResult = <pre>{JSON.stringify(searchServiceTicketsData, null, 2)}</pre>;
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
          <Drawer
            title="Search Filters"
            placement="left"
            onClose={() => setVisible(false)}
            visible={visible}
            width={445}
          >
            <ServiceTicketsSearchContainer searchData={searchServiceTicketsData?.serviceTicketsSearch} />
          </Drawer>
          <Button type="default" onClick={() => setVisible(true)} className="ml-4">
            <FilterOutlined />
          </Button>
        </div>
        <ServiceTicketsList data={searchServiceTicketsData?.serviceTicketsSearch} handleSearch={handleSearch} />
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
