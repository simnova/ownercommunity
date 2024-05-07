import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Input, Skeleton, theme, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  GetFilterFromServiceTicketQueryString,
  SearchParamKeys,
  ServiceTicketFilterNames,
  ServiceTicketSearchParamKeys,
  ServiceTicketSortOptions
} from '../../../../constants';
import {
  MemberNameServiceTicketContainerDocument,
  MemberServiceTicketsListContainerSearchServiceTicketsDocument,
  ServiceTicketsSearchFilterDetail
} from '../../../../generated';
import { ServiceTicketsList } from './service-tickets-list';
import { FilterPopover } from '../../shared/components/filter-popover';

const { Search } = Input;
const { Option } = Select;
const columnOptions = ['Title', 'Requestor', 'Assigned To', 'Priority', 'Updated', 'Created'];

function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1); 
}

export const ServiceTicketsListContainer: React.FC<any> = () => {
  const {
    token: { colorText }
  } = theme.useToken();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const [columnsToDisplay, setColumnsToDisplay] = useState<string[] | undefined>(
    searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',') ?? []
  );
  const forceUpdate = useForceUpdate();

  const {
    data: membersData,
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

  const onSelectColumnChanged = (columnName: string) => {
    const originalSearchParams = searchParams.get(ServiceTicketSearchParamKeys.Column) ?? '';
    searchParams.set(
      ServiceTicketSearchParamKeys.Column,
      originalSearchParams.length > 0
        ? searchParams.get(ServiceTicketSearchParamKeys.Column) + ',' + columnName
        : columnName
    );
    setSearchParams(searchParams);
    setColumnsToDisplay([...(columnsToDisplay ?? []), columnName]);
  };

  const onColumnDelete = (columnName: string) => {
    const searchParamsString = searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');
    const newSearchParamsArray: any = [];
    searchParamsString?.forEach((searchParam) => {
      if (searchParam !== columnName) {
        newSearchParamsArray.push(searchParam);
      }
    });

    if (newSearchParamsArray.length > 0) {
      searchParams.set(ServiceTicketSearchParamKeys.Column, newSearchParamsArray.join(','));
    } else {
      searchParams.delete(ServiceTicketSearchParamKeys.Column);
    }
    setSearchParams(searchParams);
    setColumnsToDisplay(columnsToDisplay?.filter((column) => column !== columnName));
  };

  const onSortChanged = (value: string) => {
    if (value) {
      searchParams.set(SearchParamKeys.Sort, value);
    } else {
      searchParams.delete(SearchParamKeys.Sort);
    }

    setSearchParams(searchParams);
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
            searchData={searchServiceTicketsData?.serviceTicketsSearch}
            memberData={membersData}
            clearFilter={clearFilter}
          />
        </div>
        <div style={{ paddingBottom: '10px' }}>
          <Select
            style={{ width: '225px', marginRight: '10px' }}
            placeholder="Sort By"
            allowClear
            onChange={(value) => onSortChanged(value)}
            defaultValue={searchParams.get('sort') ? searchParams.get('sort') : null}
          >
            {ServiceTicketSortOptions.map((option) => {
              return (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{ width: '175px', marginRight: '10px' }}
            mode="multiple"
            placeholder="Select Column"
            allowClear
            onSelect={(e: any) => onSelectColumnChanged(e)}
            defaultValue={columnsToDisplay}
            onClear={() => {
              searchParams.delete(ServiceTicketSearchParamKeys.Column);
              setSearchParams(searchParams);
              setColumnsToDisplay(undefined);
              forceUpdate();
            }}
            onDeselect={(value: any) => onColumnDelete(value)}
          >
            {columnOptions.map((option: string) => {
              return <Option key={option}>{option}</Option>;
            })}
          </Select>
          <Button type="primary" danger onClick={() => clearFilter()}>
            Clear
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
        placeholder="Search For Tickets"
        onSearch={() => handleSearch()}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        enterButton
      />
      <div>No Data...</div>
    </>
  );
};
