import { Col, Row, Slider, Input } from 'antd';
import { PriceMarkers } from '../../../../constants';

export const PropertiesListSearchFilterPrice = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Price</h2>
      <Slider
        range
        marks={PriceMarkers}
        defaultValue={[props.minPrice, props.maxPrice]}
        max={1000000}
        min={0}
        step={null}
        onChange={(values) => props.onSliderPriceChanged(values)}
        tooltipVisible={false}
        value={[props.minPrice, props.maxPrice]}
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>Min price</div>
          <Input value={props.minPrice} onChange={(e) => props.onPriceChanged('min', e)} />
        </Col>
        <Col span={12}>
          <div>Max price</div>
          <Input value={props.maxPrice} onChange={(e) => props.onPriceChanged('max', e)} />
        </Col>
      </Row>
    </>
  );
};
