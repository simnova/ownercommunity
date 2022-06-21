import { useLazyQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, Input, Button, Space, Pagination, List } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AdditionalAmenities, FilterNames } from '../../../../constants';
import { PropertiesListSearchFilters } from './properties-list-search-filters';

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [top, setTop] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );

  // get selected filters from query string (when page is loaded)
  useEffect(() => {
    // get all search params
    const searchParams = new URLSearchParams(location.search);
    const qssearchString = searchParams.get('search');
    const qsproperTypes = searchParams.get('type')?.split(',');
    const qsbedrooms = searchParams.get('bedrooms');
    const qsbathrooms = searchParams.get('bathrooms');
    const qsminPrice = searchParams.get('minPrice');
    const qsmaxPrice = searchParams.get('maxPrice');
    const qsminSquareFeet = searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
    const qsamenities = searchParams.get('amenities')?.split(',');
    const qsadditionalAmenities = searchParams.get('additionalAmenities')?.split(';');
    const qspage = searchParams.get('page');

    let filters = {} as FilterDetail;
    if (qssearchString) {
      setSearchString(qssearchString);
    }
    if (qsproperTypes) {
      filters = {
        ...selectedFilter,
        propertyType: qsproperTypes
      };
    }
    if (qsbedrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bedrooms: parseInt(qsbedrooms)
        }
      };
    }
    if (qsbathrooms) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          bathrooms: parseFloat(qsbathrooms)
        }
      };
    }

    if (qsamenities) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          amenities: qsamenities
        }
      };
    }

    if (qsminPrice && qsmaxPrice) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          prices: [parseInt(qsminPrice), parseInt(qsmaxPrice)]
        }
      };
    }

    if (qsminSquareFeet && qsmaxSquareFeet) {
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          squareFeets: [parseInt(qsminSquareFeet), parseInt(qsmaxSquareFeet)]
        }
      };
    }

    if (qsadditionalAmenities) {
      let temp: AdditionalAmenities[] = [];

      qsadditionalAmenities.forEach((amenity) => {
        const [cate, amen] = amenity.split(':');
        temp.push({
          category: cate,
          amenities: amen.split(',')
        });
      });
      filters = {
        ...filters,
        listingDetail: {
          ...filters?.listingDetail,
          additionalAmenities: temp
        }
      };
    }

    if (qspage) {
      console.log("PAGE IS: ", qspage);
      setCurrentPage(parseInt(qspage)-1);
    }

    setSelectedFilter(filters);
    setSkip(currentPage * top);
    handleSearch(qssearchString ?? '', filters);
  }, []);

  useEffect(() => {
    setSkip(currentPage * top);
    handleSearch(searchString, selectedFilter);
  }, [top])

  useEffect(() => {
    setSkip(currentPage * top);
    handleSearch(searchString, selectedFilter);
  }, [currentPage])
  

  const handleSearch = async (searchString?: string, filter?: FilterDetail) => {
    navigate(`.?` + searchParams);
    await gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: {
            facets: [
              FilterNames.Type,
              FilterNames.AdditionalAmenitiesCategory,
              FilterNames.AdditionalAmenitiesAmenities + ',count:30',
              FilterNames.Amenities + ',count:30',
              FilterNames.ListedForLease + ',count:30',
              FilterNames.ListedForSale + ',count:30',
              FilterNames.ListedForRent + ',count:30'
            ],
            filter: filter,
            top: top,
            skip: skip,
          }
        }
      }
    });
  };

  const handlePagination = (newPage: number) => {
    const current = newPage - 1;
    setSkip(current * top);
    setCurrentPage(current);
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  }

  const result = () => {
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    } else if (loading) {
      return <Skeleton active />;
    } else if (called && data) {
      const generatedPropertyData = JSON.parse(
        JSON.stringify(data.propertiesSearch?.propertyResults, null, 2)
      );

      const properties = () => {
        return generatedPropertyData.map((property: any) => {
          return <ListingCard data={property} />;
        });
      };

      return (
        <div>
          {/* <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{properties()}</div> */}
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3
            }}
            dataSource={generatedPropertyData}
            renderItem={item => (
              <List.Item>
                <ListingCard data={item}></ListingCard>
              </List.Item>
            )}
          ></List>
          <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
      );
    }
    return <div>Search Please</div>;
  };

  return (
    <>
      <Space size='large'>
        <Space size={0}>
          <Input
            placeholder="Search properties"
            onPressEnter={(e: any) => handleSearch(e.target.value, selectedFilter)}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />

          <Button type="primary" onClick={() => handleSearch(searchString, selectedFilter)}>
            Search
          </Button>
        </Space>
        <Pagination current={currentPage+1} total={data?.propertiesSearch?.count ?? 10} pageSize={top} onChange={(page) => handlePagination(page)} />
      </Space>
      <div>
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>

      <PropertiesListSearchFilters
        facets={data?.propertiesSearch?.facets as PropertySearchFacets}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
        handleSearch={handleSearch}
        searchString={searchString}
        setTop={setTop}
      />
      {result()}
    </>
  );
};
