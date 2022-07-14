import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';
import { useSearchParams } from 'react-router-dom';
import { FacetDetail, FilterDetail, PropertySearchFacets } from '../../../../generated';
import { FC, useEffect, useState } from 'react';
import { PropertiesListSearchFilterListedInfo } from './properties-list-search-filter-listed-info';
import { FilterNames, SearchParamKeys } from '../../../../constants';
import { PropertiesListSearchFilterDistance } from './properties-list-search-filter-distance';
import { PropertiesListSearchFilterUpdatedDate } from './properties-list-search-filter-updated-date';
import { PropertiesListSearchFilterCreatedDate } from './properties-list-search-filter-created-date';
import { Collapse } from 'antd';
import { PropertiesListSearchFilterTagsContainer } from './properties-list-search-filter-tags-container';

const { Panel } = Collapse;
interface PropertiesListSearchFiltersProps {
  facets?: PropertySearchFacets;
  selectedFilter?: FilterDetail;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  setTop: (top: number) => void;
}

export const PropertiesListSearchFilters: FC<PropertiesListSearchFiltersProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedFilters, setDisplayedFilters] = useState<string[]>([]);

  useEffect(() => {
    const qsTop = searchParams.get(SearchParamKeys.Top);
    if (qsTop) {
      props.setTop(Number(qsTop));
    }
  }, []);

  useEffect(() => {
    const filters = [];
    // type
    if (props?.facets?.type && props.facets.type.length > 0) {
      filters.push(FilterNames.Type);
    }

    // bedrooms
    if (props?.facets?.bedrooms && props.facets.bedrooms.length > 0) {
      filters.push(FilterNames.Bedrooms);
    }
    setDisplayedFilters(filters);
  }, [props.facets]);

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
        bedroomsFacets={props.facets?.bedrooms as FacetDetail[]}
      />

      {/* Bathrooms */}
      <PropertiesListSearchFilterBathrooms
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
        bathroomsFacets={props.facets?.bathrooms as FacetDetail[]}
      />

      {/* Amenities */}
      <PropertiesListSearchFilterAmenities
        amenitiesFacets={props.facets?.amenities as FacetDetail[]}
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* Additional Amenities */}
      <PropertiesListSearchFilterAdditionalAmenities
        additionalAmenitiesAmenitiesFacets={props.facets?.additionalAmenitiesAmenities as FacetDetail[]}
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* squareFeet */}
      <PropertiesListSearchFilterSquareFeet
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* Listed Info: listedForSale, listedForLease, listedForRent */}
      <PropertiesListSearchFilterListedInfo
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
        listedInfoFacets={getListedInfoFacets(props.facets)}
      />

      <Collapse className="search-filter-collapse">
        {/* Distance */}
        <Panel header={<h2 className="font-bold">Distance</h2>} key={FilterNames.Distance}>
          <PropertiesListSearchFilterDistance
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>
      </Collapse>

      {/* Date (updatedAt) */}
      <PropertiesListSearchFilterUpdatedDate
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
        updatedDateFacet={props.facets?.updatedAt as FacetDetail[]}
      />

      {/* Date (createdAt) */}
      <PropertiesListSearchFilterCreatedDate
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
        createdDateFacet={props.facets?.createdAt as FacetDetail[]}
      />

      {/* Tags */}
      <PropertiesListSearchFilterTagsContainer
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
        tagsFacets={props.facets?.tags as FacetDetail[]}
      />

      {/* Price */}
      <PropertiesListSearchFilterPrice
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />
    </div>
  );
};
