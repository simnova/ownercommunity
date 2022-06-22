import { Radio, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BedroomsFilterOptions, FilterNames, SearchParamKeys } from '../../../../constants';
import { FilterDetail } from '../../../../generated';

const { Panel } = Collapse;
interface PropertiesListSearchFilterBedroomsProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterBedrooms: FC<PropertiesListSearchFilterBedroomsProps> = (
  props
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bedrooms, setBedrooms] = useState<undefined | number>();

  const onBedroomsClicked = (e: any) => {
    setBedrooms(parseInt(e.target.value));
    if (e.target.value) {
      searchParams.set(SearchParamKeys.Bedrooms, e.target.value);
    } else {
      searchParams.delete(SearchParamKeys.Bedrooms);
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: { ...props.selectedFilter?.listingDetail, bedrooms: parseInt(e.target.value) }
    });
  };

  useEffect(() => {
    const qsbedrooms = searchParams.get(SearchParamKeys.Bedrooms);
    if (qsbedrooms) {
      setBedrooms(parseInt(qsbedrooms));
    }
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search) {
      setBedrooms(undefined);
    }
  }, [location]);

  return (
    <Collapse className="search-filter-collapse">
      <Panel header={<h2 className="font-bold">Bedrooms</h2>} key={FilterNames.Bedrooms}>
        <Radio.Group
          value={bedrooms}
          defaultValue={bedrooms}
          onChange={onBedroomsClicked}
          buttonStyle="solid"
          optionType="button"
          options={BedroomsFilterOptions}
        />
      </Panel>
    </Collapse>
  );
};
