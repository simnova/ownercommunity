import { Checkbox, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, PropertyTypeList, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

interface PropertiesListSearchFilterPropertyTypeProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  propertyTypeFacets?: FacetDetail[];
  // handleSearch: (page?: number, top?: number) => void;
  // searchString?: string;
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
        searchParams.set(SearchParamKeys.PropertyType, checkedValues.join(','));
      } else {
        searchParams.delete(SearchParamKeys.PropertyType);
      }
      setSearchParams(searchParams);
      props.setSelectedFilter({ ...props.selectedFilter, propertyType: checkedValues });
    };

    // Update UI (selected property types) with corresponding property types when page is loaded
    useEffect(() => {
      const qsproperTypes = searchParams.get(SearchParamKeys.PropertyType);
      setSelectedPropertyTypes(qsproperTypes?.split(',') ?? []);
    }, [searchParams]);

    // handle when clear all filter clicked
    useEffect(() => {
      if (!location.search.includes(SearchParamKeys.PropertyType)) {
        setSelectedPropertyTypes([]);
      }
    }, [location]);

    const getOptions = () => {
      const options: any = [];

      PropertyTypeList.forEach((value: string) => {
        const count = props.propertyTypeFacets?.find((t: any) => t?.value === value)?.count;
        // if (!count) {
        //   return;
        // }
        options.push({
          label: value + ' ' + `(${count ?? 0})`,
          value: value
        });
      });
      return options;
    };

    if (getOptions().length === 0) {
      return null;
    }

    return (
      <Collapse
        className="search-filter-collapse"
        defaultActiveKey={searchParams.get(FilterNames.Type) ? FilterNames.Type : undefined}
      >
        <Panel header={<h2 className="font-bold">Type </h2>} key={FilterNames.Type}>
          <CheckboxGroup
            options={getOptions()}
            value={selectedPropertyTypes}
            onChange={(checkedValues) => onPropertyTypeFilterChange(checkedValues as string[])}
          />
        </Panel>
      </Collapse>
    );
  };
