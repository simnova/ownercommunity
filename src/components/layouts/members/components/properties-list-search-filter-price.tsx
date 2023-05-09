import { Col, Row, Slider, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PriceMarkers, SearchParamKeys } from '../../../../constants';
import { FilterDetail } from '../../../../generated';

interface PropertiesListSearchFilterPriceProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
}

export const PropertiesListSearchFilterPrice: FC<PropertiesListSearchFilterPriceProps> = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const onSliderPriceChanged = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    // update query string
    searchParams.set(SearchParamKeys.MinPrice, values[0].toString());
    searchParams.set(SearchParamKeys.MaxPrice, values[1].toString());
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
        searchParams.set(SearchParamKeys.MinPrice, e.target.value);
        searchParams.set(SearchParamKeys.MaxPrice, maxPrice.toString());
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
        searchParams.set(SearchParamKeys.MaxPrice, e.target.value);
        searchParams.set(SearchParamKeys.MinPrice, minPrice.toString());
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
    const qsMinPrice = searchParams.get(SearchParamKeys.MinPrice);
    const qsMaxPrice = searchParams.get(SearchParamKeys.MaxPrice);
    if (qsMinPrice) {
      setMinPrice(parseInt(qsMinPrice));
    }
    if (qsMaxPrice) {
      setMaxPrice(parseInt(qsMaxPrice));
    }
  }, [searchParams]);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search.includes(SearchParamKeys.MaxPrice) && !location.search.includes(SearchParamKeys.MinPrice)) {
      setMinPrice(0);
      setMaxPrice(1000000);
    }
  }, [location]);

  return (<>
    <h2 className="font-bold">Price</h2>
    <Slider
      range
      marks={PriceMarkers}
      defaultValue={[minPrice, maxPrice]}
      max={1000000}
      min={0}
      step={null}
      onChange={(values) => onSliderPriceChanged(values)}
      value={[minPrice, maxPrice]}
      tooltip={{
        open: false
      }}
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
  </>);
};
