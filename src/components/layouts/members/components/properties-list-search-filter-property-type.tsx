import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, PropertyTypes } from '../../../../constants';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterPropertyType = (props: any) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>();

  const onPropertyTypeFilterChange = (checkedValues: string[]) => {
    setSelectedPropertyTypes(checkedValues);
    // update query string
    if (checkedValues.length > 0) {
      searchParams.set('type', checkedValues.join(','));
    } else {
      searchParams.delete('type');
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({ ...props.selectedFilter, propertyType: checkedValues });
  };

  // Update UI (selected property types) with corresponding property types when page is loaded
  useEffect(() => {
    const qsproperTypes = searchParams.get('type');
    setSelectedPropertyTypes(qsproperTypes?.split(',') ?? []);
  }, []);

  // clear filter
  useEffect(() => {
    if (!location.search) {
      setSelectedPropertyTypes([]);
    }
  }, [location]);

  return (
    <>
      <h2 className="font-bold">Type </h2>
      <CheckboxGroup
        key={FilterNames.Type}
        options={PropertyTypes.map((value: string) => {
          const count = props.data?.propertiesSearch?.facets?.type?.find(
            (t: any) => t?.value === value
          )?.count;
          return {
            label: `${value} ${
              count !== undefined && count !== null && count > 0
                ? `(${count})`
                : count === 0
                ? '(0)'
                : ''
            }`,
            value: value
          };
        })}
        value={selectedPropertyTypes}
        onChange={(checkedValues) => onPropertyTypeFilterChange(checkedValues as string[])}
      />
    </>
  );
};
