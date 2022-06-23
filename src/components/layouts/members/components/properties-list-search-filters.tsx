import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';
import { Space, Button, Modal, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { FacetDetail, FilterDetail, PropertySearchFacets } from '../../../../generated';
import { FC, useEffect, useState } from 'react';
import { PropertiesListSearchFilterListedInfo } from './properties-list-search-filter-listed-info';
import { FilterNames, SearchParamKeys } from '../../../../constants';
import { PropertiesListSearchFilterDistance } from './properties-list-search-filter-distance';

const { Option } = Select;
interface PropertiesListSearchFiltersProps {
  facets?: PropertySearchFacets;
  selectedFilter?: FilterDetail;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  setTop: (top: number) => void;
  setCurrentPage: (page: number) => void;
  handleSearch: (page?: number, top?: number) => void;
}

export const PropertiesListSearchFilters: FC<PropertiesListSearchFiltersProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const qsTop = searchParams.get(SearchParamKeys.Top);
    if (qsTop) {
      props.setTop(Number(qsTop));
    }
  }, []);

  const getListedInfoFacets = (facets?: PropertySearchFacets) => {
    const listedInfoFacets: FacetDetail[] = [];
    if (facets) {
      if (facets.listedForLease) {
        const temp = facets.listedForLease.find((l) => l?.value === 'true');
        listedInfoFacets.push({
          value: FilterNames.ListedForLease,
          count: temp?.count
        } as FacetDetail);
      }
      if (facets.listedForSale) {
        const temp = facets.listedForSale.find((l) => l?.value === 'true');
        listedInfoFacets.push({
          value: FilterNames.ListedForSale,
          count: temp?.count
        } as FacetDetail);
      }
      if (facets.listedForRent) {
        const temp = facets.listedForRent.find((l) => l?.value === 'true');
        listedInfoFacets.push({
          value: FilterNames.ListedForRent,
          count: temp?.count
        } as FacetDetail);
      }
    }
    return listedInfoFacets;
  };

  const onSelectTopChanged = (value: number) => {
    props.setTop(value);
    props.setCurrentPage(0);
    props.handleSearch(0, value);
  };

  return (
    <div>
        {/* Type */}
        <PropertiesListSearchFilterPropertyType
          propertyTypeFacets={props.facets?.type as FacetDetail[]}
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />
        {/* Bedrooms */}
        <PropertiesListSearchFilterBedrooms
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* Bathrooms */}
        <PropertiesListSearchFilterBathrooms
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* Amenities */}
        <PropertiesListSearchFilterAmenities
          amenitiesFacets={props.facets?.amenities as FacetDetail[]}
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* Additional Amenities */}
        <PropertiesListSearchFilterAdditionalAmenities
          additionalAmenitieFacets={props.facets?.additionalAmenitiesAmenities as FacetDetail[]}
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* squareFeet */}
        <PropertiesListSearchFilterSquareFeet
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* Distance */}
        <PropertiesListSearchFilterDistance
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />

        {/* Listed Info: listedForSale, listedForLease, listedForRent */}
        <PropertiesListSearchFilterListedInfo
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
          listedInfoFacets={getListedInfoFacets(props.facets)}
        />

        {/* Price */}
        <PropertiesListSearchFilterPrice
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />
    </div>
  );
};
