import { Collapse, Checkbox, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DistanceOptions, FilterNames, SearchParamKeys } from '../../../../constants';
import { FilterDetail } from '../../../../generated';

const CheckboxGroup = Checkbox.Group;
const { Panel } = Collapse;
interface PropertiesListSearchFilterDistanceProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterDistance = (
  props: PropertiesListSearchFilterDistanceProps
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [distance, setDistance] = useState<undefined | number>(100);

  const onDistanceClicked = (e: any) => {
    setDistance(parseInt(e.target.value));
    if (e.target.value) {
      searchParams.set('distance', e.target.value);
    } else {
      searchParams.delete('distance');
    }
    setSearchParams(searchParams);

    props.setSelectedFilter({
      ...props.selectedFilter,
      distance: parseFloat(e.target.value)
    });
  };

  useEffect(() => {
    const qsdistance = searchParams.get(SearchParamKeys.Distance);
    if (qsdistance) {
      setDistance(parseInt(qsdistance));
    }
  }, [searchParams]);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search.includes(SearchParamKeys.Distance)) {
      setDistance(undefined);
    }
  }, [location]);

  return (
    <>
      <Radio.Group
        value={distance}
        defaultValue={distance}
        onChange={onDistanceClicked}
        options={DistanceOptions}
      />
    </>
  );
};
