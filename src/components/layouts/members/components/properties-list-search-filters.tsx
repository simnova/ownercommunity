import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';
import { Space, Button, Modal } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { FacetDetail, FilterDetail, PropertySearchFacets } from '../../../../generated';
import { FC, useState } from 'react';
interface PropertiesListSearchFiltersProps {
  facets?: PropertySearchFacets;
  selectedFilter?: FilterDetail;
  setSelectedFilter: (filter: FilterDetail | undefined) => void;
  handleSearch: (searchString?: string, filter?: FilterDetail) => void;
  searchString?: string;
}

export const PropertiesListSearchFilters: FC<PropertiesListSearchFiltersProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const clearFilter = () => {
    props.setSelectedFilter(undefined);
    setSearchParams({});
  };


  return (
    <div>
      <Button type="ghost" onClick={() => setIsModalVisible(true)} style={{ borderRadius: '10px' }}>
        <Space size="middle">
          <FilterOutlined />
          <span>Filters</span>
        </Space>
      </Button>
      <Modal 
        title="Filters" 
        visible={isModalVisible} 
        width={1000}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="clear" type="link" onClick={() => {
            props.handleSearch('', undefined);
            clearFilter();
          }}>
            Clear Filters
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            props.handleSearch(props.searchString, props.selectedFilter);
            setIsModalVisible(false)}
          }>
            Apply
          </Button>,
        ]}
      >
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

        {/* Price */}
        <PropertiesListSearchFilterPrice
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />
      </Modal>
    </div>
  );
};
