import { PropertiesListSearchFilterAdditionalAmenities } from './properties-list-search-filter-additional-amenities';
import { PropertiesListSearchFilterAmenities } from './properties-list-search-filter-amenities';
import { PropertiesListSearchFilterBathrooms } from './properties-list-search-filter-bathrooms';
import { PropertiesListSearchFilterBedrooms } from './properties-list-search-filter-bedrooms';
import { PropertiesListSearchFilterPrice } from './properties-list-search-filter-price';
import { PropertiesListSearchFilterPropertyType } from './properties-list-search-filter-property-type';
import { PropertiesListSearchFilterSquareFeet } from './properties-list-search-filter-square-feet';

export const PropertiesListSearchFilters = (props: any) => {
  return (
    <>
      {/* Type */}
      <PropertiesListSearchFilterPropertyType
        data={props.data}
        onPropertyTypeFilterChange={props.onPropertyTypeFilterChange}
        selectedPropertyTypes={props.selectedPropertyTypes}
      />
      {/* Bedrooms */}
      <PropertiesListSearchFilterBedrooms
        bedrooms={props.bedrooms}
        onBedroomsClicked={props.onBedroomsClicked}
      />

      {/* Bathrooms */}
      <PropertiesListSearchFilterBathrooms
        bathrooms={props.bathrooms}
        onBathroomsClicked={props.onBathroomsClicked}
      />

      {/* Amenities */}
      <PropertiesListSearchFilterAmenities
        data={props.data}
        selectedAmenities={props.selectedAmenities}
        onAmenitiesFilterChange={props.onAmenitiesFilterChange}
      />

      {/* Additional Amenities */}
      <PropertiesListSearchFilterAdditionalAmenities
        data={props.data}
        selectedAdditionalAmenities={props.selectedAdditionalAmenities}
        onAdditionalAmenitiesChange={props.onAdditionalAmenitiesChange}
      />

      {/* Price */}
      <PropertiesListSearchFilterPrice
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        onSliderPriceChanged={props.onSliderPriceChanged}
        onPriceChanged={props.onPriceChanged}
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
