import { FacetDetail, PropertySearchFacets } from '../../../../generated';
import { FC, useEffect, useState } from 'react';
import { DistanceOptions, SearchParamKeys, additionalAmenitiesOptions } from '../../../../constants';
import {
  SearchFilter,
  SearchFilterConfigDefinition,
  SearchFilterOption,
  SearchFilterProps
} from '../../shared/components/search-filter';
import { Checkbox } from 'antd';
import { useSearchParams } from 'react-router-dom';
interface PropertiesListSearchFiltersProps {
  facets?: PropertySearchFacets;
  searchData: any;
  tagData: string[];
}

interface AdditionalAmenitiesFilterProps {
  additionalAmenities: {
    category: string;
    amenities: SearchFilterOption[];
  }[];
  searchId: string[];
}

export const AdditionalAmenitiesFilter: FC<AdditionalAmenitiesFilterProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isChecked = (id: string) => {
    const searchId = props.searchId[0];
    const searchParamsString = searchParams.get(searchId)?.split(';').map((searchParam) => searchParam.split(':')[1]);
    if (searchParamsString) {
      return searchParamsString.includes(id);
    }
    return false;
  };

  const onSelectCheckbox = (e: any, key: string, category: string) => {
    const searchId = props.searchId[0];
    const value = `${category}:${key}`;
    if (e.target.checked) {
      const originalSearchParams = searchParams.get(searchId) ?? '';
      searchParams.set(searchId, originalSearchParams.length > 0 ? searchParams.get(searchId) + ';' + value : value);
      setSearchParams(searchParams);
    } else {
      const searchParamsString = searchParams.get(searchId)?.split(';');
      const newSearchParamsArray: any = [];
      searchParamsString?.forEach((searchParam) => {
        if (searchParam !== value) {
          newSearchParamsArray.push(searchParam);
        }
      });
      searchParams.set(searchId, newSearchParamsArray.join(';'));
      if (searchParams.get(searchId) === '') {
        searchParams.delete(searchId);
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <div style={{ paddingLeft: '20px' }}>
      {props.additionalAmenities.map((aam: { category: string, amenities: SearchFilterOption[] }) => {
        return (
          <div key={aam.category} >
            {aam.amenities.length > 0 && <h2 className="font-bold">{aam.category}</h2>}
            {aam.amenities.map((option: SearchFilterOption) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }} key={option.id}>
                  <Checkbox
                    key={option.id}
                    checked={isChecked(option.id)}
                    onChange={(e) => onSelectCheckbox(e, option.id, aam.category)}
                  >
                    {option.name}
                  </Checkbox>
                  <span>{option.count}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const PropertiesListSearchFilters: FC<PropertiesListSearchFiltersProps> = (props) => {
  const [filters, setFilters] = useState<SearchFilterProps[]>([]);

  const generateFilters = (config: SearchFilterConfigDefinition) => {
    const filters: SearchFilterProps[] = [];
    config.filters.forEach((filter: any) => {
      let newFilter: SearchFilterProps = {
        title: filter.title,
        options: [],
        searchId: filter.searchId,
        searchbar: filter.searchbar ?? false,
        type: filter.type ?? 'checkbox',
        customComponent: filter.customComponent
      };

      filter.values.forEach((value: any) => {
        let count: number;
        if (filter.facet) {
          if (filter.facet.length > 1) {
            const facetName = filter.facet.find((facet: any) => facet === filter.handleFilter(value));
            count = props.searchData.facets[facetName].find((facet: any) => filter.handleCount(facet))?.count ?? 0;
          } else {
            if (props.searchData.facets[filter.facet[0]]) {
              count =
                props.searchData.facets[filter.facet[0]].find((facet: any) =>
                  filter.handleCount ? filter.handleCount(facet, value) : facet.value === value
                )?.count ?? 0;
            } else {
              count = 0;
            }
          }
        } else count = -1;
        if (filter.handleBuild) {
          filter.handleBuild(newFilter, value, count);
        } else {
          newFilter.options.push({
            name: value,
            count: count,
            id: value
          });
        }
      });

      filters.push(newFilter);
    });
    setFilters(filters);
  };

  useEffect(() => {
    const filterConfig: SearchFilterConfigDefinition = {
      filters: [
        // Listed Info
        {
          title: 'Listed Info',
          searchId: [SearchParamKeys.ListedInfo],
          values: ['For Sale', 'For Rent', 'For Lease'],
          facet: ['listedForSale', 'listedForRent', 'listedForLease'],
          handleFilter: (value: any) => {
            switch (value) {
              case 'For Sale':
                return 'listedForSale';
              case 'For Rent':
                return 'listedForRent';
              case 'For Lease':
                return 'listedForLease';
              default:
                return '';
            }
          },
          handleCount: (facet: FacetDetail) => {
            return facet.value === 'true';
          },
          handleBuild: (filter: SearchFilterProps, value: any, count: number) => {
            const id =
              value === 'For Sale' ? 'listedForSale' : value === 'For Rent' ? 'listedForRent' : 'listedForLease';
            filter.options.push({
              name: value,
              count: count,
              id: id
            });
          }
        },
        // Property Type
        {
          title: 'Property Type',
          searchId: [SearchParamKeys.Type],
          values: ['Townhouse', 'Condo', 'Single Family', 'Apartment', 'Land', 'Studio', 'Multi-Family', 'Storefront'],
          facet: ['type'],
          handleCount: (facet: FacetDetail, value: any) => {
            return facet?.value?.toLowerCase() === value.toLowerCase();
          },
          handleBuild: (filter: SearchFilterProps, value: any, count: number) => {
            filter.options.push({
              name: value,
              count: count,
              id: value.toLowerCase()
            });
          }
        },
        // Bedrooms
        {
          title: 'Bedrooms',
          searchId: [SearchParamKeys.Bedrooms],
          values: ['1+', '2+', '3+', '4+', '5+'],
          facet: ['bedrooms'],
          type: 'radio'
        },
        // Bathrooms
        {
          title: 'Bathrooms',
          searchId: [SearchParamKeys.Bathrooms],
          values: ['1+', '1.5+', '2+', '3+', '4+', '5+'],
          facet: ['bathrooms'],
          type: 'radio'
        },
        // Price
        {
          title: 'Price',
          searchId: [SearchParamKeys.MinPrice, SearchParamKeys.MaxPrice],
          values: ['Min Price', 'Max Price'],
          facet: ['price'],
          type: 'inputNumber',
          handleBuild: (filter: SearchFilterProps, value: any, count: number) => {
            const id = value === 'Min Price' ? SearchParamKeys.MinPrice : SearchParamKeys.MaxPrice;
            filter.options.push({
              name: value,
              count: count,
              id: id
            });
          }
        },
        // Square Feet
        {
          title: 'Square Feet',
          searchId: [SearchParamKeys.MinSquareFeet, SearchParamKeys.MaxSquareFeet],
          values: ['Min Square Feet', 'Max Square Feet'],
          facet: ['squareFeet'],
          type: 'inputNumber',
          handleBuild: (filter: SearchFilterProps, value: any, count: number) => {
            const id = value === 'Min Square Feet' ? SearchParamKeys.MinSquareFeet : SearchParamKeys.MaxSquareFeet;
            filter.options.push({
              name: value,
              count: count,
              id: id
            });
          }
        },
        // Amenities
        {
          title: 'Amenities',
          searchId: [SearchParamKeys.Amenities],
          values: props.searchData.facets['amenities']?.map((amenity: any) => amenity.value) ?? [],
          facet: ['amenities']
        },
        // Additional Amenities
        {
          title: 'Additional Amenities',
          searchId: [SearchParamKeys.AdditionalAmenities],
          values: props.searchData.facets['additionalAmenitiesAmenities']?.map((amenity: any) => amenity.value) ?? [],
          facet: ['additionalAmenitiesAmenities'],
          type: 'custom',
          customComponent: (
            <AdditionalAmenitiesFilter
              searchId={[SearchParamKeys.AdditionalAmenities]}
              additionalAmenities={props.searchData.facets['additionalAmenitiesCategory']?.map((facet: FacetDetail) => {
                const category = facet.value ?? '';
                const amenities: SearchFilterOption[] = props.searchData.facets['additionalAmenitiesAmenities']?.map((facet: FacetDetail) => {
                  if (additionalAmenitiesOptions[category]?.includes(facet.value)) {
                    return {
                      name: facet.value,
                      count: facet.count,
                      id: facet.value
                    };
                  }
                }).filter((amenity: SearchFilterOption | undefined) => amenity !== undefined);

                return {
                  category: category,
                  amenities: amenities
                };
                // [{category: "Outdoors", amenities: [{ name: "Patio", count: 0, id: "Patio"}]}]
              })}
            />
          )
        },
        // Tags
        {
          title: 'Tags',
          searchId: [SearchParamKeys.Tags],
          values: props.tagData,
          facet: ['tags']
        },
        // Created At
        {
          title: 'Created At',
          searchId: [SearchParamKeys.CreatedAt],
          values: props.searchData.facets['createdAt']?.map((createdAt: any) => createdAt.value) ?? [],
          facet: ['createdAt'],
          type: 'radio'
        },
        // Updated At
        {
          title: 'Updated At',
          searchId: [SearchParamKeys.UpdatedAt],
          values: props.searchData.facets['updatedAt']?.map((updatedAt: any) => updatedAt.value) ?? [],
          facet: ['updatedAt'],
          type: 'radio'
        },
        // Distance
        {
          title: 'Distance',
          searchId: [SearchParamKeys.Distance],
          values: DistanceOptions.map((distance: { label: string, value: number}) => distance.label),
          type: 'radio'
        }
      ]
    };

    generateFilters(filterConfig);
  }, []);

  return (
    <>
      {filters?.map((filter: SearchFilterProps) => {
        return (
          <SearchFilter
            title={filter?.title}
            key={filter?.searchId[0]}
            searchId={filter?.searchId}
            options={filter?.options}
            searchbar={filter?.searchbar ?? false}
            customComponent={filter?.customComponent}
            type={filter?.type}
          />
        );
      })}
    </>
  );
};
