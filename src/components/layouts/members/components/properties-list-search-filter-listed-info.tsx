import { Checkbox, Collapse } from 'antd';
import { useState, FC, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterNames, Listed, SearchParamKeys } from '../../../../constants';
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
  }, [searchParams]);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search.includes(SearchParamKeys.ListedInfo)) {
      setSelectedListedInfo([]);
    }
  }, [location]);

  const listedInfo: string[] = [];
  const listedInfoFacets = props.listedInfoFacets ?? [{ value: '', count: 0 }];
  listedInfoFacets.forEach((listedInfoFacet) => {
    if (listedInfoFacet.value) {
      listedInfo.push(listedInfoFacet.value);
    }
  });

  const options = listedInfo.map((value) => {
    // const count = amenityFacet.count;
    const count = props.listedInfoFacets?.find((t: any) => t?.value === value)?.count;
    return {
      label: `${
        value === 'listedForSale'
          ? 'For Sale'
          : value === 'listedForRent'
          ? 'For Rent'
          : value === 'listedForLease'
          ? 'For Lease'
          : ''
      } (${count ?? 0})`,
      value: value
    };
  });

  if (options.length === 0) {
    return null;
  }

  return (
    <Collapse
      className="search-filter-collapse"
      defaultActiveKey={
        searchParams.get(FilterNames.ListedInfo) ? FilterNames.ListedInfo : undefined
      }
    >
      <Panel header={<h2 className="font-bold">Listed</h2>} key={FilterNames.ListedInfo}>
        <CheckboxGroup
          options={options}
          value={selectedListedInfo}
          onChange={(checkedValues) => onListedInfoFilterChange(checkedValues as string[])}
        />
      </Panel>
    </Collapse>
  );
};
// }
