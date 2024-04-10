import { FilterOutlined } from '@ant-design/icons';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Drawer, Input, Pagination, Select, Skeleton, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  FilterNames,
  GetFilterFromQueryString,
  SearchParamKeys,
  SearchType
} from '../../../../constants';
import {
  FilterDetail,
  MemberPropertiesGetAllTagsDocument,
  MemberPropertiesListSearchContainerMapSasTokenDocument,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertyResult
} from '../../../../generated';
import { SearchDrawerContainer } from '../../shared/components/search-drawer.container';
import { PropertiesListSearchListingCards } from './properties-list-search-listing-cards';

const { Search } = Input;
const { Option } = Select;

export const PropertiesListSearchContainer: React.FC<any> = () => {
  const {
    token: { colorText }
  } = theme.useToken();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get(SearchParamKeys.SearchString) ?? '');
  const [visible, setVisible] = useState(false);

  const params = useParams();

  const { data: tagData, loading: tagLoading, error: tagError } = useQuery(MemberPropertiesGetAllTagsDocument);

  const [gqlSearchProperties, { called: searchCalled, loading: searchLoading, data: searchData, error: searchError }] =
    useLazyQuery(MemberPropertiesListSearchContainerPropertiesDocument, { fetchPolicy: 'network-only' });

  const {
    data: mapSasTokenData,
    loading: mapSasTokenLoading,
    error: mapSasTokenError
  } = useQuery(MemberPropertiesListSearchContainerMapSasTokenDocument);

  useEffect(() => {
    searchParams.set(SearchParamKeys.Page, searchParams.get(SearchParamKeys.Page) ?? '1');
    searchParams.set(SearchParamKeys.Top, searchParams.get(SearchParamKeys.Top) ?? '10');
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
      searchParams.set(SearchParamKeys.SearchString, searchString);
    } else {
      searchParams.delete(SearchParamKeys.SearchString);
    }
    setSearchParams(searchParams);

    // set top here to fix the issue of top/current page not being set in the url
    const page = parseInt(searchParams.get(SearchParamKeys.Page) ?? '1') - 1;
    const top = parseInt(searchParams.get(SearchParamKeys.Top) ?? '10');
    const skip = page * top;

    // get search string
    const qsSearchString = searchString;

    // get filter
    let filter: FilterDetail = GetFilterFromQueryString(searchParams, params.communityId ?? '');
    const orderBy = searchParams.get(SearchParamKeys.Sort) ?? '';

    await gqlSearchProperties({
      variables: {
        input: {
          searchString: qsSearchString,
          options: {
            facets: [
              FilterNames.Type + ',count:1000',
              FilterNames.AdditionalAmenitiesCategory,
              FilterNames.AdditionalAmenitiesAmenities + ',count:1000',
              FilterNames.Amenities + ',count:1000',
              FilterNames.ListedForLease + ',count:1000',
              FilterNames.ListedForSale + ',count:1000',
              FilterNames.ListedForRent + ',count:1000',
              FilterNames.Bedrooms + ',count:1000',
              FilterNames.Bathrooms + ',count:1000',
              FilterNames.UpdatedAt + ',count:1000',
              FilterNames.CreatedAt + ',count:1000',
              FilterNames.Tags + ',count:1000'
            ],
            filter: filter,
            top: top,
            skip: skip,
            orderBy: [orderBy]
          }
        }
      }
    });
  };

  const handlePagination = (newPage: number) => {
    const current = newPage;
    searchParams.set(SearchParamKeys.Page, current.toString());
    setSearchParams(searchParams);
  };

  const handleShowSizeChange = (value: number) => {
    searchParams.set(SearchParamKeys.Top, value.toString());
    setSearchParams(searchParams);
  };

  const clearFilter = () => {
    searchParams.delete(SearchParamKeys.AdditionalAmenities);
    searchParams.delete(SearchParamKeys.Amenities);
    searchParams.delete(SearchParamKeys.Bathrooms);
    searchParams.delete(SearchParamKeys.Bedrooms);
    searchParams.delete(SearchParamKeys.ListedInfo);
    searchParams.delete(SearchParamKeys.MaxPrice);
    searchParams.delete(SearchParamKeys.MinPrice);
    searchParams.delete(SearchParamKeys.Type);
    searchParams.delete(SearchParamKeys.MaxSquareFeet);
    searchParams.delete(SearchParamKeys.MinSquareFeet);
    searchParams.delete(SearchParamKeys.Distance);
    searchParams.delete(SearchParamKeys.UpdatedAt);
    searchParams.delete(SearchParamKeys.CreatedAt);
    searchParams.delete(SearchParamKeys.SearchString);
    searchParams.delete(SearchParamKeys.Sort);
    searchParams.delete(SearchParamKeys.Latitude);
    searchParams.delete(SearchParamKeys.Longitude);
    searchParams.delete(SearchParamKeys.SavedFilter);
    searchParams.delete(SearchParamKeys.Tags);
    setSearchParams(searchParams);
  };

  const onSearchChange = (e: any) => {
    setSearchString(e.target.value);
  };

  if (searchError || mapSasTokenError) {
    return (
      <div>
        <div>{JSON.stringify(searchError)}</div>;<div>{JSON.stringify(mapSasTokenError)}</div>;
      </div>
    );
  }
  if (searchLoading || mapSasTokenLoading) {
    return (
      <div>
        <Skeleton active />
      </div>
    );
  }
  if (searchCalled && searchData && mapSasTokenData) {
    const generatedPropertyData = JSON.parse(JSON.stringify(searchData?.propertiesSearch?.propertyResults, null, 2)) as PropertyResult[];
    return (
      <>
        <div className="py-4" style={{ display: 'flex' }}>
          <Search
            allowClear
            style={{ width: '40%' }}
            placeholder="input search text"
            onSearch={() => handleSearch()}
            value={searchString}
            onChange={(e) => onSearchChange(e)}
            enterButton
          />
          <Drawer title="Search Filters" placement="left" onClose={() => setVisible(false)} open={visible} width={445}>
            <SearchDrawerContainer
              searchData={searchData?.propertiesSearch}
              customData={{ data: tagData, loading: tagLoading, error: tagError }}
              type={SearchType.Property}
              clearFilter={clearFilter}
            />
          </Drawer>
          <Button type="default" onClick={() => setVisible(true)} className="ml-4">
            <FilterOutlined />
          </Button>
          <Pagination
            current={parseInt(searchParams.get(SearchParamKeys.Page) ?? '1')}
            total={searchData?.propertiesSearch?.count ?? 10}
            pageSize={parseInt(searchParams.get(SearchParamKeys.Top) ?? '10')}
            pageSizeOptions={['5', '10', '25', '50']}
            onChange={(page) => handlePagination(page)}
            style={{ marginLeft: '25px' }}
          />
          <span
            style={{
              color: colorText,
              padding: '8px 5px',
              marginLeft: '10px'
            }}
          >
            Records per page:
          </span>
          <Select
            defaultValue={parseInt(searchParams.get(SearchParamKeys.Top) ?? '10')}
            onChange={(value) => handleShowSizeChange(value)}
          >
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={15}>15</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>
        <PropertiesListSearchListingCards properties={generatedPropertyData} />;
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
