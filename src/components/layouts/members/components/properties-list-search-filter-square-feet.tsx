import { Space, Select, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { MaxSquareFeetOptions, MinSquareFeetOptions } from '../../../../constants';
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
        searchParams.set('minSquareFeet', value);
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
        searchParams.set('maxSquareFeet', value);
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
    const qsminSquareFeet = searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = searchParams.get('maxSquareFeet');
    if (qsminSquareFeet) {
      setMinSquareFeet(parseInt(qsminSquareFeet));
    }
    if (qsmaxSquareFeet) {
      setMaxSquareFeet(parseInt(qsmaxSquareFeet));
    }
  }, []);

  useEffect(() => {
    if (!location.search) {
      setMinSquareFeet(0);
      setMaxSquareFeet(100000);
    }
  }, [location]);

  return (
    <Collapse style={{ width: "25%" }}>
      <Panel header={<h2 className="font-bold">Square Feet</h2>} key="6">
        <Space split="-">
          <Select
            defaultValue={minSquareFeet}
            value={minSquareFeet}
            style={{ width: 100 }}
            onChange={(value) => onSquareFeetChanged('min', value)}
          >
            {MinSquareFeetOptions.map((op) => (
              <Option key={op.value} value={op.value} disabled={op.value > props.maxSquareFeet}>
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
              <Option key={op.value} value={op.value} disabled={op.value < props.minSquareFeet}>
                {op.label}
              </Option>
            ))}
          </Select>
        </Space>
      </Panel>
    </Collapse>
  );
};
