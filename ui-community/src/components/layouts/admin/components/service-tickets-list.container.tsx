import { useLazyQuery, useQuery } from '@apollo/client';
import {
  AdminServiceTicketsListContainerSearchServiceTicketsDocument,
  MemberNameServiceTicketContainerDocument
} from '../../../../generated';
import { ComponentQueryLoader } from '../../../ui/molecules/component-query-loader';
import { ServiceTicketsList } from './service-tickets-list';
import { useEffect, useState } from 'react';
import { ServiceTicketSearchHelpers } from '../../shared/components/service-ticket-search-helpers';
import { FilterPopover } from '../../shared/components/filter-popover';
import { ServiceTicketSearchParamKeys } from '../../../../constants';
import { useParams, useSearchParams } from 'react-router-dom';
import { Input } from 'antd';

export const ServiceTicketsListContainer: React.FC<any> = (props) => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(ServiceTicketSearchParamKeys.SearchString) ?? '');
  const { Search } = Input;

  const { data: membersData } = useQuery(MemberNameServiceTicketContainerDocument, {
    variables: { communityId: params.communityId ?? '' }
  });

  const [
    getServiceTickets,
    { loading: searchServiceTicketsLoading, data: searchServiceTicketsData, error: searchServiceTicketsError }
  ] = useLazyQuery(AdminServiceTicketsListContainerSearchServiceTicketsDocument, {
    fetchPolicy: 'network-only'
  });

  const onChange = (e: any) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [props.communityId]);

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

  const handleSearch = async () => {
    await getServiceTickets({
      variables: {
        input: {
          searchString: '',
          options: {
            filter: {
              communityId: props.communityId
            }
          }
        }
      }
    });
  };

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
        {/* <FilterPopover
          searchData={searchServiceTicketsData?.serviceTicketsSearchAdmin}
          memberData={membersData}
          clearFilter={clearFilter}
        /> */}
      </div>
      <ServiceTicketSearchHelpers />
      <ComponentQueryLoader
        loading={searchServiceTicketsLoading}
        hasData={searchServiceTicketsData?.serviceTicketsSearchAdmin !== null}
        hasDataComponent={<ServiceTicketsList data={searchServiceTicketsData?.serviceTicketsSearchAdmin} />}
        error={searchServiceTicketsError}
      />
    </div>
  );
};
