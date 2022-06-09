import { Col, Row, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PriceMarkers } from '../../../../constants';
import { FilterDetail } from '../../../../generated';

interface PropertiesListSearchFilterPriceProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterPrice: FC<PropertiesListSearchFilterPriceProps> = (
  props
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const onSliderPriceChanged = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    // update query string
    searchParams.set('minPrice', values[0].toString());
    searchParams.set('maxPrice', values[1].toString());
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: {
        ...props.selectedFilter?.listingDetail,
        prices: [values[0], values[1]]
      }
    });
  };

  const onPriceChanged = (type: string, e: any) => {
    switch (type) {
      case 'min':
        setMinPrice(e.target.value);
        searchParams.set('minPrice', e.target.value);
        props.setSelectedFilter({
          ...props.selectedFilter,
          listingDetail: {
            ...props.selectedFilter?.listingDetail,
            prices: [e.target.value, maxPrice]
          }
        });
        break;
      case 'max':
        setMaxPrice(e.target.value);
        searchParams.set('maxPrice', e.target.value);
        props.setSelectedFilter({
          ...props.selectedFilter,
          listingDetail: {
            ...props.selectedFilter?.listingDetail,
            prices: [minPrice, e.target.value]
          }
        });
        break;
    }
    setSearchParams(searchParams);
  };

  // Update UI (selected prices) with corresponding prices when page is loaded
  useEffect(() => {
    const qsMinPrice = searchParams.get('minPrice');
    const qsMaxPrice = searchParams.get('maxPrice');
    if (qsMinPrice) {
      setMinPrice(parseInt(qsMinPrice));
    }
    if (qsMaxPrice) {
      setMaxPrice(parseInt(qsMaxPrice));
    }
  }, []);

  useEffect(() => {
    if (!location.search) {
      setMinPrice(0);
      setMaxPrice(1000000);
    }
  }, [location]);

  return (
    <>
      <h2 className="font-bold">Price</h2>
      <Slider
        range
        marks={PriceMarkers}
        defaultValue={[minPrice, maxPrice]}
        max={1000000}
        min={0}
        step={null}
        onChange={(values) => onSliderPriceChanged(values)}
        tooltipVisible={false}
        value={[minPrice, maxPrice]}
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>Min price</div>
          <Input value={minPrice} onChange={(e) => onPriceChanged('min', e)} />
        </Col>
        <Col span={12}>
          <div>Max price</div>
          <Input value={maxPrice} onChange={(e) => onPriceChanged('max', e)} />
        </Col>
      </Row>
    </>
  );
};
