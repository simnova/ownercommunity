import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';
import { useSearchParams } from 'react-router-dom';
import { FacetDetail, FilterDetail, PropertySearchFacets } from '../../../../generated';
import { FC, useEffect } from 'react';
import { PropertiesListSearchFilterListedInfo } from './properties-list-search-filter-listed-info';
import { AvailableFilters, FilterNames, SearchParamKeys } from '../../../../constants';
import { PropertiesListSearchFilterDistance } from './properties-list-search-filter-distance';
import { PropertiesListSearchFilterUpdatedDate } from './properties-list-search-filter-updated-date';
import { PropertiesListSearchFilterCreatedDate } from './properties-list-search-filter-created-date';
import { Collapse } from 'antd';

const { Panel } = Collapse;
interface PropertiesListSearchFiltersProps {
  facets?: PropertySearchFacets;
  selectedFilter?: FilterDetail;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  setTop: (top: number) => void;
}

export const PropertiesListSearchFilters: FC<PropertiesListSearchFiltersProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  // const onSelectTopChanged = (value: number) => {
  //   props.setTop(value);
  //   props.setCurrentPage(0);
  //   props.handleSearch(0, value);
  // };

  console.log('props facet', props.facets);
  const additionalAmenitiesAmenities = 'additionalAmenitiesAmenities';
  console.log(
    AvailableFilters.filter((f) =>
      props?.facets?.[additionalAmenitiesAmenities]
        ? props?.facets?.[additionalAmenitiesAmenities].length > 0
        : false
    )
  );
  return (
    <div>
      <Collapse className="search-filter-collapse" defaultActiveKey={[]}>
        {/* Type */}
        <Panel header={<h2 className="font-bold">Type </h2>} key={FilterNames.Type}>
          <PropertiesListSearchFilterPropertyType
            propertyTypeFacets={props.facets?.type as FacetDetail[]}
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* Bedrooms */}
        <Panel header={<h2 className="font-bold">Bedrooms</h2>} key={FilterNames.Bedrooms}>
          <PropertiesListSearchFilterBedrooms
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
            bedroomsFacets={props.facets?.bedrooms as FacetDetail[]}
          />
        </Panel>

        {/* Bathrooms */}
        <Panel header={<h2 className="font-bold">Bathrooms</h2>} key={FilterNames.Bathrooms}>
          <PropertiesListSearchFilterBathrooms
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
            bathroomsFacets={props.facets?.bathrooms as FacetDetail[]}
          />
        </Panel>

        {/* Amenities */}
        <Panel header={<h2 className="font-bold">Amenities</h2>} key={FilterNames.Amenities}>
          <PropertiesListSearchFilterAmenities
            amenitiesFacets={props.facets?.amenities as FacetDetail[]}
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* Additional Amenities */}
        <Panel
          header={<h2 className="font-bold">Additional Amenities</h2>}
          key={FilterNames.AdditionalAmenities}
        >
          <PropertiesListSearchFilterAdditionalAmenities
            additionalAmenitiesAmenitiesFacets={
              props.facets?.additionalAmenitiesAmenities as FacetDetail[]
            }
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* squareFeet */}
        <Panel header={<h2 className="font-bold">Square Feet</h2>} key={FilterNames.SquareFeet}>
          <PropertiesListSearchFilterSquareFeet
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* Distance */}
        <Panel header={<h2 className="font-bold">Distance</h2>} key={FilterNames.Distance}>
          <PropertiesListSearchFilterDistance
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* Listed Info: listedForSale, listedForLease, listedForRent */}
        <Panel header={<h2 className="font-bold">Listed Info</h2>} key={FilterNames.ListedInfo}>
          <PropertiesListSearchFilterListedInfo
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
            listedInfoFacets={getListedInfoFacets(props.facets)}
          />
        </Panel>

        {/* Date (updatedAt) */}
        <Panel header={<h2 className="font-bold">Updated Date</h2>} key={FilterNames.UpdatedDate}>
          <PropertiesListSearchFilterUpdatedDate
            selectedFilter={props.selectedFilter}
            setSelectedFilter={props.setSelectedFilter}
          />
        </Panel>

        {/* Date (createdAt) */}
        {/*
        <Panel header={<h2 className="font-bold">Created Date </h2>} key={FilterNames.CreatedDate}>
          <PropertiesListSearchFilterCreatedDate
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
          /> 
        </Panel>*/}
      </Collapse>

      {/* Price */}
      <PropertiesListSearchFilterPrice
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />
    </div>
  );
};
