import { Checkbox, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, PropertyTypes } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

interface PropertiesListSearchFilterPropertyTypeProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  propertyTypeFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterPropertyType: FC<PropertiesListSearchFilterPropertyTypeProps> =
  (props) => {
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
      <Collapse style={{ width: '25%'}}>
        <Panel header={<h2 className="font-bold">Type </h2>} key="1">
          <CheckboxGroup
            key={FilterNames.Type}
            options={PropertyTypes.map((value: string) => {
              const count = props?.propertyTypeFacets?.find((t: any) => t?.value === value)?.count;
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
        </Panel>
      </Collapse>
    );
  };
