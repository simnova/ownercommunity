import { Radio, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BathroomsFilterOptions, SearchParamKeys } from '../../../../constants';
import { FilterDetail } from '../../../../generated';

const { Panel } = Collapse;
interface PropertiesListSearchFilterBathroomsProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterBathrooms: FC<PropertiesListSearchFilterBathroomsProps> = (
  props
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bathrooms, setBathrooms] = useState<undefined | number>();

  const onBathroomsClicked = (e: any) => {
    setBathrooms(parseInt(e.target.value));
    if (e.target.value) {
      searchParams.set(SearchParamKeys.Bathrooms, e.target.value);
    } else {
      searchParams.delete(SearchParamKeys.Bathrooms);
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: {
        ...props.selectedFilter?.listingDetail,
        bathrooms: parseFloat(e.target.value)
      }
    });
  };

  useEffect(() => {
    const qsbathrooms = searchParams.get(SearchParamKeys.Bathrooms);
    if (qsbathrooms) {
      setBathrooms(parseFloat(qsbathrooms));
    }
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search) {
      setBathrooms(undefined);
    }
  }, [location]);
  return (
    <Collapse className="search-filter-collapse">
      <Panel header={<h2 className="font-bold">Bathrooms</h2>} key="3">
        <Radio.Group
          value={bathrooms?.toString()}
          defaultValue={bathrooms?.toString()}
          onChange={onBathroomsClicked}
          buttonStyle="solid"
          optionType="button"
          options={BathroomsFilterOptions}
        />
      </Panel>
    </Collapse>
  );
};
