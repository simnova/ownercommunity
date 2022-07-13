import { useQuery, useLazyQuery } from '@apollo/client';
import {
  MemberServiceTicketsListContainerSearchServiceTicketsDocument,
  MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument,
  ServiceTicketsSearchFilterDetail
} from '../../../../generated';
import { ServiceTicketsList } from './service-tickets-list';
import { Skeleton, Input, Drawer, Button } from 'antd';
import { ServiceTicketFilterNames } from '../../../../constants';
import { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { ServiceTicketsSearchFilters } from './service-tickets-search-filters';
import { ServiceTicketsSearchToolbar } from './service-tickets-search-toolbar';

const { Search } = Input;

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [visible, setVisible] = useState(false);
  // const {
  //   data: serviceTicketData,
  //   loading: serviceTicketLoading,
  //   error: serviceTicketError
  // } = useQuery(MembersServiceTicketsListContainerServiceTicketsOpenByRequestorDocument);

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
    (async () => {
      await handleSearch();
    })();
  }, []);


  const handleSearch = async () => {
    let filters: ServiceTicketsSearchFilterDetail = {
      // assignedTo: []
      // priority: [5]
      // status: [],
    };

    await gqlSearchServiceTickets({
      variables: {
        input: {
          searchString: searchString,
          options: {
            facets: [
              ServiceTicketFilterNames.Requestor + ',count:1000',
              ServiceTicketFilterNames.AssignedTo + ',count:1000',
              ServiceTicketFilterNames.Status + ',count:1000',
              ServiceTicketFilterNames.Priority + ',count:1000'
            ],
            filter: filters
          }
        }
      }
    });
  };

  // if (serviceTicketError) {
  //   return <div>{JSON.stringify(serviceTicketError)}</div>;
  // }

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
            style={{ width: '40%' }}
            placeholder="input search text"
            onSearch={() => handleSearch()}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            enterButton
          />
          <Drawer
            title="Search Filters"
            placement="left"
            onClose={() => setVisible(false)}
            visible={visible}
            width={445}
          >
            <ServiceTicketsSearchToolbar />
            <ServiceTicketsSearchFilters />
          </Drawer>
          <Button type="default" onClick={() => setVisible(true)} className="ml-4">
            <FilterOutlined />
          </Button>
        </div>
        <ServiceTicketsList
          data={searchServiceTicketsData?.serviceTicketsSearch?.serviceTicketsResults}
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
