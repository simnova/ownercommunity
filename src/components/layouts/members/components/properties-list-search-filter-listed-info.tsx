import { Checkbox, Collapse } from 'antd';
import { useState, FC, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Listed, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';
const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;

interface PropertiesListSearchFilterListedInfoProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
  listedInfoFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterListedInfo: FC<PropertiesListSearchFilterListedInfoProps> = (
  props
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedListedInfo, setSelectedListedInfo] = useState<string[]>([]);

  const onListedInfoFilterChange = (checkedValues: string[]) => {
    setSelectedListedInfo(checkedValues);
    // update query string
    if (checkedValues.length > 0) {
      searchParams.set(SearchParamKeys.ListedInfo, checkedValues.join(','));
    } else {
      searchParams.delete(SearchParamKeys.ListedInfo);
    }
    setSearchParams(searchParams);

    props.setSelectedFilter({ ...props.selectedFilter, listedInfo: checkedValues });
  };

  // Update UI (selected listed info) with corresponding listed info when page is loaded
  useEffect(() => {
    const qsListedInfo = searchParams.get(SearchParamKeys.ListedInfo);
    setSelectedListedInfo(qsListedInfo?.split(',') ?? []);
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search) {
      setSelectedListedInfo([]);
    }
  }, [location]);

  return (
    <Collapse className='search-filter-collapse'>
      <Panel header={<h2 className="font-bold">Listed</h2>} key="7">
        <CheckboxGroup
          options={Listed.map((op) => {
            const count = props?.listedInfoFacets?.find((t: any) => t?.value === op.value)?.count;
            return {
              label: `${op.label} ${
                count !== undefined && count !== null && count > 0
                  ? `(${count})`
                  : count === 0
                  ? '(0)'
                  : ''
              }`,
              value: op.value
            };
          })}
          value={selectedListedInfo}
          onChange={(checkedValues) => onListedInfoFilterChange(checkedValues as string[])}
        />
      </Panel>
    </Collapse>
  );
};
