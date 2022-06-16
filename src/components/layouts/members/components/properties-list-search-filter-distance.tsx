import { Collapse, Checkbox, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { DistanceOptions, FilterNames } from '../../../../constants';
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
  const [distance, setDistance] = useState<undefined | number>();

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
      listingDetail: {
        ...props.selectedFilter?.listingDetail
      },
      distance: parseFloat(e.target.value)
    });
  };

  useEffect(() => {
    const qsdistance = searchParams.get('distance');
    if (qsdistance) {
      setDistance(parseInt(qsdistance));
    }
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search) {
      setDistance(undefined);
    }
  }, [location]);

  return (
    <>
      <Collapse className="search-filter-collapse">
        <Panel header={<h2 className="font-bold">Distance</h2>} key={FilterNames.Distance}>
          <Radio.Group
            value={distance}
            defaultValue={distance}
            onChange={onDistanceClicked}
            options={DistanceOptions}
          />
        </Panel>
      </Collapse>
    </>
  );
};
