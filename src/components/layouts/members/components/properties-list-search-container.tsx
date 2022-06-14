import { useLazyQuery } from '@apollo/client';
import {
  FilterDetail,
  MemberPropertiesListSearchContainerPropertiesDocument,
  PropertySearchFacets
} from '../../../../generated';
import { Skeleton, Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ListingCard } from './listing-card';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AdditionalAmenities, FilterNames } from '../../../../constants';
import { PropertiesListSearchFilters } from './properties-list-search-filters';

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterDetail>();
  const [searchParams, setSearchParams] = useSearchParams();
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

    setSelectedFilter(filters);
    handleSearch(qssearchString ?? '', filters);
  }, []);

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
            filter: filter
          }
        }
      }
    });
  };

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
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{properties()}</div>
          <pre>{JSON.stringify(data, null, 2)}</pre>;
        </div>
      );
    }
    return <div>Search Please</div>;
  };

  return (
    <>
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
      <div>
        {data?.propertiesSearch?.count
          ? '(' + data?.propertiesSearch?.count + ' records found)'
          : ''}
      </div>

      <PropertiesListSearchFilters
        facets={data?.propertiesSearch?.facets as PropertySearchFacets}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      {result()}
    </>
  );
};
