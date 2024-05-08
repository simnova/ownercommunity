import { useLazyQuery, useQuery } from '@apollo/client';
import {
  AdminServiceTicketsListContainerSearchServiceTicketsDocument,
  AdminMemberNameServiceTicketContainerDocument,
  ServiceTicketsSearchFilterDetail
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { ServiceTicketsList } from './service-tickets-list';
import { useEffect, useState } from 'react';
import { ServiceTicketSearchHelpers } from '../../shared/components/service-ticket-search-helpers';
import { FilterPopover } from '../../shared/components/filter-popover';
import {
  GetFilterFromServiceTicketQueryString,
  ServiceTicketFilterNames,
  ServiceTicketSearchParamKeys
} from '../../../../constants';
import { useParams, useSearchParams } from 'react-router-dom';
import { Input, Skeleton, theme } from 'antd';
import { set } from 'lodash';

export const ServiceTicketsListContainer: React.FC<any> = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const { Search } = Input;
  const {
    token: { colorText }
  } = theme.useToken();

  const {
    data: membersData,
    loading: memberDataLoading,
    error: memberDataError
  } = useQuery(AdminMemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

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

  const onChange = (e: any) => {
    setSearchString(e.target.value);
  };

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

    await getServiceTickets({
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

  if (searchServiceTicketsError || memberDataError) {
    return <div>{JSON.stringify(searchServiceTicketsError ? searchServiceTicketsError : memberDataError)}</div>;
  }
  if (searchServiceTicketsLoading || memberDataLoading) {
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
  }

  return (
    <div>
      <div className="py-4" style={{ display: 'inline-flex', width: '100%' }}>
        <Search
          allowClear
          style={{ width: '40%', marginRight: '10px' }}
          placeholder="Search For Service Tickets"
          onSearch={() => handleSearch()}
          value={searchString}
          onChange={(e) => onChange(e)}
          enterButton
        />
        <FilterPopover
          searchData={searchServiceTicketsData?.serviceTicketsSearchAdmin}
          memberData={membersData}
          clearFilter={clearFilter}
        />
      </div>
      <ServiceTicketSearchHelpers clearFilter={clearFilter} />
      <ComponentQueryLoader
        loading={searchServiceTicketsLoading}
        hasData={searchServiceTicketsData?.serviceTicketsSearchAdmin !== null}
        hasDataComponent={
          <ServiceTicketsList
            data={searchServiceTicketsData?.serviceTicketsSearchAdmin}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        }
        error={searchServiceTicketsError}
      />
    </div>
  );
};
