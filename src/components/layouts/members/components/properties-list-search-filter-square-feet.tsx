import { Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { MaxSquareFeetOptions, MinSquareFeetOptions } from '../../../../constants';
const { Option } = Select;

export const PropertiesListSearchFilterSquareFeet = (props: any) => {
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
    <>
      <h2 className="font-bold">Square Feet</h2>
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
    </>
  );
};
