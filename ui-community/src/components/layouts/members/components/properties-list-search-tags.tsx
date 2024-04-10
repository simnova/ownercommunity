import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetPropertySelectedFilterTags, SearchParamKeys } from '../../../../constants';

export const PropertiesListSearchTags: React.FC<any> = () => {
  const [selectedFilterList, setSelectedFilterList] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tags = GetPropertySelectedFilterTags(searchParams);
    setSelectedFilterList(tags);
  }, [searchParams]);

  const removeFilter = (filter: string) => {
    const tempList = selectedFilterList.filter((item) => item !== filter);
    setSelectedFilterList(tempList);
    const tokens = filter.split(':');
    const section = tokens[0];
    const value = tokens.length > 2 ? tokens.slice(1).join(':').trim() : tokens[1].trim();
      
    const searchParamMap: Record<string, { searchId: string, compare?: (id: string, value: string) => boolean, separator?: string }> = {
      'Listed Info': {
        searchId: SearchParamKeys.ListedInfo,
        compare: (id: string, value: string) => {
          const filterValue = value === 'For Sale' ? 'listedForSale' : value == 'For Rent' ? 'listedForRent' : 'listedForLease';
          return id === filterValue;
        }
      },
      'Type': {
        searchId: SearchParamKeys.Type,
        compare: (id: string, value: string) => id.toLowerCase() === value.toLowerCase()
      },
      'Bedrooms': {
        searchId: SearchParamKeys.Bedrooms,
      },
      'Bathrooms': {
        searchId: SearchParamKeys.Bathrooms,
      },
      'Min Price': {
        searchId: SearchParamKeys.MinPrice,
      },
      'Max Price': {
        searchId: SearchParamKeys.MaxPrice,
      },
      'Min Square Feet': {
        searchId: SearchParamKeys.MinSquareFeet,
      },
      'Max Square Feet': {
        searchId: SearchParamKeys.MaxSquareFeet,
      },
      'Amenities': {
        searchId: SearchParamKeys.Amenities,
      },
      'Additional Amenities': {
        searchId: SearchParamKeys.AdditionalAmenities,
        separator: ';'
      },
      'Tags': {
        searchId: SearchParamKeys.Tags,
      },
      'Created At': {
        searchId: SearchParamKeys.CreatedAt,
      },
      'Updated At': {
        searchId: SearchParamKeys.UpdatedAt,
      },
      'Distance': {
        searchId: SearchParamKeys.Distance,
      }
    };
  
    const searchParamKey = searchParamMap[section];
    if (!searchParamKey) {
      return;
    }
  
    const qsValue = searchParams.get(searchParamKey.searchId);

    const separator = searchParamKey.separator ?? ',';
    if (qsValue?.includes(separator)) {
      const qsValues = qsValue.split(separator);
      const newValue = qsValues?.filter((id: string) => searchParamKey.compare ? !searchParamKey.compare(id, value) : id !== value);
      if (newValue && newValue.length > 0) {
        searchParams.set(searchParamKey.searchId, newValue.join(separator));
      } 
    } else searchParams.delete(searchParamKey.searchId);

    setSearchParams(searchParams);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      {selectedFilterList.map((filter: string) => {
        return (
          <Tag
            closable
            onClose={(e: any) => {
              e.preventDefault();
              removeFilter(filter);
            }}
            key={filter}
          >
            {filter}
          </Tag>
        );
      })}
    </div>
  );
};
