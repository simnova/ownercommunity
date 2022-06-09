import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';
import { Space, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

export const PropertiesListSearchFilters = (props: any) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const clearFilter = () => {
    props.setSelectedFilter(undefined);
    setSearchParams({});
  };

  return (
    <>
      <div>
        <Space>
          <h1>Filters</h1>
          <Button type="link" onClick={() => clearFilter()}>
            Clear filters
          </Button>
        </Space>
      </div>
      {/* Type */}
      <PropertiesListSearchFilterPropertyType
        data={props.data}
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
        data={props.data}
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* Additional Amenities */}
      <PropertiesListSearchFilterAdditionalAmenities
        data={props.data}
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* Price */}
      <PropertiesListSearchFilterPrice
        selectedFilter={props.selectedFilter}
        setSelectedFilter={props.setSelectedFilter}
      />

      {/* squareFeet */}
      <PropertiesListSearchFilterSquareFeet
        minSquareFeet={props.minSquareFeet}
        maxSquareFeet={props.maxSquareFeet}
        onSquareFeetChanged={props.onSquareFeetChanged}
      />
    </>
  );
};
