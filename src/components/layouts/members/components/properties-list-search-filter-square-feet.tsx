import { Space, Select, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  FilterNames,
  MaxSquareFeetOptions,
  MinSquareFeetOptions,
  SearchParamKeys
} from '../../../../constants';
import { FilterDetail } from '../../../../generated';
const { Option } = Select;
const { Panel } = Collapse;

interface PropertiesListSearchFilterSquareFeetProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterSquareFeet: FC<PropertiesListSearchFilterSquareFeetProps> = (
  props: any
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minSquareFeet, setMinSquareFeet] = useState(0);
  const [maxSquareFeet, setMaxSquareFeet] = useState(100000);

  const onSquareFeetChanged = (type: string, value: any) => {
    switch (type) {
      case 'min':
        setMinSquareFeet(value);
        setSearchParams(searchParams);
        // update query string
        searchParams.set(SearchParamKeys.MinSquareFeet, value);
        setSearchParams(searchParams);

        props.setSelectedFilter({
          ...props.selectedFilter,
          listingDetail: {
            ...props.selectedFilter?.listingDetail,
            squareFeets: [value, maxSquareFeet]
          }
        });
        break;
      case 'max':
        setMaxSquareFeet(value);
        // update query string
        searchParams.set(SearchParamKeys.MaxSquareFeet, value);
        setSearchParams(searchParams);
        props.setSelectedFilter({
          ...props.selectedFilter,
          listingDetail: {
            ...props.selectedFilter?.listingDetail,
            squareFeets: [minSquareFeet, value]
          }
        });
        break;
    }
  };

  // Update UI (selected prices) with corresponding prices when page is loaded
  useEffect(() => {
    const qsminSquareFeet = searchParams.get(SearchParamKeys.MinSquareFeet);
    const qsmaxSquareFeet = searchParams.get(SearchParamKeys.MaxSquareFeet);
    if (qsminSquareFeet) {
      setMinSquareFeet(parseInt(qsminSquareFeet));
    }
    if (qsmaxSquareFeet) {
      setMaxSquareFeet(parseInt(qsmaxSquareFeet));
    }
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (
      !location.search.includes(SearchParamKeys.MaxSquareFeet) &&
      !location.search.includes(SearchParamKeys.MinSquareFeet)
    ) {
      setMinSquareFeet(0);
      setMaxSquareFeet(100000);
    }
  }, [location]);

  return (
    <Collapse className="search-filter-collapse">
      <Panel header={<h2 className="font-bold">Square Feet</h2>} key={FilterNames.SquareFeet}>
        <Space split="-">
          <Select
            defaultValue={minSquareFeet}
            value={minSquareFeet}
            style={{ width: 100 }}
            onChange={(value) => onSquareFeetChanged('min', value)}
          >
            {MinSquareFeetOptions.map((op) => (
              <Option key={op.value} value={op.value} disabled={op.value > maxSquareFeet}>
                {op.label}
              </Option>
            ))}
          </Select>

          <Select
            defaultValue={maxSquareFeet}
            value={maxSquareFeet}
            style={{ width: 100 }}
            onChange={(value) => onSquareFeetChanged('max', value)}
          >
            {MaxSquareFeetOptions.map((op) => (
              <Option key={op.value} value={op.value} disabled={op.value < minSquareFeet}>
                {op.label}
              </Option>
            ))}
          </Select>
        </Space>
      </Panel>
    </Collapse>
  );
};
